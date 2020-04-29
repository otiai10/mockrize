import express from 'express';
import path from 'path';

import Generator from './generator';
import Options from './options';

export interface MockrizedRequest extends express.Request {
    Mockrize: {
        const: { [key: string]: string | number };
    };
}

function ConstantsMiddleware(constants: { [key: string]: string | number } = {}): express.Handler {
    return (req, res, next): void => {
        (req as MockrizedRequest).Mockrize = {const: constants};
        next();
    };
}

export async function Router(opt: Options): Promise<express.Router> {
    const router = express.Router();
    router.use(ConstantsMiddleware(opt.constants || {}));
    const rootDir = path.isAbsolute(opt.rootDir) ?
        opt.rootDir : path.join(process.cwd(), opt.rootDir);
    const generator = new Generator(rootDir);
    const endpoints = await generator.generate();
    endpoints.map(e => {
        console.log(e.method.toUpperCase(), e.path);
        router[e.method](e.path, e.handler as express.Handler);
    });
    return router;
}

export default async function App(opt: Options): Promise<express.Application> {
    const app = express();
    const r = await Router(opt);
    app.use(express.json());
    app.use('/', r);
    return app;
}

module.exports = App;
