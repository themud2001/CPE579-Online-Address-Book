const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

module.exports.signIn = async (req, res, next) => {
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
            return res.status(404).json({ errorMessage: "Account not found" });
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

module.exports.getAccountDetails = (req, res) => {
    res.status(200).json({ username: req.user.username });
};