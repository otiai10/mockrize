var mockrize;
try {
    mockrize = require('../');
    console.log("mockrize imported from relative path");
} catch (e) {
    mockrize = require('mockrize');
}

(async () => {
    const app = await mockrize({
        rootDir: './root',
        constants: {
            token: 'foo',
        },
    });
    app.listen(4001)
})();
