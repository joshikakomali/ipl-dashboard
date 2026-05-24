import React from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { Users, Scale, Star, Map, Stethoscope } from 'lucide-react';

const icons = [
  <Users size={32} />,
  <Scale size={32} />,
  <Star size={32} />,
  <Map size={32} />,
  <Stethoscope size={32} />
];

const Challenges = () => {
  const { challenges } = dashboardData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-10 py-4 md:py-10">
      <header className="rounded-[2rem] overflow-hidden shadow-2xl bg-[#081a3b] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] min-h-[420px]">
          <div className="p-6 md:p-10 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#081a3b] via-[#081a3b] to-[#0e2a55]"></div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">Franchise Operations</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-4">Key Challenges</h2>
              <p className="text-white/75 text-base md:text-lg leading-relaxed">A season-long view of the major obstacles IPL franchises solve through data, discipline, and team design.</p>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-full">
            <div className="absolute inset-0 bg-[url('/ipl.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-[#081a3b] via-[#081a3b]/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-center p-6 md:p-8">
              <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/10 p-5 max-w-xs text-center text-white">
                <p className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Team Balance</p>
                <p className="text-white/80 text-sm leading-relaxed">Auction balance, injuries, venue changes, and star management shape the season.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5"
      >
        {challenges.map((challenge, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-white rounded-[1.6rem] p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center justify-center space-y-4 hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-lg">
              {icons[idx % icons.length]}
            </div>
            <h3 className="text-xl font-bold text-gray-800 leading-tight">
              {challenge}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Challenges;