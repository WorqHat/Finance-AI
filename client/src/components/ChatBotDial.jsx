import axios from "axios";
import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import { MessageSquareCode, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./Loading";
import { useLatest } from "../hooks/index";
import { worqhat_url } from "../utils/constants";

export function ChatBotDial({ latestNews, isLoading }) {
  console.log("latestNews", latestNews);
  const [openModal, setOpenModal] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [onlineAttribute, setOnlineAttribute] = useState(false);
  const [isAttribute, setIsAttribute] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [userResponses, setUserResponses] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  console.log(onlineAttribute);

  async function sendChat(chat) {
    console.log("reached");
    setIsFetching(true);

    const query = (onlineAttribute ? "" : "") + chat.trim();

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
        training_data: `
           use this structure to send response: { "response": { text: "response text"}},
          "give short answers",
          chatHistory: ${JSON.stringify(chatHistory)},
          latestNews: ${JSON.stringify(latestNews)},
        `,

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
      console.log("response", content);
      const parsedResponse = JSON.parse(content);
      console.log("parsedResponse", parsedResponse.response.text);

      setChatHistory([
        ...chatHistory,
        {
          chat: chat,
          response: parsedResponse.response.text,
        },
      ]);

      parsedResponse.response.text
        ? setUserResponses([...userResponses, parsedResponse.response.text])
        : setUserResponses([
            ...userResponses,
            "Looke like somethings broken in me:)",
          ]);

      setIsFetching(false);
    } catch (error) {
      console.log("error while chatting", error);
    }
  }

  async function handleChat(userMessage, userResponse) {
    setIsFetching(true);

    setUserMessages([...userMessages, userMessage]);
    setUserResponses([...userResponses, userResponse]);
  }

  console.log("userMessages", userMessages, "userResponses", userResponses);
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
        <Modal.Body ref={chatContainerRef} className="">
          <div className=" text-base leading-relaxed   min-h-64">
            {isLoading ? (
              <Loading />
            ) : (
              <ul className=" text-semibold rounded-xl text-white bg-gray-800 bg-opacity-85 ">
                {latestNews &&
                  latestNews.map((news, index) => (
                    <li className="p-2 m-2 " key={index}>
                      {" "}
                      <div className="font-semibold text-lg">
                        {news.headline}
                      </div>
                      <div>{news.details}</div>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div ref={chatContainerRef} className="overflow-y-auto">
            {isFetching ? (
              <Loading />
            ) : (
              chatHistory &&
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
              ))
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-col">
          <div className="flex justify-start w-full ">
            <label class="inline-flex items-center cursor-pointer pb-4 ">
              <input
                type="checkbox"
                checked={onlineAttribute}
                onChange={(e) => setOnlineAttribute(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                @online
              </span>
            </label>
          </div>
          <div style={{ position: "relative" }} className=" w-full flex ">
            <Textarea
              id="comment"
              placeholder={"chat here"}
              value={userMessage}
              required
              rows={3}
              className=""
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 flex items-center text-center p-3  text-white rounded-md h-10 w-10 cursor-pointer"
              onClick={() => {
                sendChat(userMessage);
                setUserMessage("");
                setUserMessages([...userMessages, userMessage]);
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
