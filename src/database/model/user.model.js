import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: false },
    profilePicture: { type: String, required: false },
    cardNumberTeacher: { type: String, required: false },
    cardNumberStudent: { type: String, required: false },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("users", userSchema);
