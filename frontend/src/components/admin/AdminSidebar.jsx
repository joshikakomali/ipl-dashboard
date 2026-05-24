import React from 'react';
import {
  LayoutDashboard,
  Shield,
  Users,
  Trophy,
  BarChart3
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {

  const menu = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/admin'
    },
    {
      title: 'Teams',
      icon: <Shield size={20} />,
      path: '/admin/teams'
    },
    {
      title: 'Players',
      icon: <Users size={20} />,
      path: '/admin/players'
    },
    {
      title: 'Matches',
      icon: <Trophy size={20} />,
      path: '/admin/matches'
    },
    {
      title: 'Performance',
      icon: <BarChart3 size={20} />,
      path: '/admin/performance'
    },
    {
      title: 'Reports',
      icon: <BarChart3 size={20} />,
      path: '/admin/reports'
    }
  ];

  const userRole = localStorage.getItem('userRole');
  const filteredMenu = userRole === 'manager' 
    ? menu.filter(item => item.title === 'Teams' || item.title === 'Players')
    : menu;

  return (
    <div className="w-[260px] min-h-screen bg-[#07111f] text-white p-6">

      {/* Logo */}
      <div className="mb-10">

        <h1 className="text-2xl font-black text-yellow-400 uppercase">
          IPL {localStorage.getItem('userRole') || 'ADMIN'}
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Franchise Management
        </p>

      </div>

      {/* Menu */}
      <div className="space-y-3">

        {filteredMenu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-yellow-400 text-[#07111f] font-bold'
                  : 'text-slate-300 hover:bg-white/10'
              }`
            }
          >

            {item.icon}

            {item.title}

          </NavLink>

        ))}

      </div>

    </div>
  );
};

export default AdminSidebar;