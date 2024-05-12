import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    allTransactions: [],
    expenses: [],
    incomes: [],
  },
  reducers: {
    addExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addIncomes: (state, action) => {
      state.incomes = action.payload;
    },
    addAllTransactions: (state, action) => {
      state.allTransactions = action.payload.reverse();
    },
    deleteTransaction: (state, action) => {
      state.allTransactions = state.allTransactions.filter(
        (transaction) => transaction._id !== action.payload
      );
    },
    updateTransaction: (state, action) => {
      state.allTransactions = state.allTransactions.map((transaction) => {
        if (transaction._id === action.payload._id) {
          return action.payload;
        }
        return transaction;
      });
    },
  },
});

export const {
  addExpenses,
  addIncomes,
  addAllTransactions,
  deleteTransaction,
  updateTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
