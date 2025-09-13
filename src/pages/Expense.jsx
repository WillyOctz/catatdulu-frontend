import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseList from "../components/ExpenseList";
import AddExpenseModal from "../components/AddExpenseModal";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // fetch expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if (response.status === 200) {
        console.log("Expense get details", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch some expense data details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details"
      );
    } finally {
      setLoading(false);
    }
  };

  // fetch categories (expense) type
  const fetchCategoriesByType = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );

      if (response.status === 200) {
        console.log("expense categories", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Error fetching expense categories", error);
      toast.error(error.data?.message || "Failed to fetch expense categories");
    }
  };

  // delete expenses API
  const deleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_EXPENSE(id)
      );

      if (response.status === 204) {
        setOpenDeleteAlert({ show: false, data: null });
        toast.success("Expense deleted successfully!");
        fetchExpenseDetails();
      }
    } catch (error) {
      console.log("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // handle add expense API
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    // validation
    if (!name.trim()) {
      toast.error("Please enter the expense name!");
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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSES, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added succesffuly!");
        fetchExpenseDetails();
      }
    } catch (error) {
      console.log("Error adding expense", error);
      toast.error(error.response?.data?.message || "Failed to adding expense");
    }
  };

  // handle download expense report
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );

      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense report successfully downloaded!");
    } catch (error) {
      console.log("Error downloading expense details: ", error);
      toast.error(
        error.response?.data?.message || "Failed to download expense"
      );
    }
  };

  // email expense details .xlsx through email (will modify it to be able to sent to another recipient)
  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EMAIL_ATTACHMENT
      );

      if (response.status === 200) {
        toast.success("Expense details emailed sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email to said recipient", error);
      toast.error(
        error.response?.data?.message || "Failed to email the income details"
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchCategoriesByType();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview expense chart monthly */}
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          {/* expense list */}
          <ExpenseList
            transactions={expenseData}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          />

          {/* add expense modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseModal
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Modal>

          {/* Delete expense modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
