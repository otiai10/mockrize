const express = require('express');
const path = require('path');
const Generator = require('./generator');

const Router = async (opt) => {
    const router = express.Router();
    const rootDir = path.isAbsolute(opt.rootDir) ?
        opt.rootDir : path.join(process.cwd(), opt.rootDir);
    const generator = new Generator(rootDir);
    const endpoints = await generator.generate();
    endpoints.map(e => {
        console.log(e.method.toUpperCase(), e.path);
        router[e.method](e.path, e.handler);
    });
    return router;
};

const App = async (opt) => {
    const app = express();
    const r = await Router(opt);
    app.use('/', r);
    return app;
};

module.exports = App;
module.exports.Router = Router;
