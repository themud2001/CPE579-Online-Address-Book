const router = require("express").Router();

const authMiddleware  = require("../middlewares/authMiddleware");
const { signIn, getAccountDetails } = require("../controllers/auth");

router.post("/signin", signIn);
router.get("/account-details", authMiddleware, getAccountDetails);

module.exports = router;