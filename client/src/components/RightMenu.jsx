import React, { useState } from "react";
import AddExpense from "./AddExpense";
import ChatBot from "./ChatBot";
import Widget from "./Widget";
import { useLatest } from "../hooks/index";
import { ChatBotDial } from "./ChatBotDial";
import { CodeSquare, Plus } from "lucide-react";
import { AddExpenseModel } from "./AddExpenseModel";

const RightMenu = () => {
  const { latestNews, isLoading } = useLatest();
  const [openAddExpense, setOpenAddExpense] = useState(false);
  return (
    <div className="m-4 flex flex-col z-0">
      <div className={`fixed  right-4 hidden md:block`}>
        <AddExpense />
      </div>
      <div className="fixed right-0 bottom-9 m-4 flex">
        {" "}
        {/* <button
          className="m-4 p-3 bg-blue-500 rounded-md"
          onClick={() => setOpenAddExpense(true)}
        >
          {" "}
          <Plus className="text-white" />
        </button>{" "} */}
        <div className="hidden max-md:block">
          {" "}
          <AddExpenseModel />
        </div>
        <ChatBotDial latestNews={latestNews} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RightMenu;
