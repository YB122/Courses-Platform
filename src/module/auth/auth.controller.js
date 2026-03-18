import { Router } from "express";
import { validateInput } from "../../common/utils/validate.js";
import { loginSchema, registerSchema } from "./auth.validate.js";
import { login, register } from "./auth.service.js";
import { upload } from "../../common/middleware/multer.js";
let router = Router();

router.post(
  "/register",
  validateInput(registerSchema),
  upload().single("profilePicture"),
  register,
);
router.post("/login", validateInput(loginSchema), login);
export default router;
