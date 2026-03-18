import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    studentid: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,

    },
    coursesid: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,

    },
    completedSessions: { type: Number, required: false, default: 0 },
  },
  { timestamps: true },
);

export const enrollmentModel = mongoose.model("enrollments", enrollmentSchema);
