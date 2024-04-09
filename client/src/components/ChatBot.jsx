import React from "react";

const ChatBot = () => {
  return (
    <div className="p-4 m-4 shadow-md">
      <div className="h-32">
        <h1>Click to get the latest finance news and chat</h1>
      </div>
      <div>
        <input type="text" placeholder="Type here" />
        <button>{"->"} </button>
      </div>
    </div>
  );
};

export default ChatBot;
