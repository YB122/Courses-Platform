import joi from "joi";

export const registerSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(30),
  role: joi
    .string()
    .valid("admin", "teacher", "student")
    .optional()
    .default("student"),
  cardNumberTeacher: joi
    .string()
    .pattern(/^[0-9]{16}$/)
    .optional(),
  cardNumberStudent: joi
    .string()
    .pattern(/^[0-9]{16}$/)
    .optional(),
  profilePicture: joi.string().optional(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(30),
});
