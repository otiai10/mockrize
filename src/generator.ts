import path from 'path';
import { promises as fs } from 'fs';

import Method from "./method";
import Endpoint from "./endpoint";
import JSONEndpoint from './endpoint/json';

export default class Generator {

    constructor(private rootDir: string) {
    }

    /* eslint-disable @typescript-eslint/no-var-requires */
    private generateForJavaScriptImportable(fpath: string): Endpoint | undefined {
        const parsed = path.parse(fpath);
        const restdir = path.dirname(fpath.replace(this.rootDir, ''));
        const restpath = (parsed.name == 'index') ? restdir : path.join(restdir, parsed.name);
        const entry = require(fpath);
        if (entry instanceof Function) {
            switch ((entry.__http_method || '').toUpperCase()) {
            case 'GET':
                return new Endpoint(Method.GET, restpath, entry);
            case 'POST':
                return new Endpoint(Method.POST, restpath, entry);
            }
        } else if (entry.constructor === Object) {
            return new JSONEndpoint(Method.GET, restpath, entry);
        }

    }

    private async walk(dir: string): Promise<string[]> {
        const files = await fs.readdir(dir);
        const contents = await Promise.all(files.map(async file => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) return this.walk(filePath);
            if (stats.isFile()) return [filePath];
            return [];
        }));
        return contents.reduce((all, content) => all.concat(content), []);
    }

    private generateIndexHandler(endpoints: Endpoint[]): Endpoint {
        return {
            method: Method.GET,
            path: '/__index__',
            handler: (req, res) => {
                res.send(endpoints.map(e => `${e.method.toUpperCase()}\t${e.path}`).join('\n'));
            },
        } as Endpoint;
    }

    public async generate(): Promise<Endpoint[]> {
        const fileEntries = await this.walk(this.rootDir);
        const endpoints = fileEntries.map(fpath => {
            const ext = path.extname(fpath);
            switch (ext) {
            case '.js':
            case '.json':
                return this.generateForJavaScriptImportable(fpath);
            }
        }).filter(e => !!e) as Endpoint[];
        endpoints.push(this.generateIndexHandler(endpoints));
        return endpoints;
    }
}
