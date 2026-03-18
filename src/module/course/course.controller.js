import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { createCourseSchema, editCourseSchema } from "./course.validate.js";
import { upload } from "../../common/middleware/multer.js";
import { validateInput } from "../../common/utils/validate.js";
import { addStudent, createCourse, createSessionInACourse, deleteCourse, editCourse, getCourseDetails, listAllCourses, listSessionInACourse } from "./course.service.js";
import { createSessionSchema } from "../session/session.validate.js";
let router = Router();

router.post(
  "/",
  auth,
  validateInput(createCourseSchema),
  upload().single("thumbnail"),
  createCourse,
);
router.get("/", listAllCourses);
router.get("/:id", auth, getCourseDetails);
router.put(
  "/:id",
  auth,
  validateInput(editCourseSchema),
  upload().single("thumbnail"),
  editCourse,
);
router.delete("/:id", auth, deleteCourse);

router.post(
  "/:courseId/sessions",
  auth,
  validateInput(createSessionSchema),
  upload().single("filePath"),
  createSessionInACourse
);
router.get(
  "/:courseId/sessions",
  auth,
  listSessionInACourse,
);

router.post('/:id/subscribe',auth,addStudent);

export default router;
