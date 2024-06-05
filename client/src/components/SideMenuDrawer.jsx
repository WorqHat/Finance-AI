import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SideMenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="z-50 ">
      <div className="flex  items-center justify-center ">
        <button onClick={() => setIsOpen(true)}>
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
              className="h-6 w-6 cursor-pointer dark:text-white"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </button>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="z-50 bg-gray-900"
      >
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <ul className="px-4 gap-2 ">
          <Link to="/dashboard">
            <li className="p-2 m-1 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center  dark:text-white">
              <button onClick={() => setIsOpen(false)}>Dashboard</button>
            </li>
          </Link>

          <Link to="/adviser">
            <li className="p-2 m-1 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center dark: text-white">
              <button onClick={() => setIsOpen(false)}>Adviser</button>
            </li>
          </Link>
        </ul>{" "}
      </Drawer>
    </div>
  );
}
