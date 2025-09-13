import { Download, LoaderCircle, Mail, Plus } from "lucide-react";
import IncomeInfoCard from "./IncomeInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Incomes Source</h4>

        <div className="flex items-center justify-end gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {/* displaying the incomes */}
        {transactions?.map((income) => (
          <IncomeInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
