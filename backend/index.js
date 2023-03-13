const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3090;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});