import axios from "axios";
import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import { MessageSquareCode, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { useLatest } from "../hooks/index";
import { worqhat_url } from "../utils/constants";

export function ChatBotDial() {
  const [openModal, setOpenModal] = useState(false);
  const [chat, setChat] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [onlineAttribute, setOnlineAttribute] = useState(false);
  const [isAttribute, setIsAttribute] = useState(false);

  async function sendChat(chat) {
    console.log("reached");

    const query = (onlineAttribute ? "@online " : "") + chat.trim();

    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: query,
        randomness: 0.5,
        preserve_history: true,
        training_data: [
          // "LatestNews: " + JSON.stringify(latestNews),
          // "UserChat: " + chat,
          // "Previous chat: " + chatHistory,
          ` {
            response: {
          }
        }`,
          "give short answers",
        ],

        response_type: "text",
      }),
    };

    try {
      const url = onlineAttribute
        ? `${worqhat_url}v3/alpha`
        : `${worqhat_url}v2`;

      const response = await axios.post(url, options.body, {
        headers: options.headers,
      });
      const content = response.data.content;
      console.log("response", response);

      setChatHistory([
        ...chatHistory,
        {
          chat: chat,
          response: content,
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
        <Modal.Body className="">
          {/* <div className=" text-base leading-relaxed   min-h-64">
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
          </div> */}

          <div>
            {chatHistory &&
              chatHistory.map((chat, index) => (
                <div key={index} className="m-2 p-2  rounded-md">
                  <div className="flex justify-end ">
                    <div className="bg-gray-800 text-white rounded-2xl my-4 mx-1 py-2  px-4 text-right">
                      {chat.chat}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl my-4 mx-1 w-1/2 p-2 text-left">
                    {chat.response}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-col">
          <div className="flex justify-start w-full ">
            <label htmlFor="onlineCheckbox" className="m-2">
              <input
                type="checkbox"
                id="onlineCheckbox"
                checked={onlineAttribute}
                onChange={(e) => setOnlineAttribute(e.target.checked)}
              />{" "}
              @online
            </label>
          </div>
          <div style={{ position: "relative" }} className=" w-full flex ">
            <Textarea
              id="comment"
              placeholder={"chat here"}
              value={chat}
              required
              rows={3}
              className=""
              onChange={(e) => setChat(e.target.value)}
            />
            <button
              className="bg-blue-500 flex items-center text-center p-3  text-white rounded-md h-10 w-10 cursor-pointer"
              onClick={() => {
                sendChat(chat);
                setChat("");
              }}
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
