import React, { useState } from "react";
import { useSelector } from "react-redux";

const ExpenseCard = () => {
  const [error, setError] = useState("");
  const fetchedTransactions = useSelector(
    (store) => store.transaction.allTransactions
  );

  if (!fetchedTransactions) {
    setError("No transactions found");
  }
  console.log(error);

  return (
    <table className="border-collapse w-full shadow-md">
      <thead>
        <tr className="border-b-2  border-gray-400">
          <th className="text-lg ">Date</th>
          <th className="text-lg text-blue-600">Income</th>
          <th className="text-lg text-red-600">Expense</th>
        </tr>
      </thead>

      <tbody>
        {fetchedTransactions?.map((transaction) => (
          <tr key={transaction._id}>
            <td className="px-8 py-4">{transaction.category}</td>

            <td className="px-8 py-4">
              {transaction.transactionType === "income"
                ? transaction.amount
                : ""}
            </td>
            <td className="px-8 py-4">
              {transaction.transactionType === "expense"
                ? transaction.amount
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseCard;
