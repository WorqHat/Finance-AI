import React, { useState } from "react";

function parseBudgetAndExpenses(data) {
  const regex = /(?:\*\*([A-Za-z]+)\*\*: (\w+(?:\s+\w+)*))/g;
  const matches = [...data.matchAll(regex)];
  const budgetAndExpenses = {};

  matches.forEach((match) => {
    const category = match[1];
    const value = match[2];

    if (!budgetAndExpenses[category]) {
      budgetAndExpenses[category] = value;
    } else {
      if (!Array.isArray(budgetAndExpenses[category])) {
        budgetAndExpenses[category] = [budgetAndExpenses[category]];
      }
      budgetAndExpenses[category].push(value);
    }
  });

  return budgetAndExpenses;
}

function parseAdvice(data) {
  const regex = /(?:\d+\.\s+\*\*([A-Za-z\s]+)\*\*:\s+((?:- .+\n?)+))/g;
  const matches = [...data.matchAll(regex)];
  const advice = {};

  matches.forEach((match) => {
    const topic = match[1];
    const points = match[2]
      .split("\n")
      .filter(Boolean)
      .map((point) => point.trim().slice(2));
    advice[topic] = points;
  });

  return advice;
}

function parseData(data) {
  const budgetAndExpensesRegex =
    /### Budget and Expenses Analysis:(.*)### Advice on Managing Budget and Expenses:/s;
  const adviceRegex = /### Advice on Managing Budget and Expenses:(.*)/s;

  const budgetAndExpensesData = budgetAndExpensesRegex.exec(data)[1].trim();
  const adviceData = adviceRegex.exec(data)[1].trim();

  const budgetAndExpenses = parseBudgetAndExpenses(budgetAndExpensesData);
  const advice = parseAdvice(adviceData);

  return { budgetAndExpenses, advice };
}

function ResponseParser() {
  const [responseData, setResponseData] = useState("");

  // Dummy function to simulate data fetching
  const fetchData = () => {
    // Simulating data fetching delay with setTimeout
    setTimeout(() => {
      const response =
        "### Budget and Expenses Analysis: Based on the data provided, let's analyze the user's budget and expenses. The user has made transactions in various categories such as food, college, bottle, friend, and petrol. Here is a breakdown: - **Food**: Total expense of $250. Includes a purchase of dosa for $50 and another food item for $200. - **College**: Expense of $360 on components related to college. - **Bottle**: Expense of $250 on a bottle. - **Friend**: Income of $2000 from a friend. - **Petrol**: Expense of $1200 on petrol. ### Advice on Managing Budget and Expenses: 1. **Differentiate Between Necessary and Unnecessary Expenses**: - Necessary expenses are those essential for daily living like food and petrol. It's important to budget wisely for these. - Unnecessary expenses like buying an expensive bottle may be avoided to save more effectively. 2. **Budget Planning**: - Allocate specific amounts for each category such as food, college, and petrol to avoid overspending. - Consider setting aside a portion of income for savings before spending on non-essential items. 3. **Saving Up for a Coffee Date**: - To save up for a coffee date, consider cutting down on non-essential expenses like expensive bottles or dining out frequently. - Allocate a specific amount from each paycheck towards your coffee date fund. 4. **Savings Tips**: - Create a monthly budget plan outlining income, necessary expenses, savings, and discretionary spending. - Consider automating your savings by setting up automatic transfers to a separate savings account. By following these tips and being mindful of where your money goes, you can effectively manage your budget, differentiate between necessary and unnecessary expenses, save up for your coffee date goal, and build a healthy saving habit for the future.";
      setResponseData(response);
    }, 1000); // Simulate 1 second delay for data fetching
  };

  const parsedData = responseData ? parseData(responseData) : null;

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {parsedData && (
        <div>
          <h2>Budget and Expenses</h2>
          <pre>{JSON.stringify(parsedData.budgetAndExpenses, null, 2)}</pre>
          <h2>Advice on Managing Budget and Expenses</h2>
          <pre>{JSON.stringify(parsedData.advice, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResponseParser;
