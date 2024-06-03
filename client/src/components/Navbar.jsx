import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DropdownMenu } from "./DropdownMenu";
import { SideMenuDrawer } from "./SideMenuDrawer";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const isSignedIn = useSelector((store) => store.auth.status);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        { withCredentials: true }
      );
      console.log(response);
      dispatch(logout());
      Navigate("/");
    } catch (error) {
      setError("error while logging out", error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div class="  mx-4 my-2 z-50 ">
      <div class="flex items-center justify-between px-4 py-4 sm:px-6  border-b-2">
        <div class="inline-flex items-center space-x-2 ">
          <Link to={"/"}>
            <span class="font-bold text-2xl  dark:text-white">FinWise</span>
          </Link>
        </div>
        <div class="hidden grow items-start lg:flex"></div>

        <ToggleTheme />
        {error && <p className=" text-red-600 px-4 "> {error} </p>}

        {isSignedIn ? (
          <div>
            <button
              type="button"
              class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white dark:border-white"
              onClick={handleLogoutClick}
            >
              Log out
            </button>
          </div>
        ) : (
          <div class="hidden space-x-2 lg:block ">
            <Link to={"/signup"}>
              <button
                type="button"
                class="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white"
              >
                Sign In
              </button>
            </Link>
            <Link to={"/signin"}>
              <button
                type="button"
                class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white dark:border-white"
              >
                Log In
              </button>
            </Link>
          </div>
        )}

        <SideMenuDrawer />
        {/* <DropdownMenu /> */}
      </div>
    </div>
  );
};

export default Navbar;
