const nodemailer = require('nodemailer');
const { smtpUsername, smtpPassword } = require('../secret');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

exports.sendEmailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Message Send: ${info.response}`);
  } catch (error) {
    console.error('Error occurred while sending email: ', error.toString());
    throw error;
  }
};
