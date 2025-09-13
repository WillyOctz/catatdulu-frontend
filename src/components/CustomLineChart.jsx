import { formatIndonesian } from "../util/util";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data }) => {
  // format data for the chart - use the simplified version
  const chartData = data.map((item) => ({
    date: item.month,
    amount: item.totalAmount,
  }));

  // custom tooltip component to match your image
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // find the full data item for this point
      const fullData = data.find((item) => item.month === label);

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">
            Total: Rp.{formatIndonesian(payload[0].value)}
          </p>

          {fullData?.items && fullData.items.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Details:</p>
              {fullData.items.map((item, index) => (
                <div key={index} className="text-xs text-gray-700">
                  • {item.name}: Rp. {formatIndonesian(item.amount)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // calculate max value for Yaxis with some padding
  const maxAmount = Math.max(...chartData.map((item) => item.amount));
  const yAxisMax = maxAmount * 1.2; // this is adding 20% padding

  return (
    <div className="w-full h-90">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="-1">
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#666" }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#666" }}
            tickFormatter={(value) => `Rp. ${formatIndonesian(value)}`}
            domain={[0, yAxisMax]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            fill="url(#colorExpense)"
            stroke="none"
            activeDot={{ r: 7, fill: "#2563EB" }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: "#3B8F26", strokeWidth: 1, r: 4 }}
            activeDot={{ r: 7, fill: "#2563EB" }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center">
          <div className="w-4 h-1 bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Income Trend</span>
        </div>
      </div>
    </div>
  );
};

export default CustomLineChart;
