import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // fetch income details API
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

      if (response.status === 200) {
        console.log("Incomes Get List: ", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch some incomes data details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details"
      );
    } finally {
      setLoading(false);
    }
  };

  //fetch categories for income type
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );

      if (response.status === 200) {
        console.log("income categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Error fetching income categories", error);
      toast.error(error.data?.message || "Failed to fetch income categories");
    }
  };

  // save the income details to backend database
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    // validation
    if (!name.trim()) {
      toast.error("Please enter the income name!");
    }

    if (!amount || isNaN(amount) || Number(amount) < 0) {
      toast.error("Amount need to be valid than number greater than 0");
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be set for the future");
      return;
    }

    if (!categoryId) {
      toast.error("Category is required!");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully!");
        fetchIncomeDetails();
      }
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to adding income");
    }
  };

  // delete income details
  const deleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_INCOME(id)
      );

      if (response.status === 204) {
        setOpenDeleteAlert({ show: false, data: null });
        toast.success("Income deleted successfully!");
        fetchIncomeDetails();
      }
    } catch (error) {
      console.log("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // download income reports .xlsx
  const handleDownloadIncomeDetails = async () => {
    
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download income reports successfully!");
    } catch (error) {
      console.log("Error downloading income details: ", error);
      toast.error(error.response?.data?.message || "Failed to download income");
    } 
  };

  // email income details .xlsx through email (will modify it to be able to sent to another recipient)
  const handleEmailIncomeDetails = async () => {
    
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EMAIL_ATTACHMENT
      );
      if (response.status === 200) {
        toast.success("Income details emailed sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email to said recipient", error);
      toast.error(
        error.response?.data?.message || "Failed to email the income details"
      );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line charts */}
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          {/* Incomes list */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          ></IncomeList>

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>

          {/* Delete income modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
