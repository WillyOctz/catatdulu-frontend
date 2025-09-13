import React from "react";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart/>
    </div>
  );
};

export default FinanceOverview;
