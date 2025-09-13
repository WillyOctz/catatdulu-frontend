import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card-overview rounded-xl drop-shadow-lg px-3 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-md text-gray-400 mt-1">
            Track your earnings and incomes over the month
          </p>
        </div>
        <button
          onClick={(onAddIncome)}
          className="flex items-center gap-1 cursor-pointer text-green-500 bg-green-200 hover:bg-green-300 rounded-full focus:ring-1 focus:ring-green-700 -mb-1"
        >
          <Plus size={32} />
        </button>
      </div>
      <div className="mt-7">
        {/* Chart placeholder */}
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
