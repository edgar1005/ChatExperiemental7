require('dotenv').config();
const config = require('./keys.json')[process.env.NODE_ENV];

module.exports = {
    storage: config ? config.storage : process.env.DB_STORAGE,
    dialect: config ? config.dialect : process.env.DB_DIALECT,
    define: {
        timestamps: true,
        undescored: true
    },
    timezone: '-06:00'
}