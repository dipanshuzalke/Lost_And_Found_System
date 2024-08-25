const Joi = require("joi");

module.exports.reportSchema = Joi.object({
  report: Joi.object({
    itemName: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    question: Joi.string().required(),
    itemType: Joi.string().required(),
    status: Joi.string().required(),
    image: Joi.string().required(),
  }).required(),
});
