import axios from "axios";
import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import { MessageSquareCode, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export function ChatBotDial() {
  const [openModal, setOpenModal] = useState(false);
  const [latestNews, setLatestNews] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const text = `@Online  Whats the latest news in the finance industry in India? `
  //todo: check whetger online
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const options = {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
          randomness: 0.5,
          response_type: "json",
          stream_data: false,
          preserve_history: true,
        }),
      };

      try {
        const response = await axios.post(
          "https://api.worqhat.com/api/ai/content/v3/alpha",
          options.body,
          { headers: options.headers }
        );
        const latestNews = response.data.content;
        console.log("latestNews", latestNews);
        const parsedNews = JSON.parse(latestNews);
        console.log("parsedNews", parsedNews.latestFinanceNews);
        setLatestNews(parsedNews.latestFinanceNews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Tooltip
        content="See whats latest.."
        animation="duration-500"
        placement="left"
        style="light"
      >
        <button
          className="m-4 p-3 bg-blue-500 rounded-md"
          onClick={() => setOpenModal(true)}
        >
          {" "}
          <MessageSquareCode className="text-white " />
        </button>{" "}
      </Tooltip>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>ChatBot</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-base leading-relaxed   min-h-64">
            {isLoading ? (
              <Loading />
            ) : (
              <ul className="bg-gray-200 ">
                {latestNews &&
                  latestNews.map((news, index) => (
                    <li className="p-4 m-4 " key={index}>
                      {" "}
                      {news.news}{" "}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {console.log("latestNewsState", latestNews)}
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative" }} className="p-4  w-full flex ">
            <Textarea
              id="comment"
              placeholder="chat here"
              required
              rows={4}
              className=""
            />
            <button
              className="bg-blue-300-500 flex items-center text-center p-3 m-4 text-white rounded-md h-10 w-10 cursor-pointer"
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            >
              {<SendHorizonal />}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
