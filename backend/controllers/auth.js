const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

module.exports.signIn = async (req, res) => {
    const { username, password } = req.body;

    if (
        !username ||
        !password ||
        username.trim() === "" ||
        password.trim() === ""
    ) {
        return res.status(400).json({ errorMessage: "Invalid credentials" });
    }

    try {
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(404).json({ errorMessage: "Account is not found" });
        }

        if (password !== admin.password) {
            return res.status(401).json({ errorMessage: "Incorrect password" });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ username: admin.username, token });
    } catch (error) {
        next(error);
    }
};

module.exports.getAccountDetails = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            try {
                const admin = await Admin.findOne({ where: { username: decoded.username } });

                if (!admin) {
                    return res.status(401).json({ errorMessage: "Account not found" });
                }

                return res.status(200).json({ username: admin.username });
            } catch (error) {
                return next(error);
            }
        } catch (error) {
            return res.status(401).json({ errorMessage: "Invalid token" });
        }
    }

    return res.status(401).json({ errorMessage: "No token found" });
};