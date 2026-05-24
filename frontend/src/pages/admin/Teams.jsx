import React, { useEffect, useState } from 'react';
import api from '../../api';   // ✅ IMPORTANT
import toast from 'react-hot-toast';

import {
  Trash2,
  Shield,
  Plus
} from 'lucide-react';
import ManagerTeam from './ManagerTeam';

const Teams = () => {
  const userRole = localStorage.getItem('userRole');
  const managerEmail = localStorage.getItem('managerEmail');
  const [teamName, setTeamName] = useState('');
  const [owner, setOwner] = useState('');
  const [budget, setBudget] = useState('');
  const [teams, setTeams] = useState([]);

  // 🔥 GET TEAMS FROM BACKEND
  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (err) {
      console.log("Error fetching teams", err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // ➕ ADD TEAM (MongoDB)
  const handleAddTeam = async (e) => {
    e.preventDefault();

    try {
      await api.post('/teams', {
        teamName,
        owner,
        budget,
        managerEmail: userRole === 'manager' ? managerEmail : undefined
      });

      setTeamName('');
      setOwner('');
      setBudget('');

      fetchTeams(); // refresh
    } catch (err) {
      console.log("Error adding team", err);
    }
  };

  // ❌ DELETE TEAM (MongoDB)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    const tId = toast.loading('Deleting team...');
    try {
      await api.delete(`/teams/${id}`);
      fetchTeams();
      toast.success('Team deleted', { id: tId });
    } catch (err) {
      toast.error('Failed to delete team', { id: tId });
    }
  };

  if (userRole === 'manager') return <ManagerTeam />;

  const visibleTeams = userRole === 'manager' ? teams.filter(t => t.managerEmail === managerEmail) : teams;

  return (
    <div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#07111f]">
          Teams Management
        </h1>
        <p className="text-slate-500 mt-2">
          Add and Manage IPL Teams
        </p>
      </div>

      {/* FORM */}
      {userRole === 'manager' && visibleTeams.length === 0 && (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-10">

        <form
          onSubmit={handleAddTeam}
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >

          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-[#07111f] text-white rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Team
          </button>

        </form>
      </div>
      )}

      {/* TEAMS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {visibleTeams.map((team) => (
          <div
            key={team._id}   // ✅ MongoDB ID
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >

            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-5">
              <Shield size={30} className="text-[#07111f]" />
            </div>

            <h2 className="text-2xl font-black text-[#07111f]">
              {team.teamName}
            </h2>

            <p className="text-slate-500 mt-2">
              Owner: {team.owner}
            </p>

            <p className="text-slate-500 mt-1">
              Budget: ₹ {team.budget} Cr
            </p>

            {userRole === 'manager' && (
            <button
              onClick={() => handleDelete(team._id)}
              className="mt-6 px-5 py-3 rounded-2xl bg-red-100 text-red-600 font-semibold flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default Teams;