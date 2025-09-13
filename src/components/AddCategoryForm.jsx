import { useEffect, useState } from "react";
import Input from "../components/Input";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <EmojiPickerPopUp
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g Freelance, Groceries etc."
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="rounded-lg bg-blue-500 hover:bg-blue-600 py-2 focus:ring-1 items-center justify-center flex focus:ring-black px-2 cursor-pointer"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>
              {isEditing ? <span>Edit Category</span> : <span>Add Category</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
