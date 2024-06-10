import axios from "axios";
import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import {
  BotMessageSquare,
  Dot,
  MessageSquareCode,
  SendHorizonal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./Loading";
import { useLatest } from "../hooks/index";
import { worqhat_url } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";

export function ChatBotDial({ latestNews, isLoading }) {
  const [openModal, setOpenModal] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [onlineAttribute, setOnlineAttribute] = useState(false);
  const [isAttribute, setIsAttribute] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [userResponses, setUserResponses] = useState([]);

  const chatContainerRef = useRef(null);

  const userTransactions = useSelector(
    (store) => store.transaction.allTransactions
  );

  const role = "Role: Act as a finance bot.";
  const Task = "Task: Chat with the user about about his finances.";
  const fromat = `Format: the response format should be not confusing and consistent. it should start with "{" and end with "}". it should follow the structure as: { <"response">: { <"text">: "response text"}}. the response text must not contain any unescaped control characters such as newline, tabs, it must be a single long string. it shouldnt have any Bad control character in string literal. No bullet points in response text. Response text must be a single long string.`;
  const train = `Training Data:  "latest in finance: ${latestNews}, userTransactions: ${userTransactions}, "conversation_history": ${chatHistory}"`;

  useEffect(() => {
    scrollToBottom();
  }, [userMessages, userResponses]);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function sendChat(chat) {
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
        training_data: `${role}, ${Task}, ${fromat}, ${train}`,
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
      console.log("parsedResponse", parsedResponse);

      setChatHistory([
        ...chatHistory,
        {
          chat: chat,
          response: parsedResponse.response.text,
        },
      ]);

      setUserResponses((prevResponses) => [
        ...prevResponses,
        parsedResponse.response.text || "Oops!! Try again after sometiem...",
      ]);
    } catch (error) {
      console.log("error while chatting", error);
      setUserResponses((prevResponses) => [
        ...prevResponses,
        "Oops!! Try again after sometiem...",
      ]);
    } finally {
      setIsFetching(false);
    }
  }

  const handleSendChat = () => {
    const message = userMessage.trim();
    if (message) {
      sendChat(message);
      setUserMessage("");
      setUserMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <>
      <Tooltip
        content="See whats latest.."
        animation="duration-500"
        placement="left"
        style="light"
      >
        <button
          className="max-md:m-4 mx-4 p-3 bg-blue-500 rounded-md"
          onClick={() => setOpenModal(true)}
        >
          {" "}
          <BotMessageSquare className="text-white " />
        </button>{" "}
      </Tooltip>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>ChatBot</Modal.Header>
        <Modal.Body className="overflow-y-auto ">
          <div className=" text-base leading-relaxed   min-h-64">
            {isLoading ? (
              <div className="p-4 bg-gray-100 animate-bounce rounded-2xl">
                {" "}
                <div className="animate-pulse"> Loading Latest news... </div>
              </div>
            ) : (
              <ul className=" text-semibold rounded-xl dark:text-white bg-gray-300 dark:bg-gray-800 bg-opacity-85 ">
                {latestNews ? (
                  latestNews.map((news, index) => (
                    <li className="p-2 m-2 " key={index}>
                      {" "}
                      <div className="font-semibold text-lg">
                        {news.headline}
                      </div>
                      <div>{news.details}</div>
                    </li>
                  ))
                ) : (
                  <div className="p-4 bg-gray-100 animate-bounce rounded-2xl text-black">
                    {" "}
                    <div className="animate-pulse">
                      {" "}
                      Loading Latest news...{" "}
                    </div>
                  </div>
                )}
              </ul>
            )}
          </div>

          <div className="overflow-y-auto">
            {userMessages.map((msg, index) => (
              <div key={index} className="m-2 p-2 rounded-md">
                <div className="flex justify-end">
                  <div className="dark:bg-gray-500  dark:text-white bg-gray-200 rounded-2xl my-4 mx-1 py-2 px-4 text-right">
                    {msg}
                  </div>
                </div>

                {userResponses[index] ? (
                  <div className=" dark:bg-gray-600 bg-gray-100 rounded-2xl my-4 mx-1 w-2/3 p-2 text-left dark:text-white">
                    {userResponses[index]}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-2xl my-4 mx-1 w-1/3 p-2 flex justify-start animate-pulse">
                    {" "}
                    <Dot className="text-gray-500 text-3xl animate-ping" />
                    <Dot className="text-gray-500 text-3xl animate-ping" />
                    <Dot className="text-gray-500 text-3xl animate-ping" />
                  </div>
                )}
              </div>
            ))}

            <div ref={chatContainerRef} />
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
              onClick={handleSendChat}
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
