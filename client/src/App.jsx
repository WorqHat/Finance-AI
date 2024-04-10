import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidemenu from "./components/Sidemenu";

function App() {
  const loggedIn = useSelector((store) => store.auth.status);
  console.log(loggedIn);
  return (
    <>
      <Navbar />
      {loggedIn && <Sidemenu />}
      <Outlet />
    </>
  );
}

export default App;
