import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  isSelect,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="text-[20px] text-slate-900 block mb-2">{label}</label>
      <div className="relative">
        {isSelect ? (
          <select 
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500 "
            value={value}
            onChange={(e) => onChange(e)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            value={value}
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-black leading-tight focus:outline-none focus:border-blue-500"
            onChange={(e) => onChange(e)}
          />
        )}

        {type === "password" && (
          <span className="absolute right-3 -top-1 bottom-4 translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <Eye size={20} onClick={togglePassword} />
            ) : (
              <EyeOff size={20} onClick={togglePassword} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
