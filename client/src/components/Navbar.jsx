import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const isSignedIn = useSelector((store) => store.auth.status);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout"
      );
      console.log(response);

      response.data.success && dispatch(logout());
    } catch (error) {
      setError("error while logging out", error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div class=" bg-white mx-4 my-2">
      <div class="flex items-center justify-between px-4 py-4 sm:px-6  border-b-2">
        <div class="inline-flex items-center space-x-2 ">
          <Link to={"/"}>
            <span class="font-bold text-2xl">FinWise</span>
          </Link>
        </div>
        <div class="hidden grow items-start lg:flex">
          <ul class="ml-12 inline-flex space-x-8">
            <li>
              <a
                href="#"
                class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                {" "}
                Home{" "}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                {" "}
                About{" "}
              </a>
            </li>
            <li>
              <a
                href="#"
                class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                {" "}
                Contact{" "}
              </a>
            </li>
          </ul>
        </div>

        {error && <p className=" text-red-600 px-4 "> {error} </p>}

        {isSignedIn ? (
          <div>
            <button
              type="button"
              class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleLogoutClick}
            >
              Log out
            </button>
          </div>
        ) : (
          <div class="hidden space-x-2 lg:block">
            <Link to={"/signup"}>
              <button
                type="button"
                class="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign In
              </button>
            </Link>
            <Link to={"/signin"}>
              <button
                type="button"
                class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log In
              </button>
            </Link>
          </div>
        )}

        <div class="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 cursor-pointer"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
