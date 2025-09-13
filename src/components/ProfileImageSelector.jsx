import { useRef, useState } from "react";
import { Plus, Trash, Upload, UserIcon } from "lucide-react";

const ProfileImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-teal-600 rounded-full relative">
          <UserIcon size={20} className="text-white" />

          <button
            className="w-20 h-20 flex items-center justify-center bg-blend-hue text-white rounded-full absolute opacity-5"
            onClick={onChooseFile}
          >
            <Upload size={15} />
          </button>
          <span className="w-8 h-8 items-center justify-center text-white absolute -bottom-2 -right-1"><Plus className="bg-blue-500 rounded-full"/></span>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover items-center justify-center bg-teal-600"
          />
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-600 text-black rounded-full absolute -bottom-2 -right-1"
            onClick={handleRemoveImage}
          >
            <Trash size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageSelector;
