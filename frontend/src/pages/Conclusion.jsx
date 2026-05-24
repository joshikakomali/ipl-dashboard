import React from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { Anchor, Briefcase, BarChartHorizontal, CheckCircle } from 'lucide-react';

const pillarIcons = [
  <Anchor size={32} />,
  <Briefcase size={32} />,
  <BarChartHorizontal size={32} />,
  <CheckCircle size={32} />
];

const Conclusion = () => {
  const { text, pillars } = dashboardData.conclusion;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center space-y-16">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-brand-navy p-12 rounded-3xl shadow-2xl border border-brand-gold/30 text-white relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <h2 className="text-sm font-bold tracking-[0.3em] text-brand-gold mb-6 uppercase flex items-center justify-center space-x-3">
          <span className="w-12 h-px bg-brand-gold"></span>
          <span>Final Verdict</span>
          <span className="w-12 h-px bg-brand-gold"></span>
        </h2>
        
        <p className="text-2xl md:text-3xl font-light leading-relaxed relative z-10">
          "{text}"
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {pillars.map((pillar, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
               {pillarIcons[idx]}
            </div>
            <h4 className="text-lg font-bold text-brand-navy text-center uppercase tracking-wide">
              {pillar}
            </h4>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Conclusion;