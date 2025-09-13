import { PercentCircle, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { addThousandsSeperator } from "../util/util";

const IncomeInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-5 p-3 rounded-lg bg-white hover:bg-gray-300 drop-shadow-lg">
      {/* icon incomes */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-black bg-blue-400 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <PercentCircle className="text-slate-600" />
        )}
      </div>
      {/* title and date incomes */}
      <div className="flex-1 flex gap-1 items-center justify-between">
        <div>
          <p className="text-md text-black font-medium">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>

        {/* trash delete button functions */}
        <div className="flex items-center gap-1 space-x-1">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-black bg-red-400 hover:bg-red-500 cursor-pointer rounded-full py-1 px-1"
            >
              <Trash2 size={20} />
            </button>
          )}

          {/* showing icon down and up for the incomes */}
          <div
            className={`flex items-center px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} Rp.{addThousandsSeperator(amount)}
            </h6>
            {type === "income" ? (
              <TrendingUp size={15} />
            ) : (
              <TrendingDown size={15} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeInfoCard;
