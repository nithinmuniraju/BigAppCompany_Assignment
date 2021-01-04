module.exports = (sequelize, Sequelize) => {
    const EmailSchema = sequelize.define("email_details", {
        to: {
            type: Sequelize.STRING
        },
        from: {
            type: Sequelize.STRING
        },
        schedule: {
            type: Sequelize.STRING
        }
    });
    return EmailSchema;
};