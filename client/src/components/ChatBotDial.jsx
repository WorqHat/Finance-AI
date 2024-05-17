import axios from "axios";
import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import { MessageSquareCode, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { useLatest } from "../hooks/index";

export function ChatBotDial() {
  const [openModal, setOpenModal] = useState(false);
  const [chat, setChat] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const { latestNews, isLoading } = useLatest();
  async function sendChat(latestNews, chat) {
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: `Given the training data of latest news in the finance industry in India and the user's chat, analyze the data and give a single response. (only return json no text)
        use the format as: {
          
            response: {
            
          }
        }`,
        randomness: 0.5,
        training_data: [
          "LatestNews: " + JSON.stringify(latestNews),
          "UserChat: " + chat,
          "Previous chat: " + chatHistory,
          "use format",
        ],

        response_type: "json",
      }),
    };

    try {
      const response = await axios.post(
        "https://api.worqhat.com/api/ai/content/v2",
        options.body,
        { headers: options.headers }
      );
      const stringifyContent = JSON.stringify(response.data.content);
      const content = JSON.parse(stringifyContent);
      console.log("content", content);

      setChatHistory([
        ...chatHistory,
        {
          chat,
          response: content.response.analysis || content.response.message,
        },
      ]);
    } catch (error) {
      console.log("error while chatting", error);
    }
  }

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
          <div className=" text-base leading-relaxed   min-h-64">
            {isLoading ? (
              <Loading />
            ) : (
              <ul className=" text-semibold rounded-xl text-white bg-blue-500 bg-opacity-85 ">
                {latestNews &&
                  latestNews.map((news, index) => (
                    <li className="p-2 m-2 " key={index}>
                      {" "}
                      {news.news}{" "}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div>
            {chatHistory &&
              chatHistory.map((chat, index) => (
                <div key={index} className="m-2 p-2  rounded-md">
                  <div className="flex justify-end ">
                    <div className="bg-gray-800 text-white rounded-2xl my-4 mx-1 py-2  px-4 text-right">
                      {chat.chat}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl my-4 mx-1 p-2 text-left">
                    {chat.response}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative" }} className=" w-full flex ">
            <Textarea
              id="comment"
              placeholder="chat here"
              required
              rows={3}
              className=""
              onChange={(e) => setChat(e.target.value)}
            />
            <button
              className="bg-blue-500 flex items-center text-center p-3  text-white rounded-md h-10 w-10 cursor-pointer"
              onClick={() => sendChat(latestNews, chat)}
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
