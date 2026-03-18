import joi from "joi";

export const questionSchema = joi.object({
  text: joi.string().min(3).max(30).required(),
  options: joi.array().items(joi.string()).required(),
  sessionid: joi.string().optional(),
  correctAnswerIndex: joi.string().valid("0", "1", "2", "3").required(),
});

export const editQuestionSchema = joi.object({
  text: joi.string().min(3).max(30).optional(),
  options: joi.array().items(joi.string()).optional(),
  sessionid: joi.string().optional(),
  correctAnswerIndex: joi.string().valid("0", "1", "2", "3").optional(),
});
