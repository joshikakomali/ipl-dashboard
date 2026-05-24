import React from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { DollarSign, Globe, Users, Star, PlusSquare, ShieldAlert, BadgeIndianRupee, Activity } from 'lucide-react';

const ProsCons = () => {
  const { prosCons } = dashboardData;

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
  className="rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-xl"
>
        <div className="bg-[#081a3b] text-white text-center py-5 px-6 md:px-8">
          <h2 className="text-2xl md:text-4xl font-black tracking-[0.18em] uppercase">Pros & Cons</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 md:p-8">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-green-700 mb-2 bg-green-50 p-4 rounded-2xl border border-green-100">
              <DollarSign size={24} />
              <h3 className="text-xl md:text-2xl font-black tracking-[0.18em] uppercase">Advantages</h3>
            </div>
            {prosCons.pros.map((pro, idx) => (
              <motion.div
  key={idx}
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  whileHover={{
    scale: 1.03,
    y: -6,
    rotate: 1
  }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
              className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4">
                <motion.div
  whileHover={{ rotate: 10, scale: 1.1 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  {idx === 0 ? <DollarSign size={24} /> : idx === 1 ? <Globe size={24} /> : idx === 2 ? <Users size={24} /> : <Star size={24} />}
                </motion.div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{pro.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{pro.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-red-700 mb-2 bg-red-50 p-4 rounded-2xl border border-red-100">
              <ShieldAlert size={24} />
              <h3 className="text-xl md:text-2xl font-black tracking-[0.18em] uppercase">Disadvantages</h3>
            </div>
            {prosCons.cons.map((con, idx) => (
              <motion.div
  key={idx}
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  whileHover={{
    scale: 1.03,
    y: -6,
    rotate: -1
  }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
              className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  {idx === 0 ? <PlusSquare size={24} /> : idx === 1 ? <ShieldAlert size={24} /> : idx === 2 ? <BadgeIndianRupee size={24} /> : <Activity size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{con.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{con.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.header>
    </motion.div>
  );
};

export default ProsCons;