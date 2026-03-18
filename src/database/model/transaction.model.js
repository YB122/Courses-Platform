import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    studentid: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,

    },
    coursesid: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,

    },
    teacherid: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    cardNumberTeacher: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      required: false,
    },
  },
  { timestamps: true },
);

export const transactionModel = mongoose.model(
  "transactions",
  transactionSchema,
);
