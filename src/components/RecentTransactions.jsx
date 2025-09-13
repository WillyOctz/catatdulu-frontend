import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ml-3">
        <h4 className="text-lg">Recent Transactions</h4>

        <button className="card-action-btn items-center flex" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6 px-5 py-4">
        {transactions?.slice(0,5)?.map(item => (
            <TransactionInfoCard
                key={item.id}
                title={item.name}
                icon={item.icon}
                date={moment(item.date).format("Do MM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
            />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
