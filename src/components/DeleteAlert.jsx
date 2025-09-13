import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button onClick={handleDelete} type="button" className="card-action-btn flex justify-center items-center bg-red-500">
          {loading ? (
            <>
                <LoaderCircle className="h-4 w-4 animate-spin"/>
                Deleting...
            </>
          ) : (
            <span className="text-black">Delete</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
