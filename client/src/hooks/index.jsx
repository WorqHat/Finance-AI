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
        training_data: `response format(its just the exampke format ): {
          "news": [
            {
              "headline": "Financial sector regulators in India are increasingly collaborating to address market misconduct",
              "details": "Financial sector regulators in India are increasingly coming together to address wrongdoings and practices by market participants. This change is attributed to former Sebi chairman Ajay Tyagi, who established an institutional mechanism in 2019 to facilitate sharing of information and data between Sebi and RBI."
            },
            {
              "headline": "L&T Finance Holdings signs $125 million loan with JICA, ADB for rural lending",
              "details": "L&T Finance Holdings Ltd has signed pact with JICA and Asia Development Bank for $125 million to fund marginal farmers, women entrepreneurs, women borrowers, MSMEs, two-wheeler loans, and provide formal access to credit in rural and semi-urban India, supporting the Indian economy and addressing poverty reduction."
            },
            {
              "headline": "Muthoot FinCorp partners with Veefin to launch supply chain finance operations",
              "details": "Non-banking finance company Muthoot FinCorp has partnered with Veefin Solutions Ltd to launch supply chain finance operations in India. Muthoot FinCorp will utilize Veefin's technology to manage various aspects of supply chain finance, including onboarding suppliers and vendors, underwriting loans, and managing transactions."
            },
            {
              "headline": "IIFCL proposes classifying space sector as infrastructure",
              "details": "State-run infrastructure financing firm IIFCL has proposed that the space sector should be classified as part of the infrastructure sector. IIFCL has disbursed around ₹18,000 crore in loans in FY24 and is providing transaction advisory services to India's premier space agency, ISRO."
            }
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
