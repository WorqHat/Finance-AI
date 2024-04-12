import React from "react";

const AddExpense = () => {
  return (
    <div className="border-l-2 p-4 mb-4 shadow-md">
      <div className="flex justify-between">
        <button className="border border-red-500 bg-red-500 px-6 py-2 rounded-md  font-semibold">
          Expense
        </button>
        <button className="border border-blue-500 px-6 py-2 rounded-md  font-semibold">
          Income
        </button>
      </div>
      <div className="gap-8 flex flex-col py-8">
        <div>
          <label htmlFor="Date" className="pr-4">
            Date
          </label>
          <input type="date" id="Date" />
        </div>

        <div>
          <label htmlFor="Amount" className="pr-4">
            Amount
          </label>
          <input type="number" id="Amount" placeholder="00" />
        </div>

        <div>
          {" "}
          <label htmlFor="Category" className="pr-4">
            Category
          </label>
          <input
            type="text"
            id="Category"
            placeholder="Food, grocery, medical..."
          />
        </div>

        <div>
          <label htmlFor="Description" className="pr-4">
            Description
          </label>
          <input type="text" id="Description" placeholder="dosa with friends" />
        </div>
      </div>

      <button className=" border border-blue-500 px-6 py-2 rounded-md  font-semibold">
        Save
      </button>
    </div>
  );
};

export default AddExpense;
