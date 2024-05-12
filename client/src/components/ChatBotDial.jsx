import { Button, Modal, Textarea, Tooltip } from "flowbite-react";
import { MessageSquareCode, SendHorizonal } from "lucide-react";
import { useState } from "react";

export async function ChatBotDial() {
  const [openModal, setOpenModal] = useState(false);

  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer <token>",
      "Content-Type": "application/json",
    },
    body: '{"question":"What is the capital of India?","preserve_history":true,"randomness":0.5,"stream_data":false,"conversation_history":[{"What is the capital of India?":"New Delhi"},{"What is the capital of USA?":"Washington DC"}],"training_data":"You are alex and you are one of the best Tour Guides.","response_type":"text"}',
  };

  const latestNews = await axios.get(`${server_url}transactions/`, {
    withCredentials: true,
  });

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
          <div className="space-y-6 text-base leading-relaxed text-gray-500 dark:text-gray-400 min-h-64">
            <p className="">
              Heres
              latest..............................................................................................................................
            </p>
          </div>
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
