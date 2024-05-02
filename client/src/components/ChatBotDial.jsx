import { Button, Modal, Textarea } from "flowbite-react";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export function ChatBotDial() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Click here</Button>
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
