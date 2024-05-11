import React from "react";
import AddExpense from "./AddExpense";
import ChatBot from "./ChatBot";
import Widget from "./Widget";

const RightMenu = () => {
  return (
    <div className="m-4 flex flex-col">
      <div className="fixed  right-4">
        <AddExpense />
      </div>
      <div className="fixed bottom-0">
        {" "}
        {/* Adjust the margin top as needed */}
        {/* <ChatBot /> */}
      </div>
    </div>
  );
};

export default RightMenu;
