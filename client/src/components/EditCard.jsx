import axios from "axios";
import { Button, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server_url } from "../utils/constants";
import { useTransactions } from "../hooks";
import { editTransaction } from "../utils/transactionSlice";

export function EditCard({
  _id,
  category,
  description,
  amount,
  transactionType,
  createdAt,
}) {
  useTransactions();

  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState("center");
  const [updatedAmount, setUpdatedAmount] = useState(amount);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedAmount(amount);
    setUpdatedCategory(category);
    setUpdatedDescription(description);
  }, [category, description, amount]);

  function handleEdit() {
    console.log(
      "Edit transaction",
      _id,
      category,
      description,
      amount,
      transactionType
    );
  }

  const updateTransaction = async (transactionId) => {
    try {
      const updatedTransaction = await axios.put(
        `${server_url}transactions/${transactionId}`,

        {
          amount: updatedAmount,
          category: updatedCategory,
          description: updatedDescription,
        },
        {
          withCredentials: true,
        }
      );

      if (!updatedTransaction) {
        console.log("Transaction editing failed");
      }

      setOpenModal(false);
      const transactionObj = updatedTransaction.data.data.updatedTransaction;

      dispatch(editTransaction(transactionObj));
    } catch (error) {
      // setError("error updating transaction", error);
      console.log("error updating transaction", error);
    }
  };

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
          <div className="border-l-2 dark:border-none p-4 mb-4 shadow-md  w-2/3 flex flex-col justify-center items-center  ">
            <div className="gap-6 flex flex-col py-6">
              <div className="flex justify-center items-center ">
                <label htmlFor="Amount" className="pr-4 dark:text-white">
                  Amount
                </label>
                <input
                  value={updatedAmount || amount}
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
                <label htmlFor="Category" className="pr-4 dark:text-white">
                  Category
                </label>
                <input
                  value={updatedCategory || category}
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
                <label htmlFor="Description" className="pr-4 dark:text-white">
                  Description
                </label>
                <input
                  value={updatedDescription || description}
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

            <button
              onClick={() => updateTransaction(_id)}
              className=" border border-blue-500 px-6 py-2 rounded-md  font-semibold dark:text-white"
            >
              Update
            </button>

            {/* {error && <div className="text-red-500">{error}</div>} */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
