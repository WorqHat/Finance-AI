import React from "react";
import AddExpense from "./AddExpense";
import ChatBot from "./ChatBot";
import Widget from "./Widget";

const RightMenu = () => {
  return (
    <div>
      <AddExpense />
      <Widget />
    </div>
  );
};

export default RightMenu;
