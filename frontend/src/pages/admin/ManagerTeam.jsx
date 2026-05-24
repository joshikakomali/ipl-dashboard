import React, { useEffect, useState } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Pencil, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ManagerTeam = () => {
  const managerEmail = localStorage.getItem('managerEmail');
  const [team, setTeam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, [managerEmail]);

  const fetchTeam = async () => {
    try {
      const res = await api.get('/teams');
      const myTeam = res.data.find(t => t.managerEmail === managerEmail);
      if (myTeam) {
        setTeam(myTeam);
        setFormData(myTeam);
      }
    } catch (err) {
      console.error("Failed to fetch team", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const tId = toast.loading('Updating team...');
    try {
      let finalLogoUrl = formData.logoUrl;
      
      if (logoFile) {
        const uploadData = new FormData();
        uploadData.append("logo", logoFile);
        const uploadRes = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalLogoUrl = uploadRes.data.url;
      }

      await api.put(`/teams/${team._id}`, { ...formData, logoUrl: finalLogoUrl });
      toast.success('Team updated successfully', { id: tId });
      setIsEditing(false);
      fetchTeam();
    } catch (err) {
      console.error("Failed to update team", err);
      toast.error('Failed to update team', { id: tId });
    }
  };

  if (!team) return <div className="p-8 text-center text-slate-500">No team assigned.</div>;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b] p-8 md:p-12 text-white shadow-xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/20 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center">
              <Shield size={24} className="text-[#07111f]" />
            </div>
            <div>
              <span className="text-amber-400 font-bold uppercase text-xs">Franchise Control</span>
              <h1 className="text-4xl font-black">My Team</h1>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="relative z-10 flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-[#07111f] font-black hover:bg-slate-200 transition shadow-xl hover:scale-105"
        >
          <Pencil size={18} />
          Edit Team
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center"
      >
        <div className="flex-shrink-0">
          {team.logoUrl ? (
            <img src={team.logoUrl} alt="Team Logo" className="w-64 h-64 object-contain rounded-2xl" />
          ) : (
            <div className="w-64 h-64 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Shield size={80} />
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-6">
          <div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Team Name</p>
            <h2 className="text-3xl font-black text-[#07111f]">{team.teamName}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Captain</p>
              <p className="text-lg font-bold text-[#07111f]">{team.captain || 'Not assigned'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Coach</p>
              <p className="text-lg font-bold text-[#07111f]">{team.coach || 'Not assigned'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl col-span-2">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Home Ground</p>
              <p className="text-lg font-bold text-[#07111f]">{team.homeGround || 'Not assigned'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-black text-[#07111f] mb-6">Edit Team Details</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Team Name</label>
                <input type="text" value={formData.teamName} readOnly className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Captain</label>
                <input type="text" value={formData.captain || ''} onChange={e => setFormData({...formData, captain: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Coach</label>
                <input type="text" value={formData.coach || ''} onChange={e => setFormData({...formData, coach: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Home Ground</label>
                <input type="text" value={formData.homeGround || ''} onChange={e => setFormData({...formData, homeGround: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f]" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Team Logo (Upload Image)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setLogoFile(e.target.files[0])} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#07111f] bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#07111f] file:text-white hover:file:bg-slate-800" 
                />
                {formData.logoUrl && !logoFile && <p className="text-xs text-slate-400 mt-2">Leave empty to keep current logo.</p>}
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

export default ManagerTeam;
