const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const app = express();
const { databaseConnect } = require("./config/db");

const authRoutes = require("./routes/auth");
const recordsRoutes = require("./routes/records");
const errorMiddleware = require("./middlewares/errorMiddleware");

databaseConnect();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/records", recordsRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});