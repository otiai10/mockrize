# mockrize

Create RESTful API mock server easily, according to directory structures of your repository.

[![GitHub Action](https://github.com/otiai10/mockrize/workflows/Node.js%20CI/badge.svg)](https://github.com/otiai10/mockrize/actions)
[![codecov](https://codecov.io/gh/otiai10/mockrize/branch/master/graph/badge.svg)](https://codecov.io/gh/otiai10/mockrize)
[![Latest Stable Version](https://img.shields.io/npm/v/mockrize.svg)](https://www.npmjs.com/package/mockrize)

# Example

Given you have this structure:

```
.
├── server.js
└── root
    ├── foo
    │   └── baa.json
    └── hello
        └── :name
            ├── index.js
            └── update.js
```

You `server.js` looks like:

```javascript
const mockrize = require('mockrize');

const app = await mockrize({
    rootDir: './root',
});

app.listen(4001);
```

Kick `node server.js`, then

```
% node server.js
GET /foo/baa
GET /hello/:name
POST /hello/:name/update
```

Those endpoints are **automatically** generated.

# Why?

It's always paiful to make agreement between server-devs and frontend-devs on how API req/res should look like. We've had headache when we manage "sandbox" or "mock" API services **WITHOUT** permission control then changes make things chaotic.

This `mockrize` package can provide a way to create HTTP RESTful API mock server **based on** the folder structure of your git repository, which means you can control write/read permission and track the change logs of your mock-API.

# TODOs and Issues

- https://github.com/otiai10/mockrize/issues
