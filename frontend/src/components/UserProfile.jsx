import React from 'react';

import {
  UserCircle2,
  LogOut
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    navigate('/login');
  };

  if (!user) return null;

  return (

    <div className="flex items-center gap-4">

      {/* User Info */}
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">

        <UserCircle2
          size={28}
          className="text-[#07111f]"
        />

        <div>

          <h3 className="text-sm font-bold text-[#07111f]">
            {user.name}
          </h3>

          <p className="text-xs text-slate-500">
            IPL Viewer
          </p>

        </div>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-11 h-11 rounded-2xl bg-[#07111f] text-white flex items-center justify-center hover:scale-105 transition"
      >

        <LogOut size={18} />

      </button>

    </div>
  );
};

export default UserProfile;