const Record = require("../models/Record");

module.exports.getRecords = async (req, res, next) => {
    try {
        const records = await Record.findAll({ limit: 15 });

        if (!records) {
            return res.status(404).json({ errorMessage: "No records found" });
        }

        return res.status(200).json({ records });
    } catch (error) {
        next(error);
    }
};