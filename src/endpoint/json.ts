import Endpoint from ".";
import Method from "../method";
import path from "path";

/* eslint-disable @typescript-eslint/no-var-requires */
export default class JSONEndpoint extends Endpoint {
  constructor(fpath: string, rootDir: string) {
    const parsed = path.parse(fpath);
    const restdir = path.dirname(fpath.replace(rootDir, ''));
    const restpath = (parsed.name == 'index') ? restdir : path.join(restdir, parsed.name);
    const entry = require(fpath);
    switch (parsed.name.toLowerCase()) {
    case 'index':
        super((entry.__http_method || Method.GET).toUpperCase(), restdir, (req, res) => res.json(entry));
        break;
    case '_get':
        super(Method.GET, restdir, (req, res) => res.json(entry));
        break;
    case '_post':
        super(Method.POST, restdir, (req, res) => res.json(entry));
        break;
    case '_delete':
        super(Method.DELETE, restdir, (req, res) => res.json(entry));
        break;
    case '_put':
        super(Method.PUT, restdir, (req, res) => res.json(entry));
        break;
    default:
        super(Method.GET, restpath, (req, res) => res.json(entry));
    }
  }
}