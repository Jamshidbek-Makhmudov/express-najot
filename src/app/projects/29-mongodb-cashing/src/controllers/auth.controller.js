const Users = require("../models/User.model");
const CustomError = require("../utils/custom-error");
const {generateToken} = require("../utils/jwt");
const randomOtp = require("../utils/otp-generator");
const client = require("../utils/redis");
const sendMail = require("../utils/send-mail");

const register = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await Users.findOne({email, isVerified: true});

    if (user) throw new CustomError(403, "Email already registered");

    const otp = randomOtp();
    const html = `<b style='font-size: 40px'>Your verification password is: ${otp}</b>`;

    sendMail({ to: email, subject: "Verification", html });
    
//client yani redis vaqtinchalik cashe database cli yoqilgan xolatda turishi kerak
    await client.connect();
    await client.set(email, JSON.stringify({otp, password}), {ex: 120});
    await client.disconnect();

    res.json({message: "Verification code sent your mail"});
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const {otp, email} = req.body;

    await client.connect();
    const cache = JSON.parse(await client.get(email));

    if (otp !== cache.otp) throw new CustomError(403, "Invalid OTP");
    /*shu yerda agar foydalanuvchi 3martadan kop xato yozsa blocklash uchun
    cashega yana 1ta urinishlar soni degan qator qoshib ketib har safar xato kiritlganda shu urinihlar sonini if ni ichida kamaytirb ketsa boladi va 0 boganda casheni tozalab yubrosh kerak boladi
    */

    await client.del(email);
    await client.disconnect();

    const user = await Users.create({
      email,
      password: cache.password,
      isVerified: true,
    });

    const token = generateToken({id: user._id});

    res.status(201).json({message: "Success", data: token});
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

module.exports = {
  verify,
  register,
};
