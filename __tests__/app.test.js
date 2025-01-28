const endpointsJson = require("../endpoints.json");
const request = require ("supertest")
const app = require ('../app')
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
const db = require("../db/connection")

beforeEach(async()=>{
  await seed(testData)

})

afterAll(()=>{
  return db.end()

})

describe.only("GET /api", () => {
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
      expect(topics.length).toEqual(3)
    })
  })
});
// describe("GET /api/article/:article_id",()=>{
//   test("should response with 200 and articles with correct properties",()=>{
//     return request (app)
//     .get('/api/article/:article_id')
//     .expect(200)
//     .then(())
//   })
// })
