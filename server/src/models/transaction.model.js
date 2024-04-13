import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  transactionType: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
