import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Legend } from "recharts";
import api from "../../api";
import { Users, Trophy, Flag, Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Reports = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, playersRes, matchesRes] = await Promise.all([
          api.get("/teams").catch(() => ({ data: [] })),
          api.get("/players").catch(() => ({ data: [] })),
          api.get("/matches").catch(() => ({ data: [] }))
        ]);

        setTeams(teamsRes.data || []);
        setPlayers(playersRes.data || []);
        setMatches(matchesRes.data || []);
      } catch (err) {
        console.error("Error fetching report data", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const teamWisePlayers = teams.map((team) => {
    const count = players.filter((player) => player.team === team.teamName).length;
    return { name: team.teamName, players: count };
  });

  const winnerStats = teams.map((team) => {
    const wins = matches.filter((match) => match.winner === team.teamName).length;
    return { name: team.teamName, wins };
  }).filter(t => t.wins > 0);

  const topPlayers = [...players].sort((a, b) => b.price - a.price).slice(0, 5).map(p => ({
    name: p.playerName,
    value: p.price
  }));

  const COLORS = ["#FFB703", "#023047", "#219EBC", "#8ECAE6", "#FB8500", "#8338EC", "#FF006E", "#3A86FF", "#00F5D4", "#00BBF9"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-yellow-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#07111f] to-[#1e293b] rounded-[32px] p-10 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black">Reports & Analytics</h1>
          <p className="text-slate-300 mt-2 text-lg">IPL Franchise Insights, Statistics & Live Distributions</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Franchises", value: teams.length, icon: <Flag size={24}/>, color: "from-blue-500 to-cyan-400" },
          { title: "Active Players", value: players.length, icon: <Users size={24}/>, color: "from-yellow-400 to-amber-500" },
          { title: "Total Matches", value: matches.length, icon: <Trophy size={24}/>, color: "from-pink-500 to-rose-400" },
          { title: "Avg Rating", value: "9.4", icon: <Activity size={24}/>, color: "from-emerald-400 to-green-500" }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition-shadow group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-400 font-semibold text-sm">{stat.title}</p>
              <h2 className="text-3xl font-black text-[#07111f] mt-1">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
        >
          <h2 className="text-xl font-bold text-[#07111f] mb-6 flex items-center gap-2">
            <Users className="text-blue-500" /> Player Distribution by Team
          </h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamWisePlayers}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{fill: "#64748B", fontSize: 10}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: "#64748B", fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: "#F1F5F9"}} contentStyle={{borderRadius: "16px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"}} />
                <Bar dataKey="players" fill="#3B82F6" radius={[6, 6, 0, 0]}>
                  {teamWisePlayers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
        >
          <h2 className="text-xl font-bold text-[#07111f] mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Match Winners Distribution
          </h2>
          {winnerStats.length > 0 ? (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winnerStats}
                    dataKey="wins"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    label={false}
                  >
                    {winnerStats.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: "16px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: "12px"}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-slate-400 font-semibold border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50">
              No Match Data Available
            </div>
          )}
        </motion.div>



        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-[#07111f] mb-6 flex items-center gap-2">
            <Activity className="text-rose-500" /> Top Valued Players (? Cr)
          </h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topPlayers}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{fill: "#64748B", fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: "#64748B", fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{borderRadius: "16px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"}} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Match Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-[#07111f] mb-6 flex items-center gap-2">
            <Activity className="text-purple-500" /> Recent Match Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold">Match</th>
                  <th className="py-4 px-6 font-semibold">Venue</th>
                  <th className="py-4 px-6 font-semibold">Winner</th>
                </tr>
              </thead>
              <tbody>
                {[...matches].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((match, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-600">{new Date(match.date).toLocaleDateString()}</td>
                    <td className="py-4 px-6 font-bold text-[#07111f]">{match.team1} vs {match.team2}</td>
                    <td className="py-4 px-6 text-slate-600">{match.venue}</td>
                    <td className="py-4 px-6">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                        {match.winner}
                      </span>
                    </td>
                  </tr>
                ))}
                {matches.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500">No match data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Reports;

