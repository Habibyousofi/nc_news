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
    return request(app)
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
    test("respond with 400 and a message if the ID is incorrect",()=>{
      return request(app)
      .get("/api/articles/twenty-two")
      .expect(400)
      .then(({body})=>{
        expect(body).toEqual({error: "Incorrect Article ID"})
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
  
  })
  describe("GET /api/articles",()=>{
    test("200: respond with array of comment objects and should have required properties",()=>{
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body :{ articles }})=>{
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0)
        articles.forEach((comment)=>{
          expect(comment).toHaveProperty("author"),
          expect(comment).toHaveProperty("title"),
          expect(comment).toHaveProperty("article_id"),
          expect(comment).toHaveProperty("topic"),
          expect(comment).toHaveProperty("votes"),
          expect(comment).toHaveProperty("article_img_url"),
          expect(comment).toHaveProperty("created_at"),
          expect(comment).toHaveProperty("comment_count"),
          expect(comment).not.toHaveProperty("body")
            
      })

    })
  })
    test("200: should respond with sorted array by created_at", ()=>{
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body : {articles}})=>{
       
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
describe("GET /api/articles/:article_id/comments",()=>{
  test("200: should return array of comments with properties by artcile_id",()=>{
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({body})=>{
        const {comments} =  body
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBe(11)
        comments.forEach((comment)=>{
          expect(typeof comment.comment_id).toBe("number")
          expect(typeof comment.votes).toBe("number")
          expect(typeof comment.author).toBe("string")
          expect(typeof comment.body).toBe("string")
          expect(typeof comment.article_id).toBe("number")
          expect(typeof comment.created_at).toBe("string")
         
        })
        expect(comments).toBeSortedBy("created_at",{descending: true})
       })
    })
    test("200: should return an empty array when article_id exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments") 
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([])
})
    })
    test("404: should return an error when article_id does not exist", () => {
      return request(app)
        .get("/api/articles/2222/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ error: "Article not found" });
         })
      })
      test("400: should return an error for an invalid article_id", () => {
        return request(app)
          .get("/api/articles/twenty-four/comments") 
          .expect(400)
          .then(({ body }) => {
            expect(body).toEqual({ error: "Incorrect Article ID" })
         })
      })
    })
  })

  describe("POST /api/articles/:article_id/comments", () => {
    test("201: should return the posted comment", () => {
      const newComment = {
        username: "icellusedkars",
        body: "I hate streaming eyes even more"
      };
  
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: "I hate streaming eyes even more",
              author: "icellusedkars",
              article_id: 1,
              votes: 0,
              created_at: expect.any(String),
            })
          );
        });
    });
  
    test("400: should return error when required fields are missing", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.error).toBe("Missing required fields");
        });
    });
  
    test("404: should return error when article does not exist", () => {
      return request(app)
        .post("/api/articles/2222/comments")
        .send({ username: "butter_bridge", body: "Nice one!" })
        .expect(404)
        .then(({ body }) => {
          expect(body.error).toBe("Article not found");
        });
    });
  
    test("400: should return error for invalid article ID", () => {
      return request(app)
        .post("/api/articles/ItsNotId/comments")
        .send({ username: "butter_bridge", body: "Nice one!" })
        .expect(400)
        .then(({ body }) => {
          expect(body.error).toBe("Incorrect Article ID");
        });
    });
  })
  describe.only("PATCH /api/articles/:article_id", () => {
    test("200: should return updated article with increased vote number", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .timeout(10000)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({
              article_id: 1,
              votes: expect.any(Number),
            }))
        })
      })
      test("404: if the article is not found should return 404 with error message", ()=> {
        return request (app)
        .patch("/api/articles/4444")
        .expect(404) 
        .then(({body}) => {
          expect(body.error).toBe("Article not found")
        })
        })
      });




