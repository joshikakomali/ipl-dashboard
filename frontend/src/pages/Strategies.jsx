import React from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { Database, Search, Brain, Activity, Cog } from 'lucide-react';

const Strategies = () => {
  const { strategies } = dashboardData;

  return (
    <div className="space-y-10 py-4 md:py-10">
      <header className="rounded-[2rem] overflow-hidden shadow-2xl bg-[#0d2b4f] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] min-h-[420px]">
          <div className="p-6 md:p-10 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b4f] via-[#0b1f38] to-[#10335d]"></div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">Winning Framework</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-4">Strategies & Solutions</h2>
              <p className="text-white/75 text-base md:text-lg leading-relaxed">Successful IPL teams combine analytics, scouting, psychology, and structured decision-making around player roles and match-ups.</p>
            </div>
          </div>
          <div className="relative min-h-[180px] lg:min-h-full">
          <motion.div
  initial={{ scale: 1.02 }}
  animate={{ scale: 1 }}
  transition={{ duration: 10 }}
  className="absolute inset-0 bg-[url('/ipl-teams.jpg')] bg-contain bg-center bg-no-repeat opacity-90"
></motion.div>         
          <div className="absolute inset-0 bg-gradient-to-l from-[#0d2b4f] via-[#0d2b4f]/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center p-6 md:p-8">
              <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/10 p-5 max-w-xs text-center text-white">
                <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Auction Advantage</p>
                <p className="text-white/80 text-sm leading-relaxed">Role clarity, data models, and scouting create a sustainable winning structure.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

        <motion.div
          className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {strategies.map((strategy, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ 
              scale: 1.05,
              y: -8,
              rotate: 1
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-[1.6rem] p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center justify-center space-y-4 hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-lg">
              {idx === 0 ? <Database size={24} /> : idx === 1 ? <Search size={24} /> : idx === 2 ? <Brain size={24} /> : idx === 3 ? <Activity size={24} /> : <Cog size={24} />}
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{strategy}</h3>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-stretch">
        <div className="rounded-[2rem] bg-white border border-gray-100 shadow-xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">Decision Pillars</p>
          <h3 className="text-2xl md:text-3xl font-black text-brand-navy mb-4">How winning teams build</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Modern IPL teams succeed when they combine scouting, analytics, fitness management, and flexible tactical planning.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4"><p className="font-bold text-brand-navy">Balanced Auction</p><p className="text-sm text-slate-600 mt-1">Mix of stars, specialists, and low-risk value picks.</p></div>
            <div className="rounded-2xl bg-slate-50 border border-gray-100 p-4"><p className="font-bold text-brand-navy">Game Plans</p><p className="text-sm text-slate-600 mt-1">Match-ups and venue-specific tactics.</p></div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-[#081a3b] text-white relative min-h-[320px]">
          <div className="absolute inset-0 bg-[url('/ipl-teams.jpg')] bg-contain bg-no-repeat bg-center opacity-35"></div>          
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8 }}
          className="absolute inset-0 bg-[url('/ipl-teams.jpg')] bg-cover bg-center"
        ></motion.div>
          <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-end">
            <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-3"></p>
            <h3 className="text-2xl md:text-3xl font-black mb-3"></h3>
            <p className="text-white/75 leading-relaxed max-w-2xl"></p>
          </div>
        </div>
      </div>

      <section className="glass-shell rounded-[2rem] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">Top 3 Championship Playbooks</p>
            <h3 className="text-2xl md:text-3xl font-black text-brand-navy">CSK, MI, and RCB explained clearly</h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">Professional match strategy summary</div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {dashboardData.championPlaybooks.map((team) => (
            <motion.article
              key={team.short}
              whileHover={{
                y: -10,
                scale: 1.03
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group rounded-[1.6rem] overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-44 relative">
                <img src={team.image} alt={team.team} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a3b] via-[#081a3b]/40 to-transparent"></div>
                <div className="absolute inset-0 p-5 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">{team.short}</p>
                    <h4 className="text-xl font-black leading-tight">{team.team}</h4>
                  </div>
                  <img src={dashboardData.teams.find((entry) => entry.short === team.short)?.badge} alt={`${team.short} badge`} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 object-cover" />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h5 className="font-black text-brand-navy mb-3">{team.title}</h5>
                <p className="text-sm text-slate-600 leading-relaxed">{team.summary}</p>
                <div className="mt-4 rounded-full h-2 bg-slate-100 overflow-hidden"><div className="h-full w-full rounded-full" style={{ background: team.accent }}></div></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Strategies;