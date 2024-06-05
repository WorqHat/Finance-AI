import { Label, Textarea } from "flowbite-react";
import { ChevronRight, SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import AdviserMenu from "../components/AdviserMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Popup } from "../components/Popup";
import Shimmer from "../components/Shimmer";
import { server_url } from "../utils/constants";
import AdviserGreeting from "../components/AdviserGreeting";
import { AdviserMenuDrawer } from "../components/AdviserMenuDrawer";

const Adviser = () => {
  const [isStatementUpload, setIsStatementUpload] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [advice, setAdvice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const transactions = useSelector(
    (store) => store.transaction.allTransactions
  );

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: `Given the following data of the budgets and expenses of the user according to the category: 
      briefly analyze the data and give advice to the user on how to manage their budget and expenses and possibly suggest budget plans. Differentia between the necessary expenses and the unnecessary expenses, and give advices accordingly.
      This are the extra specific instructions from the user: ${inputValue}.
      Dont give advice on every individual expense but give a overall brief about it.
      And also give savings tip. 
      (we are going to show the data in the form of timeline where there should be a heading and a passage of advive after that, so return the data in such format which will be easier to parse for such feature. get the response in a proper json fromat so that its easier to fromat, segragate each heading, subheading, bullet points, and its descriptions, etc. properly)
      use this json format: [
        response {
        "Analysis": {
            "OverallAnalysis": "",
            "AdviceOnBudget": {
                "NeedsAndWants": ",
                "BudgetPlansSuggestions": [
                    {
                        "Plan": "",
                        "Description": ""
                    },
                    {
                        "Plan": "",
                        "Description": ""
                    }
                ]
            },
            "SavingsTips": {
                "TipOne": {
                    "Title": "",
                    "Description": ""
                },
                "TipTwo": {
                    "Title": "",
                    "Description": ""
                },
                //might be more such tips
            }
        }
    }]`,
      randomness: 0.5,
      training_data: "Transactions data: " + JSON.stringify(transactions),
      response_type: "json",
    }),
  };

  const handleAdviceRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.worqhat.com/api/ai/content/v2",
        options.body,
        { headers: options.headers }
      );
      const content = JSON.parse(response.data.content);
      setAdvice(content[0].response.Analysis);

      if (response) {
        const history = await axios.post(
          `${server_url}history/`,
          { advice: content[0].response.Analysis },
          { withCredentials: true }
        );
        if (!history) {
          console.log("Error while saving history");
        }
        console.log(history);
      }
    } catch (error) {
      console.log("error while getting the advice response", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(advice);

  useEffect(() => {
    if (advice) {
      setIsLoading(false);
    }
  }, [advice]);

  const { OverallAnalysis, AdviceOnBudget, SavingsTips } = advice || {};

  return (
    <div className="flex justify-between max-h-screen overflow-hidden ">
      <div className="w-full border dark:border-none m-4 p-4  flex flex-col justify-between max-md:w-screen ">
        <div className="  flex flex-col h-full">
          {/* buttons */}
          <div className="flex justify-between">
            <button></button>

            <Popup />
          </div>
          {/* contentarea */}
          <div className="overflow-y-scroll flex-grow h-full mb-24">
            {!advice ? (
              <div className="flex justify-center items-center">
                {isLoading ? (
                  <div className="w-full h-full">
                    <Shimmer />
                  </div>
                ) : (
                  <AdviserGreeting />
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center ">
                {isLoading ? (
                  <div className="w-full h-full">
                    <Shimmer />
                  </div>
                ) : (
                  <div className="container mx-auto py-8 ">
                    <div className="bg-gray-100 rounded-lg p-4 dark:bg-gray-500 dark:text-white">
                      <h2 className="text-2xl font-semibold mb-4">
                        Overall Analysis:
                      </h2>
                      <p>{OverallAnalysis}</p>
                    </div>

                    <div className="mt-8 dark:text-white">
                      <h3 className="text-xl font-semibold mb-4">
                        Advice on Budget:
                      </h3>
                      <p className="ml-4">{AdviceOnBudget?.NeedsAndWants}</p>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 ">
                          Budget Plans Suggestions:
                        </h4>
                        <ul className=" pl-4 grid grid-cols-2 gap-12">
                          {AdviceOnBudget?.BudgetPlansSuggestions.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="mb-2 p-3 bg-gray-100 rounded-lg  dark:bg-gray-500 dark:text-white"
                              >
                                <strong>{item.Plan}:</strong> {item.Description}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">
                        Savings Tips:
                      </h3>

                      <div className="flex flex-col space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-500 dark:text-white">
                          <h4 className="text-lg font-semibold mb-2">
                            {SavingsTips?.TipOne.Title}
                          </h4>
                          <p>{SavingsTips?.TipOne.Description}</p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-500 dark:text-white">
                          <h4 className="text-lg font-semibold mb-2">
                            {SavingsTips?.TipTwo.Title}
                          </h4>
                          <p>{SavingsTips?.TipTwo.Description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* textarea */}
          {!advice && (
            <div className="flex justify-between mb-20">
              <div style={{ position: "relative" }} className="  w-full flex ">
                <Textarea
                  id="comment"
                  placeholder="Any specific instructions???"
                  required
                  rows={4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className=""
                />
                <button
                  onClick={handleAdviceRequest}
                  className="bg-blue-500 flex items-center text-center p-4 m-4 text-white rounded-md h-12 w-12 cursor-pointer"
                  style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                  }}
                >
                  {isLoading ? <Loading /> : <SendHorizonal />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="m-4 p-4 w-1/3 border max-md:hidden">
        <AdviserMenu />
      </div>
      <div>
        <AdviserMenuDrawer />
      </div>
    </div>
  );
};

export default Adviser;
