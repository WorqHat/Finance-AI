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
  },
});

export const { addExpenses, addIncomes, addAllTransactions } =
  transactionSlice.actions;
export default transactionSlice.reducer;
