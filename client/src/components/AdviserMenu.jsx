import React from "react";
import HistoryDrawer from "./HistoryDrawer";
import { SpendingTimeline } from "./SpendingTimeline";

const AdviserMenu = () => {
  return (
    <>
      <div className="grid gap-5 max-h-screen">
        <h1 className="text-xl font-bold">Your spending habits:</h1>
        <div className="">
          <SpendingTimeline />
        </div>
      </div>
      <div>
        <HistoryDrawer />
      </div>
    </>
  );
};

export default AdviserMenu;
