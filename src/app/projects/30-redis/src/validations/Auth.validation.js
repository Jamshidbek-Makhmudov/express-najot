const Joi = require("joi");

class AuthValidator {
  static register({displayName, mail, password}) {
    const {error} = Joi.object({
      displayName: Joi.string().trim().required(),
      mail: Joi.string().email().trim().required(),
      password: Joi.string().trim().required(),
    }).validate({displayName, mail, password});

    if (error) {
      return error;
    } else {
      return false;
    }
  }
}

module.exports = AuthValidator;
