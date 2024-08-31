const Joi = require("joi");

module.exports.reportSchema = Joi.object({
  report: Joi.object({
    date: Joi.string().allow(""),
    time: Joi.number().allow(""),
    itemName: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    question: Joi.string().required(),
    itemType: Joi.string().required(),
    status: Joi.string().required(),
    image: Joi.string().allow(""),
  }).required(),
});

module.exports.feedbackSchema = Joi.object({
  feedback: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),
});
