const nodemailer = require('nodemailer');

const defaultMailingList = "test@test.com";
const senderEmail = "noReply.com";

module.exports = {
    sendMail: async (subject, text, to = defaultMailingList) => {
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
            transporter.sendMail(message, () => {});
        } catch (e) {
            console.log('MailException::', e);
        }
    },
};