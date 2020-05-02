import path from 'path';
import { promises as fs } from 'fs';

import Method from "../method";
import Endpoint from "../endpoint";
import JSONEndpoint from '../endpoint/json';
import JavaScriptEndpoint from '../endpoint/javascript';
import Repository from '../repository';

export default class Generator {

    constructor(private rootDir: string) {
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

    private generateIndexHandler(endpoints: Endpoint[], repository?: Repository): Endpoint {
        return {
            method: Method.GET, path: '/', file: '/',
            handler: (req, res) => {
                res.render('index', { endpoints, repository });
            },
            isValid: () => { return true; },
        } as Endpoint;
    }

    public async generate(repository?: Repository): Promise<Endpoint[]> {
        const fileEntries = await this.walk(this.rootDir);
        const endpoints = fileEntries.map(fpath => {
            const ext = path.extname(fpath);
            switch (ext) {
            case '.js':
                return new JavaScriptEndpoint(fpath, this.rootDir);
            case '.json':
                return new JSONEndpoint(fpath, this.rootDir);
            }
        }).filter(e => (!!e && e.isValid())) as Endpoint[];
        endpoints.push(this.generateIndexHandler(endpoints, repository));
        return endpoints;
    }
}
