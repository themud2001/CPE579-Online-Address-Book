const { Sequelize } = require("sequelize");
const syncDatabase = require("./syncDatabase");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
});

const databaseConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database");

        await syncDatabase();
    } catch (error) {
        console.log("Unable to connect to the database: " + error);
    }
};

module.exports.sequelize = sequelize;
module.exports.databaseConnect = databaseConnect;