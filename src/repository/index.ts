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
    // TODO: implement
    console.info("[INFO]", "editorURL func of AzureDevOpsRepository is NOT implemented yet.")
    return p;
  }
  rawURL(p: string): string {
    console.info("[INFO]", "rawURL func of AzureDevOpsRepository is NOT implemented yet.")
    return p;
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

export function repository(config?: RepositoryConfig): Repository | undefined {
  if (!config) {
    return;
  }
  const u = new URL(config.url);
  switch (u.hostname) {
  case 'github.com':
    return new GitHubRepository(config.url, config.rootDir, config.branch);
  default:
    console.error(`[INFO] Unknown repository provider "${u.hostname}", use CustomRepository`);
    return new CustomRepository(config.url);
  }
}