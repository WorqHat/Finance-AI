import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidemenu from "./components/Sidemenu";
import { useLatest } from "./hooks";

function App() {
  const loggedIn = useSelector((store) => store.auth.status);
  console.log(loggedIn);

  return (
    <div className="flex flex-col h-screen overflow-hidden dark:bg-gray-800">
      <div className="fixed top-0 right-0 left-0">
        <Navbar />
      </div>

      <div className="flex mt-20 pt-4">
        {loggedIn && (
          <div className="w-1/5">
            <Sidemenu />
          </div>
        )}
        <div className=" w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
