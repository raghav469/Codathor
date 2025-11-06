const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_SECURE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD
  }
});

exports.sendEnrollmentEmail = async (user, enrollment) => {
  try {
    const mailOptions = {
      from: `"Codathor" <${config.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Competition Enrollment Confirmation',
      html: `
        <h1>Welcome to the competition!</h1>
        <p>You have successfully enrolled in ${enrollment.competition.title}.</p>
        <p>Competition starts on ${new Date(enrollment.competition.startDate).toLocaleDateString()}</p>
        <a href="${config.BASE_URL}/competitions/${enrollment.competition._id}">View Competition Details</a>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending enrollment email:', err);
  }
};