import {
    createRepository,
    GitHubRepository,
    GitLabRepository,
    AzureDevOpsRepository,
} from "../src/repository";

describe("createRepository", () => {
    describe("should create a Repostory", () => {
        test("when it's GitHub", async (done) => {
            const repo = createRepository({
                url: "https://github.com/otiai10/mockrize",
            });
            expect(repo).toBeInstanceOf(GitHubRepository);
            done();
        })
        test("when it's GitLab", async (done) => {
            const repo = createRepository({
                url: "https://gitlab.com/otiai10/mockrize-example",
            });
            expect(repo).toBeInstanceOf(GitLabRepository);
            done();
        });
        test("when it's Azure DevOps", async (done) => {
            const repo = createRepository({
                url: "https://dev.azure.com/otai10/mockrize/_git/example",
            });
            expect(repo).toBeInstanceOf(AzureDevOpsRepository);
            done();
        });
    });
});