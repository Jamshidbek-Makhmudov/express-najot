const config = require("config");
const nodemailer = require("nodemailer");

const smtp = config.get("smtp");

const mailConfig = {
  service: "gmail",
  host: smtp.host,
  port: smtp.port,
  secure: false,
  auth: {
    user: smtp.user,
    pass: smtp.password,
  },
};

const transport = nodemailer.createTransport(mailConfig);

const sendMail = async (to, html) => {
  await transport.sendMail({
    to,
    from: smtp.user,
    html,
    subject: "You have New Message",
  });
};

module.exports = sendMail;
