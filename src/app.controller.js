import express from "express";
import authRouter from "./module/auth/auth.controller.js";
import userRouter from "./module/user/user.controller.js";
import courseRouter from "./module/course/course.controller.js";
import sessionRouter from "./module/session/session.controller.js";
import questionRouter from "./module/question/question.controller.js";
import enrollmentRouter from "./module/enrollment/enrollment.controller.js";
import fs from 'fs';
import { dataBaseConnection } from "./database/connection.js";
export const callServer = () => {
  let app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads"));
  dataBaseConnection();
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/courses", courseRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/question", questionRouter);
  app.use("/api/enrollments", enrollmentRouter);
  app.listen(3000, () => {
    console.log("server 3000 open");
  });
};
