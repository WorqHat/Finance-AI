import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import AddExpense from "./AddExpense";
import { Plus } from "lucide-react";

export function AddExpenseModel() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="m-4 p-3 bg-blue-500 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        {" "}
        <Plus className="text-white" />
      </button>{" "}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Expense</Modal.Header>
        <Modal.Body>
          <AddExpense />
        </Modal.Body>
      </Modal>
    </>
  );
}
