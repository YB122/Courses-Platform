import joi from "joi";

export const createSessionSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  contentType: joi.string().valid("pdf", "video").optional(),
  duration: joi.string().optional(),
  filePath: joi.string().optional(),
  questions: joi.array().items(joi.string()).optional(),
});
export const editSessionSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  contentType: joi.string().valid("pdf", "video").optional(),
  duration: joi.string().optional(),
  filePath: joi.string().optional(),
  questions: joi.array().items(joi.string()).optional(),
});
