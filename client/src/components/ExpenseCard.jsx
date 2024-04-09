import React from "react";

const ExpenseCard = () => {
  return (
    <div className="flex gap-16 shadow-md h-full px-8 py-4 justify-between ">
      <div>
        <h1 className="text-lg border-b-2 border-gray-700">Date</h1>
        <div className="flex gap-8 py-4 ">
          <h1>Category</h1>
          <h1>description</h1>
        </div>
        <div className="flex gap-8 py-4">
          <h1>Category</h1>
          <h1>description</h1>
        </div>
      </div>

      <div className="text-blue-600 ">
        <h1 className="text-lg">Income</h1>
        <div className="py-4">
          <h1>Amount</h1>
        </div>
        <div className="py-4">
          <h1>Amount</h1>
        </div>
      </div>

      <div className="text-red-600">
        <h1 className="text-lg">expense</h1>
        <div className="py-4">
          <h1>Amount</h1>
        </div>
        <div className="py-4">
          <h1>Amount</h1>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
