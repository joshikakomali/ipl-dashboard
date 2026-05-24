import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../api';

import {
  Users,
  Trophy,
  Shield,
  BarChart3,
  PlusCircle,
  Activity,
  Database,
  ClipboardList,
  Trash2
} from 'lucide-react';

import { motion } from 'framer-motion';
import ManagerDashboard from './ManagerDashboard';

const cards = [
  {
    title: "Manage Teams",
    icon: <Trophy size={28} />,
    desc: "Add and manage IPL franchise teams",
    color: "from-yellow-400 to-amber-500",
    path: "/admin/teams"
  },
  {
    title: "Manage Players",
    icon: <Users size={28} />,
    desc: "Add player information and auction details",
    color: "from-blue-500 to-cyan-500",
    path: "/admin/players"
  },
  {
    title: "Match Management",
    icon: <ClipboardList size={28} />,
    desc: "Create and update match details",
    color: "from-pink-500 to-rose-500",
    path: "/admin/matches"
  },
  {
    title: "Performance Stats",
    icon: <Activity size={28} />,
    desc: "Update runs, wickets and strike rates",
    color: "from-green-500 to-emerald-500",
    path: "/admin/performance"
  },
  {
    title: "Analytics",
    icon: <BarChart3 size={28} />,
    desc: "View charts and franchise insights",
    color: "from-violet-500 to-purple-500",
    path: "/admin/reports"
  },
  {
    title: "Database Control",
    icon: <Database size={28} />,
    desc: "Manage IPL system data securely",
    color: "from-orange-500 to-red-500",
    path: "/admin/reports"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, loggedInUsers: 0 });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Admin');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const userRole = localStorage.getItem('userRole');

  const fetchUsersData = async () => {
    try {
      const statsRes = await api.get("/users/stats");
      setStats(statsRes.data);

      const usersRes = await api.get("/users/all");
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  useEffect(() => {
    if (userRole === 'admin') {
      fetchUsersData();
    }
  }, [userRole]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Adding user...');
    try {
      await api.post('/users/register', newUser);
      await fetchUsersData();
      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      toast.success("User added successfully", { id: loadingToast });
    } catch (err) {
      console.error("Failed to add user", err);
      toast.error(err.response?.data?.message || "Failed to add user", { id: loadingToast });
    }
  };

  const handleRemoveUser = async (userId) => {
    if (window.confirm("Are you sure you want to permanently remove this user?")) {
      const loadingToast = toast.loading('Removing user...');
      try {
        await api.delete(`/users/${userId}`);
        await fetchUsersData();
        toast.success("User removed successfully", { id: loadingToast });
      } catch (err) {
        console.error("Failed to remove user", err);
        toast.error("Failed to remove user", { id: loadingToast });
      }
    }
  };

  if (userRole === 'manager') {
    return <ManagerDashboard />;
  }

  return (

    <div className="min-h-screen">
      <Toaster position="top-right" />

      {/* Hero */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.7
        }}
        className="relative overflow-hidden rounded-[36px]
        bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b]
        p-8 md:p-12 text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
      >

        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)]">

                <Shield
                  size={32}
                  className="text-[#07111f]"
                />

              </div>

              <div>

                <p className="uppercase tracking-[0.3em] text-yellow-400 text-xs font-bold">
                  Admin Control Panel
                </p>

                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                  IPL Franchise
                  <br />
                  Dashboard
                </h1>

              </div>

            </div>

            <p className="text-slate-300 max-w-2xl leading-relaxed text-sm md:text-base">

              Manage teams, players, match records,
              analytics and operational strategies
              of IPL franchises through a centralized
              administrative dashboard.

            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 min-w-[140px]">
              <h2 className="text-3xl font-black text-yellow-400">
                10+
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                IPL Teams
              </p>
            </div>

            {userRole === 'admin' && (
              <>
                <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 min-w-[140px]">
                  <h2 className="text-3xl font-black text-cyan-400">
                    {stats.totalUsers}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Total Users
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 min-w-[140px]">
                  <h2 className="text-3xl font-black text-pink-400">
                    74
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Matches
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 min-w-[140px]">
                  <h2 className="text-3xl font-black text-green-400">
                    {stats.loggedInUsers}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Logged In Users
                  </p>
                </div>
              </>
            )}

          </div>

        </div>

      </motion.div>

      {/* Section */}
      <div className="mt-10">

        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="text-yellow-600 font-bold tracking-[0.25em] text-xs uppercase">
              {userRole === 'manager' ? 'Manager Modules' : 'Admin Modules'}
            </p>

            <h2 className="text-3xl font-black text-[#07111f] mt-2">
              System Management
            </h2>

          </div>

          {userRole === 'admin' && (
            <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#07111f] text-white font-semibold shadow-lg hover:scale-105 transition">

              <PlusCircle size={18} />

              Add New User

            </button>
          )}

        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-[#07111f]">Add New User</h2>
                <button onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <input type="text" placeholder="Name" required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
                <input type="email" placeholder="Email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
                <input type="password" placeholder="Password" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]">
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full py-4 rounded-2xl bg-[#07111f] text-white font-bold shadow-lg hover:bg-slate-800 transition">Create User</button>
              </form>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          {(userRole === 'manager' ? cards.filter(c => c.title === 'Manage Teams' || c.title === 'Manage Players' || c.title === 'Match Management' || c.title === 'Performance Stats') : cards).map((card, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              whileHover={{
                y: -8
              }}
              className="relative overflow-hidden rounded-[30px]
              bg-white border border-slate-200 p-7
              shadow-[0_15px_45px_rgba(15,23,42,0.08)]"
            >

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color}
              flex items-center justify-center text-white shadow-lg`}>

                {card.icon}

              </div>

              <h3 className="mt-6 text-2xl font-black text-[#07111f]">
                {card.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                {card.desc}
              </p>

              <button 
                onClick={() => navigate(card.path)}
                className="mt-6 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-[#07111f] hover:text-white transition-all font-semibold text-sm">
                Open Module
              </button>

            </motion.div>

          ))}

        </div>

        {/* User Details Table */}
        {userRole === 'admin' && (
        <div className="mt-12 bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-[#07111f]">{activeTab} Details</h2>
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
              {['Admin', 'Manager', 'User'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-[#07111f] text-white shadow-md scale-105' 
                      : 'text-slate-500 hover:text-[#07111f] hover:bg-slate-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="py-4 px-6 font-semibold">Name</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 font-semibold">Role</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.role === activeTab.toLowerCase()).map((user) => (
                  <tr key={user._id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-all duration-200 group">
                    <td className="py-4 px-6 font-bold text-[#07111f]">{user.name}</td>
                    <td className="py-4 px-6 text-slate-500">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.isLoggedIn ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                        <span className={`text-sm font-bold ${
                          user.isLoggedIn ? 'text-green-600' : 'text-slate-500'
                        }`}>
                          {user.isLoggedIn ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="text-sm font-bold px-4 py-2 rounded-xl transition-all text-red-500 bg-red-50 hover:bg-red-500 hover:text-white shadow-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {users.filter(u => u.role === activeTab.toLowerCase()).length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 font-semibold bg-slate-50/50 rounded-2xl">
                      No users found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

      </div>

    </div>
  );

};

export default AdminDashboard;