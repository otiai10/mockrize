import Endpoint from ".";
import Method from "../method";
import path from "path";

/* eslint-disable @typescript-eslint/no-var-requires */
export default class JSONEndpoint extends Endpoint {
  constructor(fpath: string, rootDir: string) {
    const parsed = path.parse(fpath);
    const restdir = path.dirname(fpath.replace(rootDir, ''));
    const restpath = (parsed.name == 'index') ? restdir : path.join(restdir, parsed.name);
    super(Method.GET, restpath, (req, res) => res.json(require(fpath)));
  }
}