/**
 * Import MySQL database configuration
 */
const dbConfig = require('../config/config');

const Sequelize = require("sequelize"); // Initialize sequence

/**
 * Configure sequelize with DataBase
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.emails = require("./emailSchema")(sequelize, Sequelize);
db.failedEmails = require("./emailFailedSchems")(sequelize, Sequelize);

db.failedEmails.hasMany(db.emails, {
    foreignKey: "id",
    timestamp: false 
})
module.exports = db;