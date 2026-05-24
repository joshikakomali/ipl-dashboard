import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Users, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const ManagerDashboard = () => {
  const managerEmail = localStorage.getItem('managerEmail');
  const [team, setTeam] = useState(null);
  const [playersCount, setPlayersCount] = useState(0);
  const [matchesWon, setMatchesWon] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsRes = await api.get('/teams');
        const myTeam = teamsRes.data.find(t => t.managerEmail === managerEmail);
        
        if (myTeam) {
          setTeam(myTeam);
          
          const playersRes = await api.get('/players');
          const myPlayers = playersRes.data.filter(p => p.team === myTeam.teamName);
          setPlayersCount(myPlayers.length);

          const matchesRes = await api.get('/matches');
          const wins = matchesRes.data.filter(m => m.winner === myTeam.teamName).length;
          setMatchesWon(wins);
        }
      } catch (err) {
        console.error("Failed to fetch manager data", err);
      }
    };
    fetchData();
  }, [managerEmail]);

  return (
    <div className="p-8">
      {/* Hero Welcome Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#1e293b] p-8 md:p-12 text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)] mb-10"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                <Shield size={32} className="text-[#07111f]" />
              </div>
              <div>
                <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs">Manager Dashboard</span>
                <h1 className="text-4xl md:text-5xl font-black mt-1">Welcome!</h1>
              </div>
            </div>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Manage your team and players here. Overview of your total strength and match wins.
            </p>
          </div>
          {team?.logoUrl && (
            <div className="hidden md:block">
              <img src={team.logoUrl} alt="Team Logo" className="w-32 h-32 object-contain drop-shadow-2xl" />
            </div>
          )}
        </div>
      </motion.div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Total Players', value: playersCount, icon: <Users size={28}/>, color: 'from-blue-400 to-blue-600' },
          { title: 'Team Name', value: team ? team.teamName : 'No Team', icon: <Shield size={28}/>, color: 'from-amber-400 to-orange-500' },
          { title: 'Matches Won', value: matchesWon, icon: <Trophy size={28}/>, color: 'from-green-400 to-emerald-600' }
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-shadow group"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">{card.title}</p>
              <h3 className="text-3xl font-black text-[#07111f]">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
};

export default ManagerDashboard;
