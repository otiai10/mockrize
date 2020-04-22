const fs = require('fs').promises;
const path = require('path');

class Generator {

    constructor(rootDir) {
        this.rootDir = rootDir;
    }

    /* private */generateForJavaScriptImportable(fpath) {
        const parsed = path.parse(fpath);
        const restdir = path.dirname(fpath.replace(this.rootDir, ''));
        const restpath = (parsed.name == 'index') ? restdir : path.join(restdir, parsed.name);
        const entry = require(fpath);
        if (entry instanceof Function) {
            switch ((entry.__http_method || '').toUpperCase()) {
            case 'GET':
                return { method: 'get', path: restpath, handler: entry }
            case 'POST':
                return { method: 'post', path: restpath, handler: entry }
            }
        } else if (entry.constructor === Object) {
            return { method: 'get', path: restpath, handler: (req, res) => res.json(entry) }
        }

    }

    /* private */async walk(dir) {
        let files = await fs.readdir(dir);
        files = await Promise.all(files.map(async file => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) return this.walk(filePath);
            else if(stats.isFile()) return filePath;
        }));
        return files.reduce((all, folderContents) => all.concat(folderContents), []);
    }

    // TODO: Support Swagger
    // TODO: Make it friendly page
    /* private */generateIndexHandler(endpoints) {
        return {
            method: 'get', path: '/__index__',
            handler: (req, res) => {
                res.send(endpoints.map(e => `${e.method.toUpperCase()}\t${e.path}`).join('\n'));
            },
        };
    }

    /* public */async generate() {
        const fileEntries = await this.walk(this.rootDir);
        const endpoints = fileEntries.map(fpath => {
            const ext = path.extname(fpath);
            switch (ext) {
            case '.js':
            case '.json':
                return this.generateForJavaScriptImportable(fpath);
            }
        });
        endpoints.push(this.generateIndexHandler(endpoints));
        return endpoints;
    }
}

module.exports = Generator;
