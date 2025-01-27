const endpointsJson = require("../endpoints.json");
const request = require ("supertest")
const app = require ('../app')

beforeEach(()=>{

})

afterAll(()=>{

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
});
