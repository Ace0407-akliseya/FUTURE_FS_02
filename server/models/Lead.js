const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lead = sequelize.define('Lead', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('New', 'Contacted', 'Converted', 'Lost'),
        defaultValue: 'New'
    },
    notes: {
        type: DataTypes.TEXT,
        defaultValue: ''
    },
    followUpDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Lead;
