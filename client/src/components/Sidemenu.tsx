import React from "react";
import {
  adviserIcon,
  budgetIcon,
  dashboardIcon,
  statsIcon,
} from "../utils/svg";
import { Link, useLocation } from "react-router-dom";

const Sidemenu = () => {
  const location = useLocation();

  return (
    <div className="p-4 border-r-2 min-h-screen fixed w-1/6 hidden md:block dark:text-white">
      <ul className="px-4 gap-2 text-lg  py-4">
        <Link to="/dashboard">
          <li
            className={`p-3 m-2 hover:shadow-sm hover:bg-gray-200 dark:hover:text-black rounded-xl cursor-pointer flex items-center gap-2 ${
              location.pathname === "/dashboard"
                ? "bg-gray-100 dark:text-black"
                : ""
            }`}
          >
            {dashboardIcon}
            Dashboard
          </li>
        </Link>

        <Link to="/adviser">
          <li
            className={`p-3 m-2 hover:shadow-sm hover:bg-gray-100 dark:hover:text-black rounded-xl cursor-pointer flex items-center gap-2 ${
              location.pathname === "/adviser"
                ? "bg-gray-200 dark:text-black"
                : ""
            }`}
          >
            {adviserIcon}
            Adviser
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidemenu;
