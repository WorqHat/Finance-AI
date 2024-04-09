import React from "react";

const Navbar = () => {
  return (
    <div class=" bg-white mx-4 my-2">
      <div class="flex items-center justify-between px-4 py-4 sm:px-6  border-b-2">
        <div class="inline-flex items-center space-x-2 ">
          <span> </span>
          <span class="font-bold text-2xl">FinWise</span>
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
        <div class="hidden space-x-2 lg:block">
          <button
            type="button"
            class="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign In
          </button>
          <button
            type="button"
            class="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </button>
        </div>
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
