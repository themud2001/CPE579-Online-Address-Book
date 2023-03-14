const Admin = require("../models/Admin");

module.exports = async () => {
    try {
        await Admin.sync();
        console.log("Synchronized the database!");
    } catch (error) {
        console.log("Failed to synchronize: " + error);
    }
};