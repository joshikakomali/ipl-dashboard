import React from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Shield, Users, Flag } from 'lucide-react';

const ProblemStatement = () => {
  const { paradox } = dashboardData;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 py-4 md:py-10"
    >
      <motion.header
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100"
>
        <div className="bg-[#081a3b] text-white text-center py-5 px-6 md:px-8">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-[0.18em]">{paradox.title}</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 p-5 md:p-8 items-stretch relative">
          <div className="hidden xl:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center justify-center">
            <div className="bg-brand-navy text-white rounded-full w-14 h-14 flex items-center justify-center font-black border-[6px] border-white shadow-xl">VS</div>
          </div>

          <motion.div
  initial={{ opacity: 0, x: -60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  whileHover={{
    y: -8,
    scale: 1.02
  }}
  className="rounded-[1.5rem] bg-gradient-to-br from-green-50 to-white border border-green-100 p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center"><Shield size={24} /></div>
              <h3 className="text-xl font-black text-green-700 uppercase">High Commercial Success</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {paradox.success.map((item) => (
                <motion.li
  key={item}
  whileHover={{
    scale: 1.05,
    y: -4
  }}
  transition={{ type: "spring", stiffness: 250 }} 
                className="rounded-2xl bg-white p-4 shadow-sm border border-green-100 text-slate-700 text-sm font-medium">{item}</motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 text-green-700">
              <TrendingUp size={42} />
              <DollarSign size={42} />
              <Users size={42} />
            </div>
          </motion.div>

          <div className="flex items-center justify-center xl:w-16 py-2">
            <motion.div
  animate={{
    scale: [1, 1.08, 1]
  }}
  transition={{
    repeat: Infinity,
    duration: 2
  }}
  className="rounded-full bg-[#081a3b] text-white w-12 h-12 flex items-center justify-center font-black shadow-lg">VS</motion.div>
          </div>

          <motion.div
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  whileHover={{
    y: -8,
    scale: 1.02
  }}
  className="rounded-[1.5rem] bg-gradient-to-br from-red-50 to-white border border-red-100 p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center"><Flag size={24} /></div>
              <h3 className="text-xl font-black text-red-700 uppercase">Inconsistent On-field Success</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {paradox.inconsistent.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{
                    scale: 1.05,
                    y: -4
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                    className="rounded-2xl bg-white p-4 shadow-sm border border-red-100 text-slate-700 text-sm font-medium">{item}
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 text-red-600">
              <TrendingDown size={42} />
              <Trophy size={42} />
            </div>
          </motion.div>
        </div>

        <div className="px-5 md:px-8 pb-8">
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="rounded-[1.5rem] bg-[#eff6ff] border border-blue-200 p-6 md:p-8 shadow-sm max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-600 font-bold mb-3 text-center">Core Problem</p>
            <p className="text-center text-slate-700 text-lg md:text-xl font-medium leading-relaxed">{paradox.coreProblem}</p>
          </motion.div>
        </div>
      </motion.header>

    </motion.div>
  );
};

export default ProblemStatement;