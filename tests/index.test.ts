import App from "../src/index";
import supertest from "supertest";

describe("App", () => {
  it("should create express app", async (done) => {
    const app = await App({ rootDir: "./example/root" });
    supertest(app)
      .get('/foo/baa')
      .expect(200, done);
  });
})