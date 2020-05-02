var path = require('path');
var mockrize;
try {
    mockrize = require('../lib');
    console.debug("[DEBUG]", "mockrize imported from relative path");
} catch (e) {
    mockrize = require('mockrize');
}

const config = {
    title: 'Mockrize Example APIs',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4001,
    repository: {
        url: 'https://github.com/otiai10/mockrize',
        rootDir: 'example/root',
        branch: 'master',
    }
};

const constants = {
    token: 'foo'
};

(async () => {
    const app = await mockrize({
        config,
        rootDir: path.join(__dirname, 'root'),
        constants,
    });
    if (process.env.NODE_ENV !== "test") {
        app.listen(process.env.PORT || 4001, () => {
            console.log(`http://${config.host}:${config.port}`);
        })
    }
})();
