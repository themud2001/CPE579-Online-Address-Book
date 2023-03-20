const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
const { databaseConnect } = require("./config/db");

const authRoutes = require("./routes/auth");
const errorMiddleware = require("./middlewares/errorMiddleware");

databaseConnect();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});