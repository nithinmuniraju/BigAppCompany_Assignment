module.exports = (sequelize, Sequelize) => {
    const FailedEmailSchema = sequelize.define("failed_email", {
        email_id: {
            type: Sequelize.INTEGER
        },
        is_falied: {
            type: Sequelize.TINYINT
        }
    });
    return FailedEmailSchema;
};