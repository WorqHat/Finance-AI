import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { adviserIcon, dashboardIcon } from "../utils/svg";

export function DropdownMenu() {
  return (
    <Dropdown
      label={
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
      }
      inline
      className="z-50"
    >
      <Dropdown.Item className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
        <Link to="/dashboard">Dashboard </Link>
      </Dropdown.Item>
      <Dropdown.Item className="p-3 hover:shadow-sm hover:bg-gray-200 rounded-xl cursor-pointer flex items-center gap-2">
        {" "}
        <Link to="/adviser">Adviser </Link>{" "}
      </Dropdown.Item>
    </Dropdown>
  );
}
