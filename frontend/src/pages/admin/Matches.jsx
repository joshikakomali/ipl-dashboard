import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api';

import {
  Trophy,
  Plus,
  Trash2,
  MapPin,
  CalendarDays
} from 'lucide-react';

const Matches = () => {
  const userRole = localStorage.getItem('userRole');
  const [team1, setTeam1] = useState('');

  const [team2, setTeam2] = useState('');

  const [winner, setWinner] = useState('');

  const [venue, setVenue] = useState('');

  const [date, setDate] = useState('');

  const [matches, setMatches] = useState([]);

  const [teams, setTeams] = useState([]);

  const fetchMatches = async () => {
    try {
      const res = await api.get('/matches');
      setMatches(res.data);
    } catch (err) {
      console.log('Error fetching matches', err);
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
    fetchMatches();
    fetchTeams();
  }, []);

  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (team1 === team2) {
      toast.error("Both teams cannot be the same!");
      return;
    }

    const tId = toast.loading('Adding match...');
    try {
      await api.post('/matches', {
        team1,
        team2,
        winner,
        venue,
        date
      });

      setTeam1('');
      setTeam2('');
      setWinner('');
      setVenue('');
      setDate('');
      fetchMatches();
      toast.success('Match added successfully', { id: tId });
    } catch (err) {
      console.log('Error adding match', err);
      toast.error('Failed to add match', { id: tId });
    }
  };

  const deleteMatch = async (id) => {
    if(!window.confirm("Are you sure you want to delete this match?")) return;
    const tId = toast.loading('Deleting match...');
    try {
      await api.delete(`/matches/${id}`);
      fetchMatches();
      toast.success('Match deleted', { id: tId });
    } catch (err) {
      console.log('Error deleting match', err);
      toast.error('Failed to delete match', { id: tId });
    }
  };

  return (

    <div>
      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-black text-[#07111f]">
          Matches Management
        </h1>

        <p className="text-slate-500 mt-2">
          Add and Manage IPL Matches
        </p>

      </div>

      {/* Form */}
      {userRole === 'admin' && (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-10">

        <form
          onSubmit={handleAddMatch}
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5"
        >

          {/* Team 1 */}
          <select
            value={team1}
            onChange={(e) =>
              setTeam1(e.target.value)
            }
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          >

            <option value="">
              Team 1
            </option>
            <option>Chennai Super Kings</option>
            <option>Mumbai Indians</option>
            <option>Kolkata Knight Riders</option>
            <option>Royal Challengers Bengaluru</option>
            <option>Lucknow Super Giants</option>
            <option>Punjab Kings</option>
            <option>Rajasthan Royals</option>
            <option>Sunrisers Hyderabad</option>
            <option>Gujarat Titans</option>
            <option>Delhi Capitals</option>
          </select>

          {/* Team 2 */}
          <select
            value={team2}
            onChange={(e) =>
              setTeam2(e.target.value)
            }
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          >
            <option value="">
              Team 2
            </option>
            <option>Chennai Super Kings</option>
            <option>Mumbai Indians</option>
            <option>Kolkata Knight Riders</option>
            <option>Royal Challengers Bengaluru</option>
            <option>Lucknow Super Giants</option>
            <option>Punjab Kings</option>
            <option>Rajasthan Royals</option>
            <option>Sunrisers Hyderabad</option>
            <option>Gujarat Titans</option>
            <option>Delhi Capitals</option>
          </select>

          <select
            value={winner}
            onChange={(e) =>
              setWinner(e.target.value)
            }
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          >
            <option value="">
              Winner
            </option>
            {team1 && <option value={team1}>{team1}</option>}
            {team2 && <option value={team2}>{team2}</option>}
          </select>

          {/* Venue */}
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-[#07111f] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a2b42] transition-colors"
          >

            <Plus size={18} />

            Add Match

          </button>

        </form>

      </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {matches.map((match) => (
          <div
            key={match._id || match.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group"
          >

            {/* Winner Badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 px-4 py-1.5 rounded-bl-2xl font-bold text-xs shadow-md">
              Winner: {match.winner}
            </div>

            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="flex-1 text-center bg-slate-50 py-3 rounded-2xl border border-slate-100 font-bold text-[#07111f]">
                {match.team1}
              </div>
              <div className="text-slate-400 font-black text-xl">VS</div>
              <div className="flex-1 text-center bg-slate-50 py-3 rounded-2xl border border-slate-100 font-bold text-[#07111f]">
                {match.team2}
              </div>
            </div>

            <div className="space-y-3 mt-4 text-sm text-slate-600">

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-700">{match.venue}</span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-700">
                  {new Date(match.date).toLocaleDateString()}
                </span>
              </div>

            </div>

            {userRole === 'admin' && (
            <button
              onClick={() => deleteMatch(match._id || match.id)}
              className="mt-6 w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
              <Trash2 size={18} />
              Delete Match
            </button>
            )}

          </div>
        ))}
        {matches.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-dashed border-slate-200">
            No matches added yet. Add a new match above.
          </div>
        )}
      </div>

    </div>
  );
};

export default Matches;