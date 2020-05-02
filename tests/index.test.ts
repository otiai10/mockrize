import App from "../src/index";
import supertest from "supertest";
import Stream from "./mock/stream";

describe("App", () => {
  it("should create express app", async (done) => {
    const out = new Stream();
    const app = await App({ rootDir: "./example/root", out });
    expect(out.toString().split("\n")).toStrictEqual([
      "[INFO] Following endpoints are generated.",
      "PUT	/foo",
      "GET	/foo/baa",
      "GET	/hello/:name",
      "GET	/users/:id",
      "DELETE	/users",
      "GET	/users",
      "POST	/users",
      "PUT	/users",
      "GET	/"
    ]);
    await supertest(app)
      .get('/foo/baa')
      .expect(200);
    await supertest(app)
      .get('/not-found')
      .expect(404);
    done();
  });
})