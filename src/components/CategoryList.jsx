import { Pencil, PencilRulerIcon } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {/* Category list */}
      {categories.length === 0 ? (
        <p className="text-gray-500 text-center justify-center flex">
          No Categories Added Just Yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="card group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-200"
            >
              {/* Icon/Emoji display */}
              <div className="card-icon w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-5 h-5"
                    />
                  </span>
                ) : (
                  <Pencil className="text-blue-500" size={24} />
                )}
              </div>
              {/* Category details */}
              <div className="flex-1 flex items-center justify-between">
                {/* Category type and name */}
                <p className="text-sm text-gray-700 font-medium">
                  {category.name}
                </p>
                <p className="text-sm text-gray-500 capitalize mt-1">
                  {category.type}
                </p>
                {/* Action button */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onEditCategory(category)}
                    className="text-gray-400 hover:text-blue-500 cursor-pointer active:bg-blue-500/50 rounded-full"
                  >
                    <PencilRulerIcon size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
