const Joi = require("joi");

class TodoValidator {
  static async create({title, description}) {
    const {error} = Joi.object({
      title: Joi.string().max(64).required(),
      description: Joi.string().max(1024).required(),
    }).validate({title, description});

    if (error) {
      return {error};
    } else {
      return {error: false};
    }
  }
}

module.exports = TodoValidator;
