import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../api';

import {
  User,
  Plus,
  Trash2
} from 'lucide-react';
import ManagerPlayers from './ManagerPlayers';

const Players = () => {
  const userRole = localStorage.getItem('userRole');
  const managerEmail = localStorage.getItem('managerEmail');
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState('');
  const [team, setTeam] = useState('');
  const [price, setPrice] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filterTeam, setFilterTeam] = useState('');

  const fetchPlayers = async () => {
    try {
      const res = await api.get('/players');
      setPlayers(res.data);
    } catch (err) {
      console.log('Error fetching players', err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (err) {
      console.log('Error fetching teams', err);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const tId = toast.loading('Adding player...');
    try {
      await api.post('/players', {
        playerName: playerName,
        role,
        team: userRole === 'manager' ? managerTeam.teamName : team,
        price
      });

      setPlayerName('');
      setRole('');
      setTeam('');
      setPrice('');
      fetchPlayers();
      toast.success('Player added successfully', { id: tId });
    } catch (err) {
      console.log('Error adding player', err);
      toast.error('Failed to add player', { id: tId });
    }
  };

  const deletePlayer = async (id) => {
    if(!window.confirm("Are you sure you want to delete this player?")) return;
    const tId = toast.loading('Deleting player...');
    try {
      await api.delete(`/players/${id}`);
      fetchPlayers();
      toast.success('Player deleted', { id: tId });
    } catch (err) {
      console.log('Error deleting player', err);
      toast.error('Failed to delete player', { id: tId });
    }
  };

  if (userRole === 'manager') return <ManagerPlayers />;

  const managerTeam = teams.find(t => t.managerEmail === managerEmail);
  const visiblePlayers = userRole === 'manager' && managerTeam 
    ? players.filter(p => p.team === managerTeam.teamName) 
    : userRole === 'admin' 
    ? players 
    : [];

  const filteredPlayers = filterTeam 
    ? visiblePlayers.filter(p => p.team === filterTeam)
    : visiblePlayers;

  return (
    <div>
      <Toaster position="top-right" />
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#07111f]">
          Players Management
        </h1>
        <p className="text-slate-500 mt-2">
          Add and Manage IPL Players
        </p>
      </div>

      {/* Form */}
      {userRole === 'manager' && managerTeam && (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-10">
        <form
          onSubmit={handleAddPlayer}
          className="grid grid-cols-1 md:grid-cols-5 gap-5"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          >
            <option value="">Select Role</option>
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All Rounder</option>
            <option>Wicket Keeper</option>
          </select>

          {/* Team */}
          {userRole === 'manager' ? (
            <div className="px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center text-slate-500">
              {managerTeam ? managerTeam.teamName : 'No team created'}
            </div>
          ) : (
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
              required
            >
              <option value="">Select Team</option>
              {teams.map((t) => (
                <option key={t._id} value={t.teamName}>
                  {t.teamName}
                </option>
              ))}
            </select>
          )}

          {/* Price */}
          <input
            type="number"
            step="0.01"
            placeholder="Price (₹ Cr)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-[#07111f] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a2b42] transition-colors"
          >
            <Plus size={18} />
            Add Player
          </button>
        </form>
      </div>
      )}

      {/* Filter Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#07111f]">Filter by Team</h2>
        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t._id} value={t.teamName}>
              {t.teamName}
            </option>
          ))}
        </select>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player._id || player.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-5">
              <User size={30} className="text-[#07111f]" />
            </div>

            {/* Details */}
            <h2 className="text-2xl font-black text-[#07111f]">
              {player.playerName || player.name}
            </h2>
            <p className="text-slate-500 mt-2">Role: {player.role}</p>
            <p className="text-slate-500 mt-1">Team: {player.team}</p>
            <p className="text-slate-500 mt-1">Price: ₹ {player.price} Cr</p>

            {/* Delete */}
            {userRole === 'manager' && (
            <button
              onClick={() => deletePlayer(player._id || player.id)}
              className="mt-6 px-5 py-3 rounded-2xl bg-red-50 text-red-600 font-semibold flex items-center gap-2 hover:bg-red-100 transition-colors w-full justify-center"
            >
              <Trash2 size={18} />
              Delete
            </button>
            )}
          </div>
        ))}
        {filteredPlayers.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-dashed border-slate-200">
            No players found. Add a player above or adjust your filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;