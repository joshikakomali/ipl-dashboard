
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { CalendarDays, Trophy, Users } from 'lucide-react';

const Analytics = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

const playerImages = {
  "V. Kohli": "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png",
  "S. Dhawan": "https://documents.iplt20.com/ipl/IPLHeadshot2024/11.png",
  "D. Warner": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2UoIz9RctCjtDw0iTDr9W8lq_jMqGo0JpQ&s",
  "Suresh Raina": "https://documents.iplt20.com/playerheadshot/ipl/284/14.png",
  "AB de Villiers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQHTirc6fiC7nNEhMJOx7C9LC_GTnzTUR7A&s",
  "KL Rahul": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR35x3IhBpmub2InhqC_c0Lv5UChI3wxcoZSg&s",
  "Sanju Samson": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtJZoR5UFNDhnCcM-OovjT7XXW94oKxAUwA&s",
  "Hardik Pandya": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEheY6ovJi7CSNpP_rrTvhoUqB25kX1sGbg&s",
  "Abhishek Sharma": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_q7-QicVuZmlirFd7sA4tocuSYxxGKQCuw&s"
};
  const { scorecards, pieData, barData, topPlayers } = dashboardData.analytics;
  const topWinners = dashboardData.winners.slice(-8).reverse();

  return (
<motion.div
  className="space-y-10 pb-10 py-4 md:py-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>      <header className="rounded-[2rem] overflow-hidden bg-[#081a3b] text-white p-6 md:p-8 shadow-2xl relative">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">Insights & Trends</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Analytics & Insights</h2>
            <p className="text-white/70 mt-3 max-w-3xl">A responsive analytics view covering team wins, run rates, player impact, and recent champion patterns.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center"><CalendarDays className="mx-auto mb-2 text-brand-gold" /><p className="text-xs uppercase tracking-[0.3em] text-white/60">Seasons</p><p className="font-black text-xl">18</p></div>
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center"><Trophy className="mx-auto mb-2 text-brand-gold" /><p className="text-xs uppercase tracking-[0.3em] text-white/60">Finals</p><p className="font-black text-xl">18</p></div>
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center"><Users className="mx-auto mb-2 text-brand-gold" /><p className="text-xs uppercase tracking-[0.3em] text-white/60">Teams</p><p className="font-black text-xl">10</p></div>
          </div>
        </div>
      </header>

      {/* Top Row: Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scorecards.map((score, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white text-brand-navy rounded-[1.75rem]"          >
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
            <p className="text-brand-gold font-bold text-xs md:text-sm tracking-[0.35em] mb-2 uppercase">{score.label}</p>
            <h3 className="text-4xl md:text-5xl font-black">{score.value}</h3>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-brand-navy to-brand-gold"></div>
          </motion.div>
        ))}
      </div>

      {/* Middle Row: Charts */}
      <motion.div
  className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
        
        {/* Pie Chart */}
        <div className="bg-white p-6 md:p-8 rounded-[1.75rem] shadow-xl border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-xl font-black text-brand-navy mb-6 uppercase tracking-[0.18em]">Match Results Distribution</h3>
          <div className="flex-1 min-h-[280px] md:min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
             {pieData.map((entry, idx) => (
               <div key={idx} className="flex items-center space-x-2 rounded-full bg-slate-50 px-3 py-2">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                 <span className="text-sm font-medium text-gray-600">{entry.name} ({entry.value}%)</span>
               </div>
             ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 md:p-8 rounded-[1.75rem] shadow-xl border border-gray-100 flex flex-col min-w-0">
          <h3 className="text-xl font-black text-brand-navy mb-6 uppercase tracking-[0.18em]">Top Performing Teams (Wins)</h3>
          <div className="flex-1 min-h-[280px] md:min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="wins" fill="#0B192C" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <motion.section
  className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
        <div className="rounded-[1.75rem] bg-white border border-gray-100 shadow-xl p-6 md:p-8">
          <h3 className="text-2xl font-black text-brand-navy mb-6 uppercase tracking-[0.16em]">Recent Champions</h3>
          <div className="space-y-4">
            {topWinners.map((item) => (
              <motion.div
              key={item.year}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="font-black text-brand-navy text-lg">{item.year} - {item.winner}</p>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Winner</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.strategy}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-[#081a3b] text-white shadow-2xl p-6 md:p-8 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">Top Players Table</p>
            <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase">Runs, average, and strike rate</h3>
            <motion.div
              className="overflow-x-auto rounded-2xl border border-white/10"
              initial={{ x: 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              >              
              <table className="w-full text-left text-white border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-white/10 text-xs uppercase tracking-[0.2em] text-white/70">
                    <th className="py-4 px-4 font-bold">Player</th>
                    <th className="py-4 px-4 font-bold">Matches</th>
                    <th className="py-4 px-4 font-bold">Runs</th>
                    <th className="py-4 px-4 font-bold">Average</th>
                    <th className="py-4 px-4 font-bold">Strike Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {topPlayers.map((player) => (
                <motion.tr
                key={player.name}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                  className="hover:bg-white/5"
                  >                    
                  <td
                      onClick={() => setSelectedPlayer(player)}
                      className="py-4 px-4 font-bold text-brand-gold cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_gold] transition duration-300"                      >
                      {player.name}
                    </td>                      
                    <td className="py-4 px-4">{player.matches}</td>
                      <td className="py-4 px-4 text-lg font-semibold">{player.runs}</td>
                      <td className="py-4 px-4">{player.average}</td>
                      <td className="py-4 px-4">{player.strikeRate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {selectedPlayer && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                <div className="mt-6 flex flex-col items-center text-center">
    
                <img
                  src={playerImages[selectedPlayer.name]}
                  alt={selectedPlayer.name}
                  className="w-40 h-40 object-cover rounded-3xl border-4 border-brand-gold shadow-2xl"
                />
                <h3 className="mt-4 text-2xl font-black text-brand-gold">
                  {selectedPlayer.name}
                </h3>

                <p className="text-white/70 mt-2">
                  Matches: {selectedPlayer.matches} | Runs: {selectedPlayer.runs}
                </p>

                  </div>
              </motion.div>
                )}
            </motion.div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default Analytics;