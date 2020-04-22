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
    });
    app.listen(4001)
})();
