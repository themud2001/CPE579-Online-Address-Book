const Record = require("../models/Record");

module.exports.addRecord = async (req, res, next) => {
    if (
        !req.body.name ||
        !req.body.address ||
        !req.body.phone ||
        !req.body.workField ||
        !req.body.coordinates ||
        req.body.name.trim(" ") === "" ||
        req.body.address.trim(" ") === "" ||
        req.body.phone.trim(" ") === "" ||
        req.body.workField.trim(" ") === "" ||
        req.body.coordinates.trim(" ") === ""
    ) {
        return res.status(400).json({ errorMessage: "Invalid input" });
    }
    
    try {
        const record = await Record.findOne({ where: { name: req.body.name } });

        if (record) {
            return res.status(409).json({ errorMessage: "Record already exists" });
        }

        await Record.create(req.body);
        res.status(201).end();
    } catch (error) {
        next(error);
    }
};

module.exports.getRecords = async (req, res, next) => {
    try {
        const records = await Record.findAll({ limit: 15 });

        if (!records || records.length === 0) {
            return res.status(404).json({ errorMessage: "No records found" });
        }

        return res.status(200).json({ records });
    } catch (error) {
        next(error);
    }
};