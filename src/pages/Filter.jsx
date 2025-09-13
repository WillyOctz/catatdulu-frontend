import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard";

const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be more than End date");
    }

    setLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      // console.log(response.data) --> for debugging only!
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      toast.error(
        error.message || "Failed to fetch transactions. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortField("date");
    setSortOrder("asc");
    setTransactions([]);
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transaction</h2>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-red-500 text-gray-700 rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <div className="card-overview p-4 mb-4 rounded-xl drop-shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="type">
                Type
              </label>
              <select
                value={type}
                id="type"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                value={startDate}
                id="startdate"
                type="date"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                htmlFor="enddate"
                className="block text-sm font-medium mb-1"
              >
                End Date
              </label>
              <input
                value={endDate}
                id="enddate"
                type="date"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>

            <div>
              <label
                htmlFor="sortfield"
                className="block text-sm font-medium mb-1"
              >
                Sort Field
              </label>
              <select
                value={sortField}
                id="sortfield"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-1"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                id="sortorder"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  Keyword
                </label>
                <input
                  value={keyword}
                  id="keyword"
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => setKeyword(e.target.value)}
                ></input>
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 mt-1 p-3 rounded-md hover:bg-blue-100 bg-blue-500 flex items-center justify-center cursor-pointer"
              >
                <span className="text-black">
                  <Search size={20} />
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="card-overview p-4 rounded-xl drop-shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Search Results</h2>
          </div>
          
          {loading ? (
            <p className="text-gray-500 text-center py-5">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-5">
              {startDate || endDate || keyword 
                ? "No transactions found with the selected filters" 
                : "Select filters and click search to find transactions"}
            </p>
          ) : (
            transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format('Do MMM YYYY')}
                amount={transaction.amount}
                type={transaction.type || type}
                hideDeleteBtn={true}
              />
            ))
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
