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

        res.status(200).json({ username: admin.username });
    } catch (error) {
        next(error);
    }
};