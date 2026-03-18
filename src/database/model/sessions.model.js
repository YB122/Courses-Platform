import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    title: { type: String, required: false },
    courseid: { type: mongoose.Types.ObjectId, ref: "courses", required: false },
    duration: { type: String, default: null, required: false },
    filePath: { type: String, required: false },
    contentType: {
      type: String,
      enum: ["video", "pdf"],
      required: false,
    },
    order: { type: Number, required: false, default: 0 },
    questionsNumber: { type: Number, required: false, default: 0 },
  },

  { timestamps: true },
);

export const sessionModel = mongoose.model("sessions", sessionSchema);
