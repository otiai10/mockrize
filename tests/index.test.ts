import App from "../src/index";

describe("hoge", () => {
  it("should be hoge", async (done) => {
    await App({ rootDir: "./example/root" });
    done();
  });
})