import { generateToken } from "../../common/middleware/auth.js";
import { userModel } from "../../database/model/user.model.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  let { name, email, password, role, cardNumber } = req.body;
  let emailFound = await userModel.findOne({ email });
  if (emailFound) {
    return res.json({ message: "email already exists" });
  }
  let hashPassword = await bcrypt.hash(password, 10);
  let profilePicture;
  if (req.file) {
    profilePicture = `http://localhost:3000/uploads/${req.file.originalname}`;
  }
  let user;
  if (role == "teacher") {
    if (cardNumberTeacher) {
      user = await userModel.insertMany({
        name,
        email,
        password: hashPassword,
        role,
        cardNumberTeacher,
        profilePicture,
      });
    } else {
      return res.json({ message: "card number is required" });
    }
  } else {
    user = await userModel.insertMany({
      name,
      email,
      password: hashPassword,
      role,
      profilePicture,
    });
  }
  if (user) {
    res.json({ message: "success", data: user });
  } else {
    res.json({ message: "error" });
  }
};
export const login = async (req, res) => {
  let { email, password } = req.body;
  let userFound = await userModel.findOne({ email });
  if (userFound) {
    let match = await bcrypt.compare(password, userFound.password);
    if (match) {
      let token = generateToken(userFound);
      res.json({ message: "success", Token: token });
    } else {
      res.json({ message: "in-valid email or password" });
    }
  } else {
    res.json({
      message: "in-valid email or password",
    });
  }
};
