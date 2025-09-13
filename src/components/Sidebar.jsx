import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDEBAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImage ? (
          <img
            src={user?.profileImage || ""}
            alt="profile image"
            className="w-20 h-20 bg-slate-300 rounded-full"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-500 font-medium leading-6">
          {user.firstName} {user.lastName}
        </h5>
      </div>
      {/* Sidebar content menu */}
      {SIDEBAR_DATA.map((item, index) => (
        <button
          onClick={() => navigate(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer hover:bg-slate-500 ${activeMenu == item.label ? "bg-slate-500" : ""}`}
          key={`menu_${index}`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
