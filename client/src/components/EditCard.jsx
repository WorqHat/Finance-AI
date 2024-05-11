import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function EditCard({
  _id,
  category,
  description,
  amount,
  transactionType,
  createdAt,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState("center");
  const [updatedAmount, setUpdatedAmount] = useState(amount);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  function handleEdit() {
    console.log("Edit button clicked");
    console.log(
      "Edit transaction",
      _id,
      category,
      description,
      amount,
      transactionType
    );
  }
  return (
    <>
      <div className="">
        <button
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          onClick={() => {
            setOpenModal(true);
            handleEdit();
          }}
        >
          Edit
        </button>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <div className="border-l-2 p-4 mb-4 shadow-md  w-2/3 flex flex-col justify-center items-center  ">
            <div className="gap-6 flex flex-col py-6">
              <div className="flex justify-center items-center ">
                <label htmlFor="Amount" className="pr-4">
                  Amount
                </label>
                <input
                  value={amount}
                  onChange={(e) => {
                    setUpdatedAmount(e.target.value);
                  }}
                  type="number"
                  id="Amount"
                  placeholder="00"
                  className="border-b-2"
                />
              </div>

              <div className="flex justify-center items-center ">
                {" "}
                <label htmlFor="Category" className="pr-4">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => {
                    setUpdatedCategory(e.target.value);
                  }}
                  type="text"
                  id="Category"
                  placeholder="Food, grocery, medical..."
                  className="border-b-2 "
                />
              </div>

              <div className="flex justify-center items-center ">
                <label htmlFor="Description" className="pr-4">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => {
                    setUpdatedDescription(e.target.value);
                  }}
                  type="text"
                  id="Description"
                  placeholder="dosa with friends"
                  className="border-b-2 align-middle"
                />
              </div>
            </div>

            <button className=" border border-blue-500 px-6 py-2 rounded-md  font-semibold">
              Update
            </button>

            {/* {error && <div className="text-red-500">{error}</div>} */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}