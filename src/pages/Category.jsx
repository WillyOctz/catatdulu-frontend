import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Plus } from "lucide-react";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

      if (response.status == 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again later");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("name of the category is required!");
      return;
    }

    // validation check if categories with the same name already exists
    const normalizeString = (str) =>
      str.trim().toLowerCase().replace(/\s+/g, "");

    const isDuplicate = categoryData.some((category) => {
      return normalizeString(category.name) === normalizeString(name);
    });

    if (isDuplicate) {
      toast.error("Category name already exists!");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.SAVE_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Categories has been added succesfully!");
        fetchCategoryDetails();
      }
      setOpenAddCategoryModal(false);
    } catch (error) {
      console.error("Error adding actegory:", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;
    if (!name.trim()) {
      toast.error("Category name is required!");
      return;
    }

    if (!id) {
      toast.error("Category ID is missing for an update!");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_CATEGORY(id),
        { name, type, icon }
      );

      if (response.status === 200) {
        setOpenEditCategoryModal(false);
        setSelectedCategory(null);
        toast.success("Category has been updated successfully!");
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error updating category!", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update category!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold ">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-1 cursor-pointer text-green-500 bg-green-200 hover:bg-green-300 rounded-full focus:ring-1 focus:ring-green-700"
          >
            <Plus size={32} />
          </button>
        </div>

        {/* Category list */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          title="Add Category"
          onClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>
        {/* Updating category modal */}
        <Modal
          isOpen={openEditCategoryModal}
          title="Edit Category"
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
        >
          <AddCategoryForm
            onAddCategory={handleUpdateCategory}
            initialCategoryData={selectedCategory}
            isEditing={true}
            
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
