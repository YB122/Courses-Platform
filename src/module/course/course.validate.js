import joi from "joi";

export const createCourseSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  description: joi.string().min(10).max(500).required(),
  teacherid: joi.string().required(),
  price: joi.number().optional(),
  thumbnail: joi.string().required(),
  category: joi.string().min(3).max(30).required(),
});

export const editCourseSchema = joi.object({
  title: joi.string().email().optional(),
  description: joi.string().min(10).max(500).optional(),
  price: joi.number().optional(),
  thumbnail: joi.string().optional(),
  category: joi.string().min(3).max(30).optional(),
});
