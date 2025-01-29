const endpointsJson = require("../endpoints.json");
const request = require ("supertest")
const app = require ('../app')
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");
require("jest-sorted")


beforeEach(()=>{
 return seed(testData)

})

afterAll(()=>{
  return db.end()

})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
  test("200: Responds with an array of object with slug and description keys",()=>{
    return request (app)
    .get("/api/topics")
    .expect(200)
    .then(({body: {topics}})=>{
      expect(topics).toBeInstanceOf(Array)
      expect(topics.length).toEqual(3);
      topics.forEach((topic)=> {
        expect(topic).toHaveProperty("slug");
        expect(topic).toHaveProperty("description");
        expect(typeof topic.slug).toBe("string")
        expect(typeof topic.description).toBe("string")

      })
    })
  })
  test("respond with 404 if the endpoint is invalid", ()=>{
    return request(app)
    .get('/api/topicz')
    .expect(404)
    .then(({body})=>{
      expect(body).toEqual({error: "endpoint not found"})
    })
  })
});
describe("GET /api/articles/:article_id",()=>{
  test("should response with 200 and articles with correct properties",()=>{
    return request (app)
    .get('/api/articles/1')
    .expect(200)
    .then(({body:{article}})=>{ 
      expect(article).toEqual({
        article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      })
       })

    })
  test("respond with 404 and a message if the article_id is not valid",()=>{
    return request(app)
    .get("/api/articles/222")
    .expect(404)
    .then(({body})=>{
      expect(body).toEqual({ error: "Article not found"})
    })
  })
  test("respond with 400 and a message if the ID is incorrect",()=>{
    return request(app)
    .get("/api/articles/twenty-two")
    .expect(400)
    .then(({body})=>{
      expect(body).toEqual({error: "incorrect Article ID"})
     })
   })
  
  })
  describe.only("GET /api/articles",()=>{
    test("200: respond with array of article objects and should have required properties",()=>{
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body :{ articles }})=>{
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0)
        articles.forEach((article)=>{
          expect(article).toHaveProperty("author")
          expect(article).toHaveProperty("title")
          expect(article).toHaveProperty("article_id")
          expect(article).toHaveProperty("topic")
          expect(article).toHaveProperty("votes")
          expect(article).toHaveProperty("article_img_url")
          expect(article).toHaveProperty("created_at")
          expect(article).toHaveProperty("comment_count")
          expect(article).not.toHaveProperty("body")

        })
      })

    })
    test("200: should respond with sorted array by created_at", ()=>{
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body : {articles}})=>{
        console.log(articles)
        expect(articles).toBeSortedBy("created_at",{descending: true})
      })
    })
    test("404: respond with endpoint not found message if endopoint is not correct ",()=>{
      return request(app)
      .get('/api/articlez')
      .expect(404)
      .then(({body})=>{
        expect(body).toEqual({error: "endpoint not found"})
    })
  })
})
