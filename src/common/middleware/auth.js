import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  let [bearer, token] = authorization.split(" ");
  let signature = "";
  switch (bearer) {
    case "admin":
      signature = "signatureAdmin";
      break;
    case "teacher":
      signature = "teacherUser";
      break;
    case "student":
      signature = "studentUser";
      break;
    default:
      return res.json({ message: "error in role" });
  }

  try {
    let decode = jwt.verify(token, signature);
    req.user = decode;
    req.bearer = bearer;
  } catch (err) {
    res.json({ message: "invalid token" });
  }
  next();
};

export const generateToken = (userSearch) => {
  let signature = "";
  switch (userSearch.role) {
    case "admin":
      signature = "signatureAdmin";
      break;
    case "teacher":
      signature = "teacherUser";
      break;
    case "student":
      signature = "studentUser";
      break;
  }
  return jwt.sign({ _id: userSearch._id }, signature, { expiresIn: "7d" });
};
