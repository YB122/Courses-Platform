import { courseModel } from "../../database/model/course.model.js";
import { enrollmentModel } from "../../database/model/enrollment.js";
import { questionModel } from "../../database/model/question.model.js";
import { sessionModel } from "../../database/model/sessions.model.js";
import { userModel } from "../../database/model/user.model.js";
import fs from "fs";
export const getSessionById = async (req, res) => {
  if (req.user) {
    let { id } = req.params;
    let session = await sessionModel.findById(id);
    if (session) {
      res.json({ message: "success", data: session });
    } else {
      res.json({ message: "session not found" });
    }
  } else {
    res.json({ message: "login first" });
  }
};

export const editSessionById = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.parama;
    let sessionFound = await sessionModel.findById(id);
    if (sessionFound) {
      let courseFound = await courseModel.findById(sessionFound.courseid);
      if (req.user._id == courseFound.teacherid) {
        let { title, duration, filePath, contentType } = req.body;
        let allData = {};
        title ? (allData.title = title) : null;
        duration ? (allData.duration = duration) : null;
        if (req.file && contentType) {
          allData.contentType = contentType;
          allData.filePath = `http://localhost:3000/uploads/${req.file.originalname}`;
        }
        let updateSession = await sessionModel.findByIdAndUpdate(id, allData, {
          new: true,
        });
        if (updateSession) {
          res.json({ message: "done, updated session", updateSession });
        } else {
          res.json({ message: "error while update" });
        }
      } else {
        res.json({ message: "this session not for you" });
      }
    } else {
      res.json({ message: "session not found" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const deleteSessionById = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.params;
    let sessionFound = await sessionModel.findById(id);
    if (sessionFound) {
      let courseFound = await courseModel.findById(sessionFound.courseid);
      if (req.user._id == courseFound.teacherid) {
        let deleteSession = await sessionModel.findByIdAndDelete(id, {
          new: true,
        });
        if (deleteSession) {
          res.json({ message: "done, deleted session", deleteSession });
        } else {
          res.json({ message: "error while deleting" });
        }
      } else {
        res.json({ message: "this session not for you" });
      }
    } else {
      res.json({ message: "session not found" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const streamVideo = async (req, res) => {
  let { id } = req.params;
  let sessionFound = await sessionModel.findById(id);
  if (!sessionFound) {
    return res.json({ message: "session not found" });
  }
  const range = req.headers.range;
  if (!range) {
    return res.json({ message: "requires range header" });
  }
  let videoPath = sessionFound.filePath;
  if (videoPath.startsWith("http")) {
    const fileName = decodeURIComponent(videoPath.split("/").pop());
    videoPath = `uploads/${fileName}`;
  }
  const videoSize = fs.statSync(videoPath).size;
  const parts = range.replace(/bytes=/, "").split("-");
  const partialStart = parts[0] ? parts[0].trim() : "";
  const partialEnd = parts[1] ? parts[1].trim() : "";

  let start = partialStart ? parseInt(partialStart, 10) : 0;
  let end = partialEnd ? parseInt(partialEnd, 10) : videoSize - 1;

  if (isNaN(start)) start = 0;
  if (isNaN(end)) end = videoSize - 1;

  // Prevent start > end or start >= videoSize
  if (start >= videoSize || start > end) {
    res.writeHead(416, {
      "Content-Range": `bytes */${videoSize}`,
    });
    return res.end(
      JSON.stringify({
        message: "Requested range not satisfiable",
        requestedStart: start,
        requestedEnd: end,
        videoSize,
      }),
    );
  }
  end = Math.min(end, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};
export const servePdf = async (req, res) => {
  try {
    let { id } = req.params;
    let sessionFound = await sessionModel.findById(id);
    if (!sessionFound) {
      return res.json({ message: "session not found" });
    }

    let pdfPath = sessionFound.filePath;
    if (pdfPath.startsWith("http")) {
      const fileName = pdfPath.split("/").pop();
      pdfPath = `uploads/${fileName}`;
    }

    res.download(pdfPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.json({ message: "error downloading file" });
        }
      }
    });
  } catch (error) {
    res.json({ message: "server error", error: error.message });
  }
};

export const addQuestion = async (req, res) => {
  if (req.bearer == "teacher") {
    let { sessionId } = req.params;
    let sessionFound = await sessionModel.findById(sessionId);
    let courseFound = await courseModel.findById(sessionFound.courseid);
    let teacherFound = await userModel.findById(req.user._id);
    if (!sessionFound && !courseFound && !teacherFound.isActive) {
      return res.json({ message: "session or course not found" });
    }
    if (courseFound.teacherid == req.user._id) {
      let { text, options, correctAnswerIndex } = req.body;
      let questionCreate = await questionModel.insertMany({
        text,
        options,
        correctAnswerIndex,
        sessionid: sessionId,
      });
      if (questionCreate) {
        let addQuestionsNumber = await sessionModel.findByIdAndUpdate(
          sessionId,
          { questionsNumber: sessionFound.questionsNumber + 1 },
          { new: true },
        );
        res.json({ message: "question added ", questionCreate });
      } else {
        res.json({ message: "question not added" });
      }
    } else {
      res.json({ message: "this session not for you" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};
export const getAllQuestion = async (req, res) => {
  if (req.user) {
    let { sessionId } = req.params;
    let sessionFound = await sessionModel.findById(sessionId);
    if (!sessionFound) {
      return res.json({ message: "session not found" });
    }
    let allQuestions = await questionModel.find({ sessionid: sessionId });
    if (allQuestions.length) {
      res.json({ message: "questions", data: allQuestions });
    } else {
      res.json({ message: "Questions not found" });
    }
  } else {
    res.json({ message: "login first" });
  }
};

export const submitQuiz = async (req, res) => {
  if (req.bearer == "student") {
    let { sessionId } = req.params;
    let sessionFound = await sessionModel.findById(sessionId);
    if (!sessionFound) {
      return res.json({ message: "session not found" });
    }
    let courseFound = await courseModel.findById(sessionFound.courseid);
    let checkEnrollmentStudent = await enrollmentModel.find({
      studentid: req.user._id,
      coursesid: sessionFound.courseid,
    });
    console.log(req.user._id, sessionFound.courseid, checkEnrollmentStudent);
    
    if (!checkEnrollmentStudent.length) {
      return res.json({ message: "student not enrolled in this course" });
    }
    if (checkEnrollmentStudent[0].completedSessions > sessionFound.order) {
      return res.json({ message: "complete previous sessions first" });
    }
    let { answers } = req.body;
    if (!answers.length) {
      return res.json({ message: "answer empty" });
    }
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      let question = await questionModel.findById(answers[i].questionId);
      if (!question) {
        return res.json({
          message: "question not found",
          data: answers[i].questionId,
        });
      }
      if (sessionId != question.sessionid) {
        return res.json({ message: "question not in thus session" });
      }
      if (question.correctAnswerIndex == answers[i].selectedOption) {
        score++;
      }
    }
    let grade = (score / sessionFound.questionsNumber) * 100;
    if (grade >= 70) {
      await enrollmentModel.updateOne(
        { studentid: req.user._id, coursesid: sessionFound.courseid },
        { completedSessions: sessionFound.order },
      );
      res.json({ message: "success", grade });
    } else {
      res.json({ message: "failed", grade });
    }
  } else {
    res.json({ message: "student only" });
  }
};
