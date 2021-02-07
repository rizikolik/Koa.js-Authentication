//Super test for mocking the request
const supertest = require("supertest");

const server = require("../server");
const url = "http://localhost:5000/api";
const req = supertest(url);

const post_url = "/login";
beforeEach(() => {
  jest.setTimeout(1000000);
});
describe("getting the api end point ", () => {
  test("get the get request message", async () => {
    const response = await req.get(post_url);
    expect(response.status).toEqual(405);
  });
});
describe("Post Endpoint Request differant scenarios", () => {
  it("Should response  with a status code 400 when start date is not valid ", async () => {
    const wrongParams = {
      email: "test@1234.com", //Wrong year format
      password: "123456",
    };
    const { body, res } = await req.post(post_url).send(wrongParams);
    expect(res.statusCode).toEqual(400);
  });
  it("Should response  with a status code 400 when start date is not valid ", async () => {
    const wrongParams = {
      username: "d@1234.com", //right params without unlogged user
      password: "123456",
    };
    const { body, res } = await req.post(post_url).send(wrongParams);
    expect(res.statusCode).toEqual(400);

    expect(res.text).toEqual('{"status":"Not registered User"}');
  });
});
