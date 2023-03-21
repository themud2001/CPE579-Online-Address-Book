const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { addRecord, deleteRecord, getRecords } = require("../controllers/records");

router.post("/", authMiddleware, addRecord);
router.delete("/:id", authMiddleware, deleteRecord);
router.get("/", getRecords);

module.exports = router;