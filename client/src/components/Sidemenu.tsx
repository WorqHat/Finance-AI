import React from "react";

const Sidemenu = () => {
  return (
    <div className="p-4 w-60 border-r-2 min-h-screen">
      <ul className="px-4 gap-2 text-lg  py-4">
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer">
          Dashboard
        </li>
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer ">
          Budgets
        </li>
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer">
          Adviser
        </li>
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer">
          Stats
        </li>
      </ul>
    </div>
  );
};

export default Sidemenu;
