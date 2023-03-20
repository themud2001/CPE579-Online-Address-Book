module.exports = async () => {
    const Admin = require("../models/Admin");
    const Record = require("../models/Record");
    
    try {
        await Admin.sync({ alter: true});
        await Record.sync({ alter: true});
        console.log("Synchronized the database!");
    } catch (error) {
        console.log("Failed to synchronize: " + error);
    }
};