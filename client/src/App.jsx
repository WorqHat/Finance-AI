import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      {/* //{loggedIn && sidemenu} */}
      <Outlet />
    </>
  );
}

export default App;
