import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTransaction = asyncHandler(async (req, res) => {
  const { amount, category, description, transactionType } = req.body;

  if (
    [amount, category, transactionType].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(404, "All fields are required");
  }

  const transaction = await Transaction.create({
    amount,
    category,
    description,
    transactionType,
  });

  if (!transaction) {
    throw new ApiError(500, "Error creating transaction");
  }

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        transaction: transaction,
      },
      "Transaction created successfully"
    )
  );
});

export { createTransaction };
