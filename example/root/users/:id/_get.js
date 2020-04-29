module.exports = (req, res) => {
    res.json({
        name: req.params.name,
    });
};
