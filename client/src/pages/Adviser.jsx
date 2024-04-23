import { Label, Textarea } from "flowbite-react";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

const Adviser = () => {
  const [isStatementUpload, setIsStatementUpload] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const advice = "";

  return (
    <div className="max-w-full  m-4 p-4  flex flex-col justify-between">
      <div className="w-2/3 min-h-screen">
        <div className="flex justify-between">
          <button
            onClick={() => {
              setIsStatementUpload(false);
            }}
            className={`${
              !isStatementUpload
                ? "bg-red-500 text-white"
                : "border border-red-500"
            } px-6 py-2 rounded-md font-semibold`}
          >
            Pick from Dashboard
          </button>
          <button
            onClick={() => {
              setIsStatementUpload(true);
            }}
            className={`${
              isStatementUpload
                ? "bg-blue-500 text-white"
                : "border border-blue-500"
            } px-6 py-2 rounded-md font-semibold`}
          >
            Upload Statement
          </button>
        </div>

        <div className="h-80 text-center items-center mt-10 font-semibold text-2xl">
          <h1>Get your personalized advice now</h1>
        </div>

        <div className="flex justify-between">
          <div className="p-4 shadow-xl shadow-blue-100 w-full flex">
            <Textarea
              id="comment"
              placeholder="Any specific instructions???"
              required
              rows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className=""
            />
            <div className="bg-blue-500 items-center text-center p-4 m-4 text-white rounded-full cursor-pointer">
              <SendHorizonal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adviser;
