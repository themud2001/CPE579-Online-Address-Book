const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Admin = sequelize.define("admins", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
});

module.exports = Admin;