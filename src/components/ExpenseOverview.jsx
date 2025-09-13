import { useEffect, useState } from "react";
import { prepareExpenseLineChart } from "../util/util";
import { Plus } from "lucide-react";
import CustomLineChartExpense from "./CustomLineChartExpense";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChart(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card-overview rounded-xl drop-shadow-lg px-3 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-md text-gray-400 mt-1">
            Calculate your spending and expense over month
          </p>
        </div>
        <button
          onClick={onAddExpense}
          className="flex items-center gap-1 cursor-pointer text-green-500 bg-green-200 hover:bg-green-300 rounded-full focus:ring-1 focus:ring-green-700 -mb-1"
        >
          <Plus size={32} />
        </button>
      </div>
      <div className="mt-7">
        {/* Chart placeholder */}
        <CustomLineChartExpense data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
