import axios from "axios";
import { Button, Timeline, Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";

export function SpendingTimeline() {
  const [timelineData, setTimelineData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const transactions = useSelector(
    (store) => store.transaction.allTransactions
  );
  console.log(transactions);
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: `Given the following data of the budgets and expenses of the user according to the category: 
      give the users spending overall habits in a timeline format. dont give advice on every individual expense but give a overall brief about it.
      use this format for response: [
        response{
          childOne:
          ["Month": "",
            "Title": "",
            "Description": ""
          ]

          //there can ve more childrens so give response accordingly
        

        }
      ]
                    `,
      randomness: 0.5,
      training_data: "Transactions data: " + JSON.stringify(transactions),
      response_type: "json",
    }),
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const response = await axios.post(
        "https://api.worqhat.com/api/ai/content/v2",
        options.body,
        { headers: options.headers }
      );
      const content = JSON.parse(response.data.content);
      setTimelineData(content[0].response[0].childOne);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-y-scroll h-3/4">
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>Your Spending Habits</Accordion.Title>
          <Accordion.Content>
            <Timeline>
              {isLoading ? (
                <Loading />
              ) : (
                <div>
                  {timelineData?.map((item, index) => (
                    <Timeline.Item key={index}>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>{item.Month}</Timeline.Time>
                        <Timeline.Title>{item.Title}</Timeline.Title>
                        <Timeline.Body>{item.Description}</Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </div>
              )}
            </Timeline>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
