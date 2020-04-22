var mockrize;
try {
    mockrize = require('mockrize');
} catch (e) {
    mockrize = require('../');
}

(async () => {
    const app = await mockrize({
        rootDir: './root',
    });
    app.listen(4001)
})();
