import React, { useEffect } from "react";
import Sidemenu from "../components/Sidemenu";
import ExpenseCard from "../components/ExpenseCard";
import RightMenu from "../components/RightMenu";
import axios from "axios";
import { useSelector } from "react-redux";
import { ExpenseTable } from "../components/ExpenseTable";

const Dashboard = () => {
  return (
    <div className="m-4 flex justify-between gap-8 rounded-md ">
      <div className="flex flex-col w-full h-max m-5 gap-8">
        {/* {fetchedExpenses.map((expense) => {
          <ExpenseCard key={expense._id} transaction={expense} />;
        })} */}
        <ExpenseTable />
      </div>
      <div className="w-1/2">
        <RightMenu />
      </div>
    </div>
  );
};

export default Dashboard;
