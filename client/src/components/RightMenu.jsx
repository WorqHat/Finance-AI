import React from "react";
import AddExpense from "./AddExpense";
import ChatBot from "./ChatBot";
import Widget from "./Widget";
import { useLatest } from "../hooks/index";
import { ChatBotDial } from "./ChatBotDial";
import { CodeSquare } from "lucide-react";

const RightMenu = () => {
  const { latestNews, isLoading } = useLatest();
  return (
    <div className="m-4 flex flex-col">
      <div className="fixed  right-4">
        <AddExpense />
      </div>
      <div className="fixed right-0 bottom-9 m-4">
        {" "}
        <ChatBotDial latestNews={latestNews} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RightMenu;
