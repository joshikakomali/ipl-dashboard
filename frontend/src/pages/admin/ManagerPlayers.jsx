import React, { useEffect, useState } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Search, Plus, Pencil, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ManagerPlayers = () => {
  const navigate = useNavigate();
  const managerEmail = localStorage.getItem('managerEmail');
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [teamName, setTeamName] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsRes = await api.get('/teams');
        const myTeam = teamsRes.data.find(t => t.managerEmail === managerEmail);
        if (myTeam) {
          setTeamName(myTeam.teamName);
          fetchPlayers(myTeam.teamName);
        }
      } catch (err) {
        console.error("Error", err);
      }
    };
    fetchData();
  }, [managerEmail]);

  const fetchPlayers = async (team) => {
    try {
      const res = await api.get('/players');
      setPlayers(res.data.filter(p => p.team === team));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this player?")) return;
    const tId = toast.loading("Deleting...");
    try {
      await api.delete(`/players/${id}`);
      fetchPlayers(teamName);
      toast.success("Player deleted", { id: tId });
    } catch (err) {
      toast.error("Failed to delete", { id: tId });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const tId = toast.loading("Updating...");
    try {
      await api.put(`/players/${editingPlayer._id}`, editingPlayer);
      fetchPlayers(teamName);
      setIsEditing(false);
      toast.success("Player updated", { id: tId });
    } catch (err) {
      toast.error("Update failed", { id: tId });
    }
  };

  const filteredPlayers = players.filter(p => p.playerName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b] p-8 md:p-12 text-white shadow-xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <span className="text-blue-400 font-bold uppercase text-xs">Roster Control</span>
              <h1 className="text-4xl font-black">My Players</h1>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search players..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
            />
          </div>
          <button 
            onClick={() => navigate('/admin/add-player')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#07111f] font-black hover:bg-slate-200 transition shadow-xl hover:scale-105 whitespace-nowrap"
          >
            <Plus size={18} />
            Add Player
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-4 px-6 font-semibold">Player</th>
                <th className="py-4 px-6 font-semibold">Role</th>
                <th className="py-4 px-6 font-semibold">Age</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player._id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-[#07111f]">{player.playerName}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
                      {player.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-semibold">{player.age || '-'}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => { setEditingPlayer(player); setIsEditing(true); }}
                        className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-[#07111f] hover:text-white transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(player._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPlayers.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">No players found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-black text-[#07111f] mb-6">Edit Player</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Player Name</label>
                <input type="text" required value={editingPlayer.playerName} onChange={e => setEditingPlayer({...editingPlayer, playerName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-500 mb-1 block">Role</label>
                  <select required value={editingPlayer.role} onChange={e => setEditingPlayer({...editingPlayer, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]">
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicket Keeper">Wicket Keeper</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-500 mb-1 block">Age</label>
                  <input type="number" required value={editingPlayer.age || ''} onChange={e => setEditingPlayer({...editingPlayer, age: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-500 mb-1 block">Matches</label>
                  <input type="number" value={editingPlayer.matches || ''} onChange={e => setEditingPlayer({...editingPlayer, matches: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-500 mb-1 block">Runs</label>
                  <input type="number" value={editingPlayer.runs || ''} onChange={e => setEditingPlayer({...editingPlayer, runs: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-500 mb-1 block">Wickets</label>
                  <input type="number" value={editingPlayer.wickets || ''} onChange={e => setEditingPlayer({...editingPlayer, wickets: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#07111f] text-white font-bold hover:bg-slate-800 transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPlayers;
