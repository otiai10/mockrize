import path from "path";
import Endpoint from "./";
import Method from "../method";

/* eslint-disable @typescript-eslint/no-var-requires */
export default class JavaScriptEndpoint extends Endpoint {
    constructor(fpath: string, rootDir: string) {
        const parsed = path.parse(fpath);
        const restdir = path.dirname(fpath.replace(rootDir, ''));
        const defpath = path.join(restdir, parsed.base);
        const entry = require(fpath);
        switch (parsed.name.toLowerCase()) {
        case 'index':
            super((entry.__http_method || Method.GET).toUpperCase(), restdir, defpath, entry);
            break;
        case '_get':
            super(Method.GET, restdir, defpath, entry);
            break;
        case '_post':
            super(Method.POST, restdir, defpath, entry);
            break;
        case '_delete':
            super(Method.DELETE, restdir, defpath, entry);
            break;
        case '_put':
            super(Method.PUT, restdir, defpath, entry);
            break;
        default:
            super(Method.GET, restdir, defpath, entry);
        }
    }
}