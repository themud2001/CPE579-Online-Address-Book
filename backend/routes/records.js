const router = require("express").Router();

const { getRecords } = require("../controllers/records");

router.get("/", getRecords);

module.exports = router;