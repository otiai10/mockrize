import Config from "./config";

export default interface Options {
  rootDir: string;
  constants?: {[key: string]: string | number};
  out?: { write(msg: string): void };
  config?: Config;
}