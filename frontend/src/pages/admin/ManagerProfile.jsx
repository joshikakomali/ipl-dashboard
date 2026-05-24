import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ManagerProfile = () => {
  const managerEmail = localStorage.getItem('managerEmail');
  const [managerInfo, setManagerInfo] = useState({ name: '', email: '' });
  const [teamName, setTeamName] = useState('Not Assigned');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get('/users/all');
        const user = usersRes.data.find(u => u.email === managerEmail);
        if (user) setManagerInfo({ name: user.name, email: user.email, _id: user._id });

        const teamsRes = await api.get('/teams');
        const team = teamsRes.data.find(t => t.managerEmail === managerEmail);
        if (team) setTeamName(team.teamName);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [managerEmail]);

  const handleUpdate = async () => {
    // We would need a route to update user profile. Assuming it's simple or just a toast placeholder.
    toast.success("Profile update requested (mock)");
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b] p-8 md:p-12 text-white shadow-xl mb-10"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <span className="text-purple-400 font-bold uppercase text-xs">Account Settings</span>
              <h1 className="text-4xl font-black">My Profile</h1>
            </div>
          </div>
          <p className="text-slate-400 text-lg">Manage your personal manager account details.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 max-w-xl mx-auto"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-black text-[#07111f]">{managerInfo.name || 'Loading...'}</h2>
          <p className="text-slate-500 font-semibold">{managerInfo.email}</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-4">
            <Shield className="text-slate-400" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Team Assigned</p>
              <p className="font-bold text-[#07111f]">{teamName}</p>
            </div>
          </div>
        </div>

        <button onClick={handleUpdate} className="mt-8 w-full py-4 rounded-2xl bg-[#07111f] text-white font-bold hover:bg-slate-800 transition">
          Update Profile
        </button>
      </motion.div>
    </div>
  );
};

export default ManagerProfile;
