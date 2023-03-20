const router = require("express").Router();

const { addRecord, getRecords } = require("../controllers/records");

router.post("/", addRecord);
router.get("/", getRecords);

module.exports = router;