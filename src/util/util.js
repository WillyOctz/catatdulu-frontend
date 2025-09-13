export const addThousandsSeperator = (num, format = "international") => {
  if (num == null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  if (format === "indonesian") {
    // Indonesian format : 1.000.000,00 (period for thousands, comma for decimals)
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return fractionalPart ? `${integerPart}, ${fractionalPart}` : integerPart;
  } else {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${integerPart}, ${fractionalPart}` : integerPart;
  }
};

export const formatIndonesian = (num) => {
  if (num == null || isNaN(num)) return "";

  // handle negative numbers
  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);

  const numStr = absoluteNum.toString();
  const parts = numStr.split(".");
  let integerPart = parts[0];
  let fractionalPart = parts[1] || "";

  // Add thousand seperators (periods)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let result = fractionalPart
    ? `${integerPart}, ${fractionalPart}`
    : integerPart;

  if (isNegative) {
    result = `-Rp.${result}`;
  } else {
    result = `Rp.${result}`;
  }

  return result;
};

export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  // using the year and month based on database and get the current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Filter transactions to only include current month
  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getFullYear() === currentYear &&
      transactionDate.getMonth() === currentMonth
    );
  });

  if (currentMonthTransactions.length === 0) return [];

  // Use current month for the chart range
  const startOfMonth = new Date(currentYear, currentMonth, 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  // create an array of all dates from start of the month to end of the month
  const allDates = [];
  const currentDate = new Date(startOfMonth);

  while (currentDate.getTime() <= endOfMonth.getTime()) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // create a map and initialize with 0 for all dates
  const incomeByDateMap = new Map();
  allDates.forEach((date) => {
    const dateKey = date.toISOString().split("T")[0];
    incomeByDateMap.set(dateKey, 0);
  });

  // aggregate income amounts by actual date
  currentMonthTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    transactionDate.setHours(0, 0, 0, 0); // Normalize transaction date
    const dateKey = transactionDate.toISOString().split("T")[0];

    if (incomeByDateMap.has(dateKey)) {
      incomeByDateMap.set(
        dateKey,
        incomeByDateMap.get(dateKey) + Number(transaction.amount)
      );
    }
  });

  // convert to the exact format from your first image
  const chartData = Array.from(incomeByDateMap)
    .map(([date, amount]) => {
      const jsDate = new Date(date);

      return {
        date: date,
        totalAmount: amount,
        items: currentMonthTransactions.filter((t) => {
          const transactionDate = new Date(t.date);
          transactionDate.setHours(0, 0, 0, 0);
          return transactionDate.toISOString().split("T")[0] === date;
        }),
        month: formatToOrdinal(jsDate),
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
};

// practically the same as prepareIncomeLineChart only key differences is the negative value to show in the expense
export const prepareExpenseLineChart = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getFullYear() === currentYear &&
      transactionDate.getMonth() === currentMonth
    );
  });

  if (currentMonthTransactions.length === 0) return [];

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const allDates = [];
  const currentDate = new Date(startOfMonth);

  while (currentDate.getTime() <= endOfMonth.getTime()) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const expenseByDateMap = new Map();
  allDates.forEach((date) => {
    const dateKey = date.toISOString().split("T")[0];
    expenseByDateMap.set(dateKey, 0);
  });

  currentMonthTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    transactionDate.setHours(0, 0, 0, 0);
    const dateKey = transactionDate.toISOString().split("T")[0];

    if (expenseByDateMap.has(dateKey)) {
      expenseByDateMap.set(
        dateKey,
        expenseByDateMap.get(dateKey) + Number(transaction.amount)
      );
    }
  });

  const chartData = Array.from(expenseByDateMap)
    .map(([date, amount]) => {
      const jsDate = new Date(date);

      return {
        date: date,
        totalAmount: amount,
        items: currentMonthTransactions.filter((t) => {
          const transactionDate = new Date(t.date);
          transactionDate.setHours(0, 0, 0, 0);
          return transactionDate.toISOString().split("T")[0] === date;
        }),
        month: formatToOrdinal(jsDate),
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
};

// helper function to format date as "6th Jul" (ordinal format)
const formatToOrdinal = (date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });

  // add ordinal suffix (st, nd, rd, th)
  const ordinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}`;
};
