const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
const { databaseConnect } = require("./config/db");
const syncDatabase = require("./config/syncDatabase");

const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

databaseConnect();
app.use(express.json());
app.use(cors());
syncDatabase();

app.use("/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});