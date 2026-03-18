import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { getEnrollments } from "./enrollment.service.js";
let router = Router();

router.get("/my", auth, getEnrollments);

export default router;
