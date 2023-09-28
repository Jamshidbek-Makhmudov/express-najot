const Joi = require("joi");

class PostValidator {
  static create(options) {
    const {error} = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }).validate(options);

    if (error) return error;
    else return false;
  }
}

module.exports = PostValidator;
