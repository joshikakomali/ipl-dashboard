import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const AddPlayer = () => {
  const managerEmail = localStorage.getItem('managerEmail');
  const [teamName, setTeamName] = useState('');
  
  const [formData, setFormData] = useState({
    playerName: '',
    role: 'Batsman',
    age: '',
    matches: '',
    runs: '',
    wickets: ''
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/teams');
        const myTeam = res.data.find(t => t.managerEmail === managerEmail);
        if (myTeam) {
          setTeamName(myTeam.teamName);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, [managerEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      toast.error("No team assigned to you.");
      return;
    }

    const tId = toast.loading('Adding player...');
    try {
      await api.post('/players', {
        ...formData,
        team: teamName
      });
      toast.success('Player added successfully', { id: tId });
      setFormData({ playerName: '', role: 'Batsman', age: '', matches: '', runs: '', wickets: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add player', { id: tId });
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b] p-8 md:p-12 text-white shadow-xl mb-10"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <UserPlus size={24} className="text-white" />
            </div>
            <div>
              <span className="text-emerald-400 font-bold uppercase text-xs">New Recruit</span>
              <h1 className="text-4xl font-black">Add New Player</h1>
            </div>
          </div>
          <p className="text-slate-400 text-lg">Add a new recruit to {teamName || 'your team'}</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-500 mb-2 block">Player Name</label>
            <input type="text" required placeholder="Enter full name" value={formData.playerName} onChange={e => setFormData({...formData, playerName: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Role</label>
              <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]">
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicket Keeper">Wicket Keeper</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Age</label>
              <input type="number" required placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Matches</label>
              <input type="number" placeholder="0" value={formData.matches} onChange={e => setFormData({...formData, matches: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Runs</label>
              <input type="number" placeholder="0" value={formData.runs} onChange={e => setFormData({...formData, runs: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Wickets</label>
              <input type="number" placeholder="0" value={formData.wickets} onChange={e => setFormData({...formData, wickets: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-[#07111f]" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-[#07111f] text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
            <UserPlus size={20} />
            Add Player
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPlayer;
