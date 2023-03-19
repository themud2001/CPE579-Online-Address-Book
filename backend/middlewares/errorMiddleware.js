module.exports = (err, req, res, next) => {
    if (req.headersSent) return next(err);

    console.log(err);
    res.status(500).json({ errorMessage: "An unexpected error occurred" });
};