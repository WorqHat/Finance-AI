import { Table } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Delete } from "lucide-react";

export function ExpenseTable() {
  const [error, setError] = useState("");
  const fetchedTransactions = useSelector(
    (store) => store.transaction.allTransactions
  );

  if (!fetchedTransactions) {
    setError("No transactions found");
  }
  console.log(error);

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
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
              <Table.Cell>
                <div className="hover:text-red-600 cursor-pointer">
                  <Delete />{" "}
                </div>
              </Table.Cell>
            </Table.Row>

            // <tr key={transaction._id}>
            //   <td className="px-8 py-4">{transaction.category}</td>

            //   <td className="px-8 py-4">
            //     {transaction.transactionType === "income"
            //       ? transaction.amount
            //       : ""}
            //   </td>
            //   <td className="px-8 py-4">
            //     {transaction.transactionType === "expense"
            //       ? transaction.amount
            //       : ""}
            //   </td>
            // </tr>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
