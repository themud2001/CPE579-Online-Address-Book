const { Sequelize, Op } = require("sequelize");

const Record = require("../models/Record");
const sendMail = require("../utils/sendMail");

module.exports.addRecord = async (req, res, next) => {
    if (
        !req.body.name ||
        !req.body.address ||
        !req.body.phone ||
        !req.body.workField ||
        !req.body.longitude ||
        !req.body.latitude ||
        req.body.name.trim() === "" ||
        req.body.address.trim() === "" ||
        req.body.phone.trim() === "" ||
        req.body.workField.trim() === "" ||
        isNaN(req.body.longitude) ||
        isNaN(req.body.latitude)
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

module.exports.editRecord = async (req, res, next) => {
    if (
        !req.body.id ||
        !req.body.name ||
        !req.body.address ||
        !req.body.phone ||
        !req.body.workField ||
        !req.body.longitude ||
        !req.body.latitude ||
        req.body.id.trim() === "" ||
        req.body.name.trim() === "" ||
        req.body.address.trim() === "" ||
        req.body.phone.trim() === "" ||
        req.body.workField.trim() === "" ||
        isNaN(req.body.longitude) ||
        isNaN(req.body.latitude)
    ) {
        return res.status(400).json({ errorMessage: "Invalid input" });
    }

    try {
        const record1 = await Record.findOne({ where: { id: req.body.id } });

        if (!record1) {
            return res.status(404).json({ errorMessage: "Record not found" });
        }

        const record2 = await Record.findOne({ where: { name: req.body.name } });

        if (record2 && record1.id != record2.id) {
            return res.status(409).json({ errorMessage: "Name already exists" });
        }

        await Record.update(req.body, { where: { id: req.body.id } });
        res.status(201).end();
    } catch (error) {
        next(error);
    }
};

module.exports.deleteRecord = async (req, res, next) => {
    const id = req.params.id;

    if (!id || id.trim() === "" || isNaN(id)) {
        return res.status(400).json({ errorMessage: "Invalid ID" });
    }

    try {
        const record = await Record.findOne({ where: { id } });

        if (!record) {
            return res.status(404).json({ errorMessage: "Record not found" });
        }

        await record.destroy();

        res.status(200).end();
    } catch (error) {
        next(error);
    }
};

module.exports.getSpecificRecord = async (req, res, next) => {
    const search = req.params.search.trim();
    const email = req.query.email;
    const nearestLocation = req.query.nearestLocation;
    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);

    if (!search || search === "" || search.trim() === "") {
        return res.status(400).json({ errorMessage: "Invalid search value" });
    }

    if (nearestLocation && (
        !longitude ||
        isNaN(longitude) ||
        !latitude ||
        isNaN(latitude)
    )) {
        return res.status(400).json({ errorMessage: "Invalid location coordinates" });
    }

    try {
        const likeSearch = { [Op.like]: `%${search}%` };
        let options = {
            where: {
                [Op.or]: [
                    { name: likeSearch },
                    { address: likeSearch },
                    { phone: likeSearch },
                    { workField: likeSearch }
                ]
            }
        };

        if (!isNaN(search)) {
            options = {
                where: {
                    [Op.or]: [
                        { name: likeSearch },
                        { address: likeSearch },
                        { phone: likeSearch },
                        { workField: likeSearch },
                        { longitude: search },
                        { latitude: search }
                    ]
                }
            };
        }

        if (nearestLocation) {
            options.order = [
                Sequelize.literal(`SQRT(POWER(${longitude} - longitude, 2) + POWER(${latitude} - latitude, 2))`)
            ];
        }

        const records = await Record.findAll(options);

        if (!records || records.length === 0) {
            return res.status(404).json({ errorMessage: "Record not found" });
        }

        if (email) {
            let html = "<table style='padding: 10px;'><thead><th style='border: 1px solid black'>Name</th><th style='border: 1px solid black'>Address</th><th style='border: 1px solid black'>Phone</th><th style='border: 1px solid black'>Work Field</th><th colspan='2' style='border: 1px solid black'>Location Coordinates</th></thead><tbody>";

            for (let i = 0; i < records.length; i++) {
                html += `<tr><td style='border: 1px solid black'>${records[i].name}</td><td style='border: 1px solid black'>${records[i].address}</td><td style='border: 1px solid black'>${records[i].phone}</td><td style='border: 1px solid black'>${records[i].workField}</td><td style='border: 1px solid black'>${records[i].longitude}</td><td style='border: 1px solid black'>${records[i].latitude}</td></tr>`;
            }

            html += "</tbody></table>";

            sendMail(email, html);
        }

        res.status(200).json({ records });
    } catch (error) {
        next(error);
    }
};

module.exports.getRecords = async (req, res, next) => {
    try {
        const count = await Record.count();
        let page = Math.floor(req.query.page);

        if (!page || page <= 0) {
            page = 1;
        }

        let offset = page * 10 - 10;

        if (offset >= count) {
            offset = count - (count % 10);

            if (offset === count) {
                offset = offset - 10;
            }
        }

        const records = await Record.findAll({ limit: 10, offset });

        if (!records || records.length === 0 || count === 0) {
            return res.status(404).json({ errorMessage: "No records found" });
        }

        return res.status(200).json({ records, count });
    } catch (error) {
        next(error);
    }
};