const nodemailer = require('nodemailer');

const db = require("../models");
const failedEmailSchems = db.failedEmails;

const defaultMailingList = "test@test.com";
const senderEmail = "noReply.com";

module.exports = {
    sendMail: async (subject, text, to = defaultMailingList, id) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            const message = {
                from: `BigAppCompany <${senderEmail}>`,
                to,
                subject,
                text: subject,
                html: text,
            };
            transporter.sendMail(message, async (err, info) => {
                if(err && typeof err != "undefined"){
                    const obj = {
                        email_id: id,
                        is_falied: "1"
                    }
                    await failedEmailSchems.create(obj);
                    return err;
                }
            });
        } catch (e) {
            console.log('MailException::', e);
        }
    },
};