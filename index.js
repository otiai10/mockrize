const express = require('express');
const path = require('path');
const Generator = require('./generator');

const ConstantsMiddleware = (constants) => {
    return (req, res, next) => {
        req.Mockrize = {const: constants};
        next();
    };
};

const Router = async (opt) => {
    const router = express.Router();
    router.use(ConstantsMiddleware(opt.constants || {}));
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
    app.use(express.json());
    app.use('/', r);
    return app;
};

module.exports = App;
module.exports.Router = Router;
