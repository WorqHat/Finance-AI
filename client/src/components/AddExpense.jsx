import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server_url } from "../utils/constants";
import axios from "axios";
import {
  addAllTransactions,
  addExpenses,
  addIncomes,
} from "../utils/transactionSlice";
import { useTransactions } from "../hooks";

const AddExpense = () => {
  const dispatch = useDispatch();
  const [isExpense, setIsExpense] = useState(true);
  const [date, setDate] = useState(getTodayDateString());
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useTransactions();

  const fetchTransactionsFromServer = async () => {
    try {
      let expenses = [];
      let incomes = [];

      const transactions = await axios.get(`${server_url}transactions/`, {
        withCredentials: true,
      });

      if (!transactions) {
        console.log("No transactions found");
      }

      transactions.data.data.transactions.map((transaction) => {
        if (transaction.transactionType === "expense") {
          expenses.push(transaction);
        }
      });

      transactions.data.data.transactions.map((transaction) => {
        if (transaction.transactionType === "income") {
          incomes.push(transaction);
        }
      });

      expenses.length !== 0 && dispatch(addExpenses(expenses));
      incomes.length !== 0 && dispatch(addIncomes(incomes));
      dispatch(addAllTransactions(transactions.data.data.transactions));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const createTransaction = async () => {
    if (amount === 0 || category === "") {
      alert("Please fill all the fields");
    }

    try {
      const newTransaction = await axios.post(
        `${server_url}transactions/`,

        {
          amount,
          category,
          description,
          transactionType: isExpense ? "expense" : "income",
        },
        {
          withCredentials: true,
        }
      );

      if (!newTransaction) {
        console.log("Transaction creation failed");
      }

      fetchTransactionsFromServer();
      setError("");
    } catch (error) {
      setError("error creating transaction", error);
    }
  };

  return (
    <div className="border-l-2 p-4 mb-4 shadow-md   ">
      <div className="flex justify-between">
        <button
          onClick={() => {
            setIsExpense(true);
          }}
          className={`${
            isExpense ? "bg-red-500 text-white" : "border border-red-500"
          }   px-6 py-2 rounded-md  font-semibold`}
        >
          Expense
        </button>
        <button
          onClick={() => {
            setIsExpense(false);
          }}
          className={`${
            !isExpense ? "bg-blue-500 text-white" : "border border-blue-500"
          }   px-6 py-2 rounded-md  font-semibold`}
        >
          Income
        </button>
      </div>
      <div className="gap-6 flex flex-col py-6">
        <div className="flex justify-center items-center ">
          <label htmlFor="Date" className="pr-4">
            Date
          </label>
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            id="Date"
            className="border-none "
          />
        </div>

        <div className="flex justify-center items-center ">
          <label htmlFor="Amount" className="pr-4">
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="number"
            id="Amount"
            placeholder="00"
            className="border-b-2"
          />
        </div>

        <div className="flex justify-center items-center ">
          {" "}
          <label htmlFor="Category" className="pr-4">
            Category
          </label>
          <input
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            type="text"
            id="Category"
            placeholder="Food, grocery, medical..."
            className="border-b-2 "
          />
        </div>

        <div className="flex justify-center items-center ">
          <label htmlFor="Description" className="pr-4">
            Description
          </label>
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            id="Description"
            placeholder="dosa with friends"
            className="border-b-2 align-middle"
          />
        </div>
      </div>

      <button
        onClick={createTransaction}
        className=" border border-blue-500 px-6 py-2 rounded-md  font-semibold"
      >
        Save
      </button>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default AddExpense;
