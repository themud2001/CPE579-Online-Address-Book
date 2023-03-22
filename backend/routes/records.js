const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
    addRecord,
    editRecord,
    deleteRecord,
    getSpecificRecord,
    getRecords
} = require("../controllers/records");

router.post("/", authMiddleware, addRecord);
router.put("/", authMiddleware, editRecord);
router.delete("/:id", authMiddleware, deleteRecord);
router.get("/:search", getSpecificRecord);
router.get("/", getRecords);

module.exports = router;