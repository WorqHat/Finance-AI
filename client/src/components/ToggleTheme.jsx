import React, { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save theme to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // <button
    //   onClick={toggleDarkMode}
    //   className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
    // >
    //   {darkMode ? "Light Mode" : "Dark Mode"}
    // </button>

    <label className="inline-flex items-center cursor-pointer focus:outline-none">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 focus:outline-none bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-['🌞'] peer-checked:after:content-['🌜'] after:absolute after:top-0.5 after:start-[2px] after:bg-transparent   after:rounded-full after:h-5 after:w-5 after:flex after:items-center after:justify-center after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
      <span className="ms-3 text-sm focus:outline-none font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
};

export default ToggleTheme;
