const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
const { databaseConnect } = require("./config/db");
const syncDatabase = require("./config/syncDatabase");

const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

databaseConnect();
app.use(express.json());
syncDatabase();

app.use("/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});