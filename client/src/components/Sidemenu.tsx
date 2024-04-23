import React from "react";
import {
  adviserIcon,
  budgetIcon,
  dashboardIcon,
  statsIcon,
} from "../utils/svg";
import { Link } from "react-router-dom";

const Sidemenu = () => {
  return (
    <div className="p-4 border-r-2 min-h-screen fixed w-1/6">
      <ul className="px-4 gap-2 text-lg  py-4">
        <Link to="/dashboard">
          <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
            {dashboardIcon}
            Dashboard
          </li>
        </Link>
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
          {budgetIcon}
          Budgets
        </li>
        <Link to="/adviser">
          <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
            {adviserIcon}
            Adviser
          </li>
        </Link>
        <li className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
          {statsIcon}
          Stats
        </li>
      </ul>
    </div>
  );
};

export default Sidemenu;
