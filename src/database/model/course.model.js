import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacherid: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    price: { type: Number, default: null, required: false },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    enrolledStudent: { type: Number, required: false },
  },
  { timestamps: true },
);

export const courseModel = mongoose.model("courses", courseSchema);
