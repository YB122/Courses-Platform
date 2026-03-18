import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { upload } from "../../common/middleware/multer.js";
import { validateInput } from "../../common/utils/validate.js";
import { createSessionSchema, editSessionSchema } from "./session.validate.js";
import {
  addQuestion,
  deleteSessionById,
  editSessionById,
  getAllQuestion,
  getSessionById,
  servePdf,
  streamVideo,
  submitQuiz,
} from "./session.service.js";
import { questionSchema } from "../question/question.validate.js";

let router = Router();

router.get("/:id", auth, getSessionById); //done
router.put("/:id", auth, validateInput(editSessionSchema), upload().single("sessions"), editSessionById); //still
router.delete("/:id", auth, deleteSessionById); // done
router.get("/:id/stream", auth, streamVideo); //done
router.get("/:id/pdf", auth, servePdf); //done
router.post("/:sessionId/questions", auth, validateInput(questionSchema),addQuestion); //done
router.get("/:sessionId/questions", auth,getAllQuestion);//done
router.post("/:sessionId/submit", auth, submitQuiz);
export default router;
