import App from "../src/index";
import supertest from "supertest";
import Stream from "./mock/stream";

describe("App", () => {
  it("should create express app", async (done) => {
    const out = new Stream();
    const app = await App({ rootDir: "./example/root", out });
    expect(out.toString().split("\n")).toStrictEqual([
      "GET	/foo/baa",
      "GET	/hello/:name",
      "POST	/hello/:name/update",
      "GET	/__index__"
    ]);
    await supertest(app)
      .get('/foo/baa')
      .expect(200);
    done();
  });
})