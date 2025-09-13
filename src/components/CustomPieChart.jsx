import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatIndonesian } from '../util/util';

const CustomPieChart = ({ data }) => {
  if (!data) return null;

  const pieData = [
    //{ name: 'Total Balance', value: data.totalBalance || 0},
    { name: 'Total Income', value: data.totalIncome || 0},
    { name: 'Total Expense', value: Math.abs(data.totalExpense) || 0}
  ];

  const COLORS = ["#3B82F6", "#EF4444"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white p-3 border border-gray-200 rounded-lg shadow-lg'>
          <p className='font-semibold text-gray-800'>{payload[0].name}</p>
          <p className='text-sm text-gray-600'>{formatIndonesian(payload[0].value)}</p>
        </div>
      )
    }
    return null;
  }

  return (
    <div className='w-full h-80 md:h-96'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="60%"
            innerRadius={0}
            outerRadius={90}
            paddingAngle={-1}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
            startAngle={90}
            endAngle={-270}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='#fff' strokeWidth={2}/>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend
            align='center'
            wrapperStyle={{
              fontSize: "20px",
              paddingTop: "30px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart