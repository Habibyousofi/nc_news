const endpointsJson = require("../endpoints.json");
const request = require ("supertest")
const app = require ('../app')
const testData = require('../db/data/test-data')
const seed = require('../db/seeds/seed')
const db = require("../db/connection")

beforeEach(()=>{
  return seed(testData)

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
        console.log(endpointsJson)
      });
  });
  test("200: Responds with an array of object with slug and description keys",()=>{
    return request (app)
    .get("/api/topics")
    .expect(200)
    .then(({body: {topics}})=>{
      console.log(topics,"<---- this is topic")
      expect(topics).toBeInstanceOf(Array)
      expect(topics.length).toEqual(3)
    })
  })
});
