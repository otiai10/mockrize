module.exports = (req, res) => {
    res.json({
        message: `Hello, ${req.params.name}`,
        const: req.Mockrize.const,
    });
};
module.exports.__http_method = 'GET';
