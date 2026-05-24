import React, { useState } from 'react';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  Shield,
  CalendarDays,
  BarChart3,
  FileText,
  LogOut,
  Trophy,
  Menu,
  X,
  UserPlus,
  User
} from 'lucide-react';

const AdminLayout = () => {

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminMenu = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'Teams',
      path: '/admin/teams',
      icon: <Shield size={20} />
    },
    {
      name: 'Players',
      path: '/admin/players',
      icon: <Users size={20} />
    },
    {
      name: 'Matches',
      path: '/admin/matches',
      icon: <CalendarDays size={20} />
    },
    {
      name: 'Performance',
      path: '/admin/performance',
      icon: <BarChart3 size={20} />
    },
    {
      name: 'Reports',
      path: '/admin/reports',
      icon: <FileText size={20} />
    }
  ];

  const managerMenu = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'Team',
      path: '/admin/teams',
      icon: <Shield size={20} />
    },
    {
      name: 'Players',
      path: '/admin/players',
      icon: <Users size={20} />
    },
    {
      name: 'Add Player',
      path: '/admin/add-player',
      icon: <UserPlus size={20} />
    },
    {
      name: 'Profile',
      path: '/admin/profile',
      icon: <User size={20} />
    }
  ];

  const userRole = localStorage.getItem('userRole');
  const filteredMenu = userRole === 'manager' ? managerMenu : adminMenu;

  const handleLogout = () => {

    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isManager");
    localStorage.removeItem("userRole");

    navigate('/login');

  };

  return (

    <div className="h-screen w-full flex flex-col md:flex-row bg-[#f4f7fb] overflow-hidden">

      {/* Mobile Top Bar */}
      <div className="md:hidden flex-shrink-0 bg-[#07111f] text-white p-4 flex items-center justify-between z-40 shadow-md">
        <div className="flex items-center gap-3">
          <Trophy size={24} className="text-yellow-400" />
          <h1 className="font-black text-lg uppercase">
            IPL {localStorage.getItem('userRole') || 'ADMIN'}
          </h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-[280px] h-full flex-shrink-0 bg-[#07111f] text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out`}>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">

              <Trophy
                size={28}
                className="text-[#07111f]"
              />

            </div>

            <div>

              <h1 className="font-black text-xl uppercase">
                IPL {localStorage.getItem('userRole') || 'ADMIN'}
              </h1>

              <p className="text-xs text-slate-400">
                Franchise Management
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}
        <div className="flex-1 p-4 space-y-2">

          {filteredMenu.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-[#07111f] font-bold shadow-lg'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >

              {item.icon}

              {item.name}

            </NavLink>

          ))}

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 mt-auto">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-[0_4px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_4px_25px_rgba(225,29,72,0.5)] hover:-translate-y-1 transition-all duration-300 font-bold uppercase tracking-widest text-xs text-white"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto relative h-full">

        <Outlet />

      </div>

    </div>

  );

};

export default AdminLayout;