const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Record = sequelize.define("records", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workField: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Record;