import { courseModel } from "../../database/model/course.model.js";
import { questionModel } from "../../database/model/question.model.js";
import { userModel } from "../../database/model/user.model.js";

export const editQuestion = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.params;
    let questionFound = await questionModel.findById(id);
    if (!questionFound) {
      return res.json({ message: "question not found" });
    }
    let courseFound = await courseModel.findById(questionFound.courseid);
    if (!courseFound && courseFound.teacherid != req.user._id) {
      return res.json({ message: "this question not for you" });
    }
    let { text, options, correctAnswerIndex } = req.body;
    let allData = {};
    text ? (allData.text = text) : null;
    options ? (allData.options = options) : null;
    correctAnswerIndex
      ? (allData.correctAnswerIndex = correctAnswerIndex)
      : null;
    let editQuestion = await questionModel.findByIdAndUpdate(id, allData, {
      new: true,
    });
    if (editQuestion) {
      res.json({ message: "done, deleted question", data: editQuestion });
    } else {
      res.json({ message: "error while deleting" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};
export const deleteQuestion = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.params;
    let questionFound = await questionModel.findById(id);
    if (!questionFound) {
      return res.json({ message: "question not found" });
    }
    let courseFound = await courseModel.findById(questionFound.courseid);
    if (!courseFound && courseFound.teacherid != req.user._id) {
      return res.json({ message: "this question not for you" });
    }
    let deletedQuestion = await questionModel.findByIdAndDelete(id, {
      new: true,
    });
    if (deletedQuestion) {
      res.json({ message: "done, deleted question", data: deletedQuestion });
    } else {
      res.json({ message: "error while deleting" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};
