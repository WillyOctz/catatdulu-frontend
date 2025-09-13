import { TrendingDown, TrendingUp, WalletCards } from 'lucide-react';
import Dashboard from '../components/Dashboard'
import InfoCard from '../components/InfoCard';
import { useUser } from '../hooks/useUser'
import { formatIndonesian } from "../util/util";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from "react-hot-toast";
import RecentTransactions from '../components/RecentTransactions';
import CustomPieChart from '../components/CustomPieChart';


const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if (loading) return;

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong fetching the data", error)
      toast.error("Something went wrong fetching the data")
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => {}
  }, [])

  return (
    <Dashboard activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid gird-cols-1 md:grid-cols-3 gap-6'>
          {/* displaying the cards */}
          <InfoCard
            icon={<WalletCards/>}
            label="Total Balance"
            value={formatIndonesian(dashboardData?.totalBalance || 0)}
            color="bg-blue-400"
          />
          <InfoCard
            icon={<TrendingUp/>}
            label="Total Income"
            value={formatIndonesian(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<TrendingDown/>}
            label="Total Expense"
            value={formatIndonesian(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {/* recent transacitons */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
          />

          {/* finance overview chart */}
          <div className='card'>
            <h5 className='text-black text-2xl font-semibold items-center flex justify-center mt-5'>Finance Overview</h5>
            <CustomPieChart data={dashboardData}/>
          </div>

          {/* expense transacitons added later*/}

          {/* income transacitons added later*/}
        </div>  
      </div>
    </Dashboard>
  )
}

export default Home