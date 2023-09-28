const nodemailer = require("nodemailer");
const config = require("../../config");

const {
  smtp: {host, port, mail, password},
} = config;

const mailConfig = {
  service: "gmail",
  host,
  port,
  secure: false,
  auth: {
    user: mail,
    pass: password,
  },
};

const transport = nodemailer.createTransport(mailConfig);

const sendMail = async ({to, subject, html}) => {
  const data = {
    to,
    subject,
    html,
    from: mail,
  };
  const res = transport.sendMail(data);

  return res;
};

module.exports = sendMail;
