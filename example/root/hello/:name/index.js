module.exports = (req, res) => {
    res.send(`Hello, ${req.params.name}`);
};
module.exports.__http_method = 'GET';
