import React from 'react';
import { Bell, Search } from 'lucide-react';

const AdminTopbar = () => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-black text-[#07111f]">
          Welcome Admin 👋
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Manage IPL Franchise System
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-4 py-3 rounded-2xl border border-slate-200 outline-none"
          />

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

        </div>

        <button className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Bell size={20} />
        </button>

      </div>

    </div>
  );
};

export default AdminTopbar;