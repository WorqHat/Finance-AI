import { Label, Textarea } from "flowbite-react";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import AdviserMenu from "../components/AdviserMenu";

const Adviser = () => {
  const [isStatementUpload, setIsStatementUpload] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const advice = "";

  return (
    <div className="flex justify-between">
      <div className="w-full border min-h-screen  m-4 p-4  flex flex-col justify-between">
        <div className="  flex flex-col justify-between">
          {/* buttons */}
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
          {/* contentarea */}
          <div className="h-80 text-center items-center mt-10 font-semibold text-2xl">
            <h1>Get your personalized advice now</h1>
          </div>
          {/* textarea */}
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
              <button className="bg-blue-500 flex items-center text-center p-4 m-4 text-white rounded-full h-12 w-12  cursor-pointer">
                <SendHorizonal />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 p-4 w-1/3 border">
        <AdviserMenu />
      </div>
    </div>
  );
};

export default Adviser;
