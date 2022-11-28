var nodemailer = require('nodemailer');

const SendMail = (body) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: body.email,
    subject: 'OTP for Lock System',
    text: body.otp
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { SendMail }