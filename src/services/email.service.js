require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-leger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegistrationEmail = async (userEmail, name) => {
  const subject = "Welcome to Backend Ledger";

  const text = `Hello ${name}, your account has been created successfully.`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2 style="color:#2c3e50;">Welcome to Backend Ledger, ${name}!</h2>

    <p>
      We're excited to have you onboard. Your account has been successfully created
      and you can now start using our digital banking services.
    </p>

    <p>
      With Backend Ledger, you can securely manage your transactions, track balances,
      and access your financial records anytime.
    </p>

    <p>
      If you did not create this account, please contact our support team immediately.
    </p>

    <br/>

    <p>Best regards,</p>
    <p><strong>Backend Ledger Team</strong></p>

  </div>
`;

  await sendEmail(userEmail, subject, text, html);
};

module.exports={
    sendRegistrationEmail
}