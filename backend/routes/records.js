const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { addRecord, getRecords } = require("../controllers/records");

router.post("/", authMiddleware, addRecord);
router.get("/", getRecords);

module.exports = router;