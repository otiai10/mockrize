var path = require('path');
var mockrize;
try {
    mockrize = require('../lib');
    console.log("mockrize imported from relative path");
} catch (e) {
    mockrize = require('mockrize');
}

(async () => {
    const app = await mockrize({
        rootDir: path.join(__dirname, 'root'),
        constants: {
            token: 'foo',
        },
    });
    if (process.env.NODE_ENV !== "test") {
        app.listen(4001)
    }
})();
