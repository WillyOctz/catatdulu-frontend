import { Image, X } from "lucide-react";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 items-center justify-center flex text-2xl bg-gray-200 text-white rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <Image className="w-8 h-8"/>
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            className="w-7 h-7 items-center justify-center bg-white border border-gray-300 rounded-full absolute -top-5 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X/>
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
