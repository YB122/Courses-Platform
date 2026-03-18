import { courseModel } from "../../database/model/course.model.js";
import { enrollmentModel } from "../../database/model/enrollment.js";
import { sessionModel } from "../../database/model/sessions.model.js";
import { transactionModel } from "../../database/model/transaction.model.js";
import { userModel } from "../../database/model/user.model.js";

export const createCourse = async (req, res) => {
  if (req.bearer == "teacher") {
    let { title, description, price, category } = req.body;
    let teacherFound = await userModel.findById(req.user._id);
    console.log(teacherFound);
    let thumbnail;
    if (teacherFound && req.file && teacherFound.isActive) {
      console.log(req.file);
      thumbnail = `http://localhost:3000/uploads/${req.file.originalname}`;
      console.log(thumbnail);
      let createCourse = await courseModel.insertMany({
        title,
        description,
        teacherid: req.user._id,
        price,
        category,
        thumbnail,
      });
      if (createCourse) {
        res.json({ message: "success, created course", data: createCourse });
      } else {
        res.json({ message: "error while creating course" });
      }
    } else {
      res.json({ message: "teacher not found and thumbnail required" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const listAllCourses = async (req, res) => {
  let { q, category, isFree, page, limit } = req.query;
  let data;
  let dataFinal;
  console.log(q, category, "isFree", isFree);

  if (!q && !category) {
    console.log("line 41");
    let coursesFound = await courseModel.find();
    if (coursesFound.length) {
      data = coursesFound;
      dataFinal = data;
    } else {
      return res.json({ message: "no courses found" });
    }
    console.log(data, "line48", isFree);
    if (isFree == true) {
      console.log("line 51");
      dataFinal = data.filter(
        (course) => course.price == 0 || course.price == null,
      );
      console.log(dataFinal);
    } else {
      console.log("line 56");
      dataFinal = data.filter((course) => course.price != 0);
      console.log(dataFinal);
    }

    console.log("line60", dataFinal);
  } else {
    if (isFree == true) {
      let coursesFound = await courseModel.find({ price: null });
      if (coursesFound.length) {
        data = coursesFound;
      }
    } else {
      let coursesFound = await courseModel.find({ price });
      if (coursesFound.length) {
        data = coursesFound;
      }
    }
    dataFinal = data;
    if (category) {
      let coursesFound = await courseModel.find({ category });
      if (coursesFound.length) {
        dataFinal = data.filter((course) => course.category == category);
      }
    }
    if (q) {
      let coursesFoundTile = await courseModel.find({ title: q });
      if (coursesFoundTile.length) {
        dataFinal = data.filter((course) => course.title == q);
      }
    }
  }
  if (dataFinal.length) {
    res.json({ message: "List All Courses", data: dataFinal });
  } else {
    res.json({ message: "List Empty" });
  }
};

export const getCourseDetails = async (req, res) => {
  let { id } = req.params;
  if (id == "my") {
    if (req.bearer == "teacher") {
      let allCourses = await courseModel.find({ teacherid: req.user._id });
      if (allCourses.length) {
        console.log(allCourses.length);
        res.json({ message: "success", data: allCourses });
      } else {
        res.json({ message: "no courses found for this teacher" });
      }
    } else {
      res.json({ message: "teacher only" });
    }
  } else {
    let course = await courseModel.findById(id);
    if (course) {
      res.json({ message: "success", data: course });
    } else {
      res.json({ message: "course not found" });
    }
  }
};

export const editCourse = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.params;
    let courseFound = await courseModel.findById(id);
    let teacherFound = await userModel.findById(req.user._id);
    if (courseFound && teacherFound.isActive) {
      if (req.user._id == courseFound.teacherid) {
        let { title, description, price, category } = req.body;
        let dataCourse = {};
        title ? (dataCourse.title = title) : null;
        description ? (dataCourse.description = description) : null;
        price ? (dataCourse.price = price) : null;
        category ? (dataCourse.category = category) : null;
        if (req.file) {
          let thumbnail = `http://localhost:3000/uploads/${file.originalname}`;
          dataCourse.thumbnail = thumbnail;
        }
        let editCourse = await courseModel.findByIdAndUpdate(id, dataCourse, {
          new: true,
        });
        if (editCourse) {
          res.json({ message: "success, edited course", data: editCourse });
        } else {
          res.json({ message: "error while editing course" });
        }
      } else {
        res.json({ message: "this course not for you" });
      }
    } else {
      res.json({ message: "course not found" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const deleteCourse = async (req, res) => {
  if (req.bearer == "teacher") {
    let { id } = req.params;
    let courseFound = await courseModel.findById(id);
    let teacherFound = await userModel.findById(req.user._id);
    if (courseFound && teacherFound.isActive) {
      if (req.user._id == courseFound.teacherid) {
        let deleteCourse = await courseModel.findByIdAndDelete(id, {
          new: true,
        });
        if (deleteCourse) {
          res.json({ message: "success, deleted course", data: deleteCourse });
        } else {
          res.json({ message: "error while editing course" });
        }
      } else {
        res.json({ message: "this course not for you" });
      }
    } else {
      res.json({ message: "course not found" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const createSessionInACourse = async (req, res) => {
  if (req.bearer == "teacher") {
    let { courseId } = req.params;
    let courseFound = await courseModel.findById(courseId);
    let teacherFound = await userModel.findById(req.user._id);
    if (courseFound && teacherFound.isActive) {
      if (courseFound.teacherid == req.user._id) {
        let { title, contentType, duration, order } = req.body;
        let filePath;
        if (req.file) {
          filePath = `http://localhost:3000/uploads/${req.file.originalname}`;
        } else {
          return res.json({ message: "pdf file required" });
        }
        let createSession = await sessionModel.insertMany({
          title,
          courseid: courseId,
          contentType,
          duration,
          filePath,
          order,
        });
        if (createSession) {
          res.json({
            message: "success, created session",
            data: createSession,
          });
        } else {
          res.json({ message: "error while creating session" });
        }
      } else {
        res.json({ message: "this course not for you" });
      }
    } else {
      res.json({ message: "course not found" });
    }
  } else {
    res.json({ message: "teacher only" });
  }
};

export const listSessionInACourse = async (req, res) => {
  let { courseId } = req.params;
  let sessionFound = await sessionModel.find({ courseid: courseId });
  if (sessionFound.length) {
    let teacherFound = await courseModel.findById(sessionFound.teacherid);
    if (!teacherFound) {
      return res.json({ message: "teacher not found" });
    }
    res.json({
      message: "sessions",
      data: sessionFound,
      teacher: teacherFound,
    });
  } else {
    res.json({ message: "no sessions found in this course" });
  }
};
export const addStudent = async (req, res) => {
  if (req.bearer == "student") {
    let { id } = req.params;

    let userIsActive = await userModel.findById(req.user._id);
    let courseFound = await courseModel.findById(id);
    if (!courseFound && !userIsActive.isActive) {
      return res.json({ message: "course not found" });
    }
    if (courseFound.price) {
      let { cardNumberTeacher } = req.body;
      let teacherFound = await userModel.findOne({ cardNumberTeacher });
      if (teacherFound) {
        // let makeTransaction = await transactionModel.insertMany({
        //   studentid: req.user._id,
        //   teacherid: teacherFound._id,
        //   cardNumberTeacher,
        //   coursesid: id,
        // });
        // if (!makeTransaction) {
        //   return res.json({ message: "failed" });
        // }
        console.log(req.user._id);
        let enrollmentStudent = await enrollmentModel.insertMany({
          studentid: req.user._id,
          coursesid: id,
        });
        if (enrollmentStudent) {
          res.json({
            message: "success, student enrolled",
            data: enrollmentStudent,
          });
        } else {
          res.json({ message: "failed" });
        }
      } else {
        res.json({ message: "teacher not found" });
      }
    }
    let enrollmentStudent = await enrollmentModel.insertMany({
      studentid: req.user._id,
      coursesid: id,
    });
    if (enrollmentStudent) {
      res.json({
        message: "success, student enrolled",
        data: enrollmentStudent,
      });
    } else {
      res.json({ message: "failed" });
    }
  } else {
    res.json({ message: "student only" });
  }
};
