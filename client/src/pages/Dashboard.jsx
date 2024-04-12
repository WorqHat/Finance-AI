import React from "react";
import Sidemenu from "../components/Sidemenu";
import ExpenseCard from "../components/ExpenseCard";
import RightMenu from "../components/RightMenu";

const Dashboard = () => {
  return (
    <div className="m-4 flex justify-between gap-8 rounded-md ">
      <div className="flex flex-col w-full h-max m-5 gap-8">
        <ExpenseCard />
        <ExpenseCard />
      </div>
      <div className="w-1/2">
        <RightMenu />
      </div>
    </div>
  );
};

export default Dashboard;
