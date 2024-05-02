import React from "react";
import { ChatBotDial } from "./ChatBotDial";

const ChatBot = () => {
  return (
    <div className="p-4 m-4 shadow-md ">
      <h1 className="py-4 font-semibold">
        Want to know whats the latest in finance? <br></br>Want to know if it
        benifits you?{" "}
      </h1>
      <ChatBotDial />
    </div>
  );
};

export default ChatBot;
