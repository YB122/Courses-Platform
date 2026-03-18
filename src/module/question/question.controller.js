import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { validateInput } from "../../common/utils/validate.js";
import { editQuestionSchema } from "./question.validate.js";
import { deleteQuestion, editQuestion } from "./question.service.js";


let router = Router();

router.put("/:id", auth,validateInput(editQuestionSchema), editQuestion);
router.delete("/:id", auth, deleteQuestion);


export default router;
