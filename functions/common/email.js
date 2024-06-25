'user strict'
const mail = require('nodemailer');
const config = require('../common/config.json');

// mail fire

var sendEmail = async function (toMailAddress, subject, emailMessage) {
    let transport = mail.createTransport({
        host: config.smtpAddress,
        port: config.smtpPort,
        auth: {
            user: config.emailUsername,
            pass: config.emailPassword
        }
    });
    const message = {
        from: config.fromEmailAddress,
        to: toMailAddress,
        subject: subject,
        html: emailMessage
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            throw err;
        }
    });
}
module.exports = { sendEmail };