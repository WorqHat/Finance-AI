import { useEffect, useState } from "react";
import { server_url, worqhat_url } from "../utils/constants";
import axios from "axios";
import {
  addAllTransactions,
  addExpenses,
  addIncomes,
} from "../utils/transactionSlice";
import { useDispatch } from "react-redux";

export const useLatest = () => {
  const [latestNews, setLatestNews] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const query = `Whats the latest news in the finance industry in India? if there is no news, return an "No major news for today" message.`;
  const fetchData = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: query,
        response_type: "json",
        stream_data: false,
        preserve_history: true,
        training_data: `response format(its just the exampke format, do not include any starter lines like "based on the contet provided... na ddo not use the contents given below as training only use the format as its given " ): {
          "news": [
            {
              "headline": "headline of the news",
              "details": "detail of the news"
            },
            {
              "headline": "headline of the news",
              "details": "detail of the news"
            },
            {
              "headline": "headline of the news",
              "details": "detail of the news"
            },
            {
              "headline": "headline of the news",
              "details": "detail of the news"
            },
          ]
        }`,
      }),
    };

    try {
      const response = await axios.post(
        `${worqhat_url}v3/alpha`,
        options.body,
        { headers: options.headers }
      );
      const content = response.data.content;
      console.log("content", content);
      const parsedResponse = JSON.parse(content);
      console.log("parsedResponse", parsedResponse.news);
      setLatestNews(parsedResponse.news);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { latestNews, isLoading };
};

export const useTransactions = () => {
  const dispatch = useDispatch();
  const fetchTransactionsFromServer = async () => {
    try {
      let expenses = [];
      let incomes = [];

      const transactions = await axios.get(`${server_url}transactions/`, {
        withCredentials: true,
      });

      if (!transactions) {
        console.log("No transactions found");
      }

      transactions.data.data.transactions.map((transaction) => {
        if (transaction.transactionType === "expense") {
          expenses.push(transaction);
        }
      });

      transactions.data.data.transactions.map((transaction) => {
        if (transaction.transactionType === "income") {
          incomes.push(transaction);
        }
      });

      expenses.length !== 0 && dispatch(addExpenses(expenses));
      incomes.length !== 0 && dispatch(addIncomes(incomes));
      dispatch(addAllTransactions(transactions.data.data.transactions));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransactionsFromServer();
  }, []);
};
