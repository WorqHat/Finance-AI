import React from "react";

const ExpenseCard = () => {
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
        <tr>
          <td className=" px-8 py-4">
            <div className="flex gap-8 py-4">
              <h1>Category</h1>
              <h1>description</h1>
            </div>
            <div className="flex gap-8 py-4">
              <h1>Category</h1>
              <h1>description</h1>
            </div>
          </td>
          <td className=" px-8 py-4">
            <div className="py-4">
              <h1>Amount</h1>
            </div>
            <div className="py-4">
              <h1>Amount</h1>
            </div>
          </td>
          <td className=" px-8 py-4">
            <div className="py-4">
              <h1>Amount</h1>
            </div>
            <div className="py-4">
              <h1>Amount</h1>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseCard;
