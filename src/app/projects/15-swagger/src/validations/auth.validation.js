const Joi = require('joi');

const registerValidation = payload => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		userName: Joi.string().required(),
		password: Joi.string().required(),
		photo: Joi.required(),
		age: Joi.number().required(),
	});

	const { error } = schema.validate(payload);
	if (error) return error;
	else return false;
};

const loginValidation = payload => {
	const schema = Joi.object({
		userName: Joi.string().required(),
		password: Joi.string().required(),
	});

	const { error } = schema.validate(payload);
	if (error) return error;
	else return false;
};

module.exports = { registerValidation,loginValidation };
