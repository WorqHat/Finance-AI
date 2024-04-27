import React from "react";
import HistoryDrawer from "./HistoryDrawer";

const AdviserMenu = () => {
  return (
    <>
      <div className="grid gap-5">
        <h1 className="text-xl font-bold">Your spending habits:</h1>
        <div>Fetch habits from db</div>
      </div>
      <div>
        <HistoryDrawer />
      </div>
    </>
  );
};

export default AdviserMenu;
