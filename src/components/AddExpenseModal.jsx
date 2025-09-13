import { useEffect, useState } from "react";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseModal = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopUp
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Source"
        placeholder="e.g., Buying, Spending.."
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.000"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
            onClick={handleAddExpense}
            disabled={loading}
            className="card-action-btn bg-blue-500 cursor-pointer"
        >
            {loading ? (
                <LoaderCircle className="animate-spin w-4 h-4">
                    Adding expense...
                </LoaderCircle>
            ) : (
                <span className="text-black">Add Expense</span>
            )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseModal;
