const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

module.exports = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
        return res.status(401).json({ errorMessage: "Unauthorized: Token not found" });
    }

    const token = authHeaders.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ where: { username: decoded.username } });

        if (!admin) {
            return res.status(401).json({ errorMessage: "Unauthorized: Account not found" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ errorMessage: "Unauthorized: Invalid token" });
    }
};