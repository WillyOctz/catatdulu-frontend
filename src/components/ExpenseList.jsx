import { useState } from "react";
import ExpenseInfoCard from "./ExpenseInfoCard";
import moment from "moment";
import { Download, LoaderCircle, Mail } from "lucide-react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Expenses Info</h4>
        <div className="flex items-center justify-end gap-2">
          {/* download and email button  */}
          <button
            disabled={emailLoading}
            className="card-action-btn flex items-center gap-2 border-2"
            onClick={handleEmail}
          >
            {emailLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Mail size={15} className="text-black" />
                Email
              </>
            )}
          </button>

          <button
            disabled={downloadLoading}
            className="card-action-btn flex items-center gap-2 border-2"
            onClick={handleDownload}
          >
            {downloadLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-pulse" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-black" />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* expense info card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {transactions?.map((expense) => (
          <ExpenseInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
