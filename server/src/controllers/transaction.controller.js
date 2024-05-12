import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTransaction = asyncHandler(async (req, res) => {
  const { amount, category, description, transactionType } = req.body;
  const userId = req.user._id;

  if ([amount, category, transactionType].some((field) => field?.trim === "")) {
    throw new ApiError(404, "All fields are required");
  }

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  const transaction = await Transaction.create({
    amount,
    category,
    description,
    transactionType,
    userId,
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

const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  const transactions = await Transaction.find({ userId });

  if (!transactions) {
    throw new ApiError(404, "No transactions found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        transactions: transactions,
      },
      "Transactions retrieved successfully"
    )
  );
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;

  if (!transactionId) {
    throw new ApiError(404, "Transaction not found");
  }

  try {
    await Transaction.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new ApiError(500, "Error deleting transaction", error.message);
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Transaction deleted successfully"));
});

const updateTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;

  if (!transactionId) {
    throw new ApiError(404, "transactionId required");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTransaction) {
    throw new ApiError(500, "Error while updating transaction");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        updatedTransaction: updatedTransaction,
      },
      "Transactions updated successfully"
    )
  );
});

export {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
