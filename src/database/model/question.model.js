import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    text: { type: String, required: true },
    options: { type: [String], required: true },
    sessionid: {
      type: mongoose.Types.ObjectId,
      ref: "sessions",
      required: true,
    },
    correctAnswerIndex: {
      type: String,
      enum: ["0", "1", "2", "3"],
      required: true,
    },
  },
  { timestamps: true },
);

export const questionModel = mongoose.model("questions", questionSchema);
