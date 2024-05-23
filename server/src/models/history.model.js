import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
  {
    advice: {
      type: JSON,
      required: true,
    },
  },
  { timestamps: true }
);

export const History = mongoose.model("History", historySchema);
