const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// DEV ONLY
// const randomWords = require("random-words");

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
    coordinates: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

// DEV ONLY
// for (let i = 0; i < 15; i++) {
//     Record.create({
//         name: randomWords(),
//         address: randomWords(),
//         phone: randomWords(),
//         workField: randomWords(),
//         coordinates: randomWords()
//     });
// }

module.exports = Record;