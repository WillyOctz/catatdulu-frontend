import { Banknote, PercentCircle, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { addThousandsSeperator } from "../util/util";

const TransactionInfoCard = ({
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
    <div className="group relative flex items-center gap-4 mt-5 p-3 rounded-lg bg-gray-200 hover:bg-gray-300 drop-shadow-lg">
      {/* Transaction icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-black bg-blue-400 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <PercentCircle className="text-slate-600" />
        )}
      </div>

      {/* Title and date */}
      <div className="flex-1 flex gap-1 items-center justify-between">
        <div>
          <p className="text-md text-black font-medium">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>

        {/* Delete button and amount display */}
        <div className="flex items-center gap-1 space-x-1">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-black bg-red-400 hover:bg-red-500 cursor-pointer rounded-full py-1 px-1"
            >
              <Trash2 size={20} />
            </button>
          )}

          {/* Showing icon and amount with appropriate color */}
          <div
            className={`flex items-center px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${addThousandsSeperator(amount)}
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

export default TransactionInfoCard;
