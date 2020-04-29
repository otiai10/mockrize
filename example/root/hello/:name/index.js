module.exports = (req, res) => {
    res.json({
        "status": "success",
        "body": req.body,
    });
};
module.exports.__http_method = 'GET';
