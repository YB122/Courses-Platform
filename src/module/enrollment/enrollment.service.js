import { enrollmentModel } from "../../database/model/enrollment.js";

export const getEnrollments = async (req, res) => {
  if (req.bearer == "student") {
    let allEnrollments = await enrollmentModel.find({
      studentid: req.user._id,
    });
    if (allEnrollments.length) {
      res.json({ message: "success", data: allEnrollments });
    } else {
      res.json({ message: "you don't enrollment in any courses" });
    }
  } else {
    res.json({ message: "student only" });
  }
};
