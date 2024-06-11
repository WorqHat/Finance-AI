import React from "react";
import { useSelector } from "react-redux";

function ServicesChips() {
  const services = [
    "Overall Analysis of your expenses",
    "Personalized advice on Budget",
    "Budget Plans",
    "Savings Tips",
  ];
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4 m-2 rounded-lg dark:bg-gradient-to-r dark:from-cyan-700 dark:to-teal-900 dark:text-white dark:bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-100 dark:bg-opacity-40 border-opacity-20 shadow-lg"
        >
          <h2 className="font-semibold">{service}</h2>
        </div>
      ))}
    </div>
  );
}

const AdviserGreeting = () => {
  const userObject = useSelector((state) => state.auth.user);
  console.log("userObject ", userObject);
  const userFirstName = userObject?.fullName.split(" ")[0] || "";
  return (
    <div className=" text-center flex flex-col justify-center items-center mt-10  ">
      <h1 className="dark:text-white text-5xl font-semibold">
        Hello there{" "}
        <span className="text-cyan-700 dark:text-cyan-500">
          {userFirstName}
        </span>
        ,{" "}
      </h1>
      <br></br>
      <p className="dark:text-white">
        I am a finance adviser and I am here to help you with your finances with
        the following services:
      </p>
      <div>
        {" "}
        <ServicesChips />
      </div>
    </div>
  );
};

export default AdviserGreeting;
