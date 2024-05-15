import { Table } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "lucide-react";
import { EditCard } from "./EditCard";
import axios from "axios";
import { server_url } from "../utils/constants";
import { useTransactions } from "../hooks";
import { deleteTransaction } from "../utils/transactionSlice";

export function ExpenseTable() {
  const [error, setError] = useState("");

  useTransactions();

  const fetchedTransactions = useSelector(
    (store) => store.transaction.allTransactions
  );

  console.log("fett", fetchedTransactions);

  const dispatch = useDispatch();

  if (!fetchedTransactions) {
    setError("No transactions found");
  }

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.delete(
        `${server_url}transactions/${transactionId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteTransaction(transactionId));
    } catch (error) {
      console.error("Error deleting transactions:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-base">
          {fetchedTransactions?.map((transaction) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Table.Cell>
              <Table.Cell>{transaction.category}</Table.Cell>

              <Table.Cell>{transaction?.description || "---"}</Table.Cell>
              <Table.Cell
                className={
                  transaction.transactionType === "expense"
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                }
              >
                {transaction.amount}
              </Table.Cell>
              <Table.Cell>
                <EditCard {...transaction} />
              </Table.Cell>
              <Table.Cell>
                <div className="hover:text-red-600 cursor-pointer">
                  <Delete onClick={() => handleDelete(transaction._id)} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
