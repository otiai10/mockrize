
export default interface Config {
  host?: string;
  port?: number | string;
  title?: string;
  repository?: RepositoryConfig;
}

export interface RepositoryConfig {
    url: string;
    branch?: string;
    rootDir?: string;
}

export function ensureConfig(c: Config = {}): Config {
  if (! c.title) c.title = 'Mockrized APIs';
  if (! c.host) c.host = process.env.HOST || 'localhost';
  if (! c.port) c.port = process.env.PORT || 4001;
  if (c.repository) {
    if (! c.repository.branch) c.repository.branch = 'master';
    if (! c.repository.rootDir) c.repository.rootDir = 'root';
  }
  return c;
}