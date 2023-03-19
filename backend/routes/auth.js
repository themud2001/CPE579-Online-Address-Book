const router = require("express").Router();

const { signIn, getAccountDetails } = require("../controllers/auth");

router.post("/signin", signIn);
router.get("/account-details", getAccountDetails);

module.exports = router;