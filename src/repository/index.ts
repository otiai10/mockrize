import path from 'path';
import { RepositoryConfig } from '../config';

export default abstract class Repository {
  public url: string;
  public rootDir: string;
  public branch: string;
  constructor(url: string, rootDir?: string, branch?: string) {
    this.url = url;
    this.rootDir = rootDir || 'root';
    this.branch = branch || 'master';
  }
  abstract editorURL(p: string): string;
  abstract rawURL(p: string): string;
}

export class GitHubRepository extends Repository {
  editorURL(p: string): string {
    return path.join(this.url, 'edit', this.branch, this.rootDir, p);
  }
  rawURL(p: string): string {
    const u = new URL(this.url);
    return path.join(`${u.protocol}//raw.githubusercontent.com`, u.pathname, this.branch, this.rootDir, p);
  }
}

export class GitLabRepository extends Repository {
  editorURL(p: string): string {
    return path.join(this.url, "-", "blob", this.branch, this.rootDir, p);
  }
  rawURL(p: string): string {
    return path.join(this.url, "-", "raw", this.branch, this.rootDir, p);
  }
}

export class AzureDevOpsRepository extends Repository {
  editorURL(p: string): string {
    const url = new URL(this.url);
    url.searchParams.set("path", path.join("/", this.rootDir, p));
    return url.toString();
  }
  rawURL(p: string): string {
    // https://stackoverflow.com/questions/54137998/is-it-possible-to-have-a-link-to-raw-content-of-file-in-azure-devops
    const [proj, repo] = this.url.split("/_git/");
    const url = new URL(proj);
    url.pathname = path.join(url.pathname, "_apis", "sourceProviders", "TfsGit", "filecontents");
    url.searchParams.set("repository", repo);
    url.searchParams.set("commitOrBranch", this.branch);
    url.searchParams.set("api-version", "5.0-preview.1");
    url.searchParams.set("path", path.join("/", this.rootDir, p));
    return url.toString();
  }
}

export class CustomRepository extends Repository {
  private _pathToURL: (p: string) => string;
  constructor(url: string, pathToURL?: (p: string) => string, rootDir?: string, branch?: string) {
    super(url, rootDir, branch);
    this._pathToURL = pathToURL || ((p: string): string => path.join(this.url, 'tree', this.branch, this.rootDir, p));
  }
  editorURL(p: string): string {
    return this._pathToURL(p);
  }
  rawURL(p: string): string {
    console.info("[INFO]", "rawURL func of CustomRepository is NOT implemented yet.")
    return this._pathToURL(p);
  }
}

export function createRepository(config?: RepositoryConfig): Repository | undefined {
  if (!config) {
    return;
  }
  const u = new URL(config.url);
  switch (u.hostname) {
  case 'github.com':
    return new GitHubRepository(config.url, config.rootDir, config.branch);
  case 'dev.azure.com':
    return new AzureDevOpsRepository(config.url, config.rootDir, config.branch);
  default:
    console.error(`[INFO] Unknown repository provider "${u.hostname}", use CustomRepository`);
    return new CustomRepository(config.url);
  }
}