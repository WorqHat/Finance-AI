import React from "react";
import HistoryDrawer from "./HistoryDrawer";
import { SpendingTimeline } from "./SpendingTimeline";

const AdviserMenu = () => {
  return (
    <>
      <HistoryDrawer />
      <SpendingTimeline />
    </>
  );
};

export default AdviserMenu;
