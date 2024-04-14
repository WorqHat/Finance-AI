import React, { useEffect } from "react";
import Sidemenu from "../components/Sidemenu";
import ExpenseCard from "../components/ExpenseCard";
import RightMenu from "../components/RightMenu";
import axios from "axios";
import { server_url } from "../utils/constants.";
import Cookies from "js-cookie";

const Dashboard = () => {
  const fetchTransactions = async () => {
    const transactions = await axios.get(`${server_url}transactions/`, {
      withCredentials: true,
    });

    console.log(transactions);
    if (!transactions) {
      console.log("No transactions found");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
