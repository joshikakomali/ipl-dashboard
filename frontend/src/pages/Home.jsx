
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dashboardData } from '../data/data';
import { ArrowRight, CalendarDays, Shield, Trophy, Users } from 'lucide-react';

const Home = () => {
  const heroSlides = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Oa1alc06PkkMOpgRj6vosw4RF_Cdj_plUA&s",

  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRINiePFqST1dDRa8PvKZtm5jsiFlvoF0nSJg&s"
  

];

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, 3500);

  return () => clearInterval(interval);
}, []);
  const { title, description, stats, highlights, heroImage } = dashboardData.home;
  const teamSpotlights = dashboardData.teams.slice(0, 3);

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.005 }}
        className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[#081a3b] text-white shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-brand-gold/10"></div>
          {heroSlides.map((slide, index) => (
  <motion.img
    key={index}
    src={slide}
    alt={`IPL Slide ${index + 1}`}
    className="absolute inset-0 h-full w-full object-cover"
    initial={{ opacity: 0 }}
    animate={{
      opacity: currentSlide === index ? 0.45 : 0,
      scale: currentSlide === index ? 1.05 : 1
    }}
    transition={{ duration: 1 }}
  />
))}
          <div className="relative z-10 p-6 md:p-10 lg:p-12 min-h-[540px] flex flex-col justify-between">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-bold tracking-[0.35em] text-brand-gold uppercase">
                <Shield size={14} /> Official IPL Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight uppercase max-w-4xl">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md border border-white/10">18 Years of Winners</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md border border-white/10">Auction Strategy</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md border border-white/10">Team Logos & Profiles</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-8">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
  <div className="flex items-center gap-2 text-brand-gold mb-2">
    <Users size={16} /> Top Teams
  </div>
  <p className="text-sm text-white/75">
    Detailed insights into top IPL teams like CSK, MI, and KKR with performance analysis.
  </p>
</div>

<div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
  <div className="flex items-center gap-2 text-brand-gold mb-2">
    <Shield size={16} /> Team Strategies
  </div>
  <p className="text-sm text-white/75">
    Insights on team composition, match planning, and retention strategies.
  </p>
</div>
<div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
  <div className="flex items-center gap-2 text-brand-gold mb-2">
    <Trophy size={16} /> IPL Records
  </div>
  <p className="text-sm text-white/75">
    Explore highest runs, wickets, and historic IPL records across all seasons.
  </p>
</div>

<div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
  <div className="flex items-center gap-2 text-brand-gold mb-2">
    <CalendarDays size={16} /> Match Insights
  </div>
  <p className="text-sm text-white/75">
    Get match insights, win ratios, and performance trends across seasons.
  </p>
</div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-brand-gold mb-2"><Trophy size={16} /> Featured Champion</div>
                <p className="text-sm text-white/75">Royal Challengers Bengaluru are highlighted with their 2025 title story and auction approach.</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 text-brand-gold mb-2"><CalendarDays size={16} /> Season Coverage</div>
                <p className="text-sm text-white/75">Season-by-season champions and strategies from 2008 to 2025.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] bg-white shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">Website Highlights</p>
                <h2 className="text-2xl font-black text-brand-navy">Everything an IPL Website Needs</h2>
              </div>
<a 
  href="https://share.google/pwlAlTVvO6ULBIoa9"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-2xl bg-brand-navy text-white w-12 h-12 flex items-center justify-center cursor-pointer"
>
  <ArrowRight size={20} />
</a>            </div>
            <div className="grid sm:grid-cols-2 gap-3">
  {highlights.map((item, idx) => (
    <motion.div
      key={item}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        y: -6,
        rotate: 1
      }}
      transition={{
        duration: 0.4,
        delay: idx * 0.1,
        type: "spring",
        stiffness: 220
      }}
      viewport={{ once: true }}
      className="rounded-2xl bg-[#f5f8fc] border border-gray-200 p-4 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-xl hover:border-brand-gold/50 cursor-pointer"
    >
      {item}
    </motion.div>
  ))}
</div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-brand-navy to-[#102544] text-white p-6 md:p-8 shadow-xl border border-white/10">
            <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4"><Users size={16} /> Current IPL teams</div>
            <div className="grid grid-cols-2 gap-3">
              {dashboardData.teams.map((team, idx) => (
  <motion.div
    key={team.short}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{
      scale: 1.06,
      y: -6,
      rotate: 1
    }}
    transition={{
      duration: 0.4,
      delay: idx * 0.08,
      type: "spring",
      stiffness: 220
    }}
    viewport={{ once: true }}
    className="rounded-2xl bg-white/8 border border-white/10 p-3 backdrop-blur-md hover:bg-white/15 hover:border-brand-gold/40 shadow-lg transition-all"
  >
    <div className="flex items-center gap-3">
     <motion.img
  src={team.badge}
  alt={team.name}
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.8 }}
  className="w-10 h-10 rounded-xl object-cover bg-white p-1 shadow-md"
/>

      <div className="min-w-0">
        <p className="text-sm font-bold truncate">{team.name}</p>
        <p className="text-xs text-white/60">
          {team.titles} title{team.titles === 1 ? '' : 's'}
        </p>
      </div>

    </div>
  </motion.div>
))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="glass-shell rounded-[2rem] p-6 md:p-8"
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">Champions at a glance</p>
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy">Why CSK, MI, and RCB stand out</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500"><Trophy size={16} /> Top 3 Playbooks</div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {dashboardData.championPlaybooks.map((team) => (
            <motion.div
              key={team.short}
              whileHover={{
                y: -10,
                scale: 1.03
              }}
               transition={{ duration: 0.3 }}
                className="rounded-[1.6rem] overflow-hidden bg-white border border-gray-100 shadow-lg"
            >
              <div className="relative h-48">
                <img src={team.image} alt={team.team} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a3b] via-[#081a3b]/45 to-transparent"></div>
                <div className="absolute inset-0 p-5 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">{team.short}</p>
                    <h3 className="text-xl font-black leading-tight max-w-[11rem]">{team.title}</h3>
                  </div>
                  <img src={dashboardData.teams.find((entry) => entry.short === team.short)?.badge} alt={`${team.short} badge`} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 object-cover" />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-sm text-slate-600 leading-relaxed">{team.summary}</p>
                <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '100%', background: team.accent }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
               y: -8,
               scale: 1.05
            }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          className="rounded-[1.75rem] bg-white border border-gray-100 p-6 shadow-lg text-center">
            <div className="text-4xl md:text-5xl font-black text-brand-navy mb-2">{stat.value}</div>
            <div className="text-xs tracking-[0.35em] uppercase text-brand-gold font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </section>

     

<section className="rounded-[2rem] bg-white border border-gray-100 shadow-xl p-6 md:p-8">
  <div className="flex items-center justify-between gap-4 mb-6">
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-2">Team Logos</p>
      <h2 className="text-2xl md:text-3xl font-black text-brand-navy">All IPL Franchises</h2>
    </div>
    <p className="text-sm text-slate-500 max-w-xl text-right hidden md:block">
      A color-coded team wall designed for responsiveness, fast scanning, and mentor-friendly presentation.
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
    {dashboardData.teams.map((team) => (
      <motion.a
        whileHover={{
        y: -8,
        scale: 1.04
        }}
        transition={{ type: "spring", stiffness: 250 }}
       key={team.short}
        href={team.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-[1.5rem] border border-gray-200 bg-[#f8fafc] p-4 flex flex-col gap-3 shadow-sm block cursor-pointer"
      >

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-6px] bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
          Visit {team.short} Official Site
        </div>

        <div className="flex items-center gap-3">
          <img 
            src={team.badge} 
            alt={`${team.name} badge`} 
            className="w-12 h-12 rounded-2xl shadow-md bg-white object-cover" 
          />
          <div className="min-w-0">
            <p className="font-bold text-brand-navy leading-tight text-sm">{team.name}</p>
            <p className="text-xs text-slate-500">{team.titles} IPL titles</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{team.tagline}</p>

      </motion.a>
    ))}
  </div>
</section>

      <section className="grid md:grid-cols-3 gap-5">
        {teamSpotlights.map((team) => (
          <motion.div
              key={team.short}
              whileHover={{
                rotate: 1,
                scale: 1.03,
                y: -6
              }}
              transition={{ type: "spring", stiffness: 220 }}
              className="glass-card rounded-[1.6rem] overflow-hidden"
            >
            <div className="h-40 relative">
              <img src={team.image} alt={team.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a3b] via-[#081a3b]/35 to-transparent"></div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={team.badge} alt={`${team.name} badge`} className="w-11 h-11 rounded-2xl bg-white shadow-sm object-cover" />
                <div>
                  <p className="font-black text-brand-navy">{team.name}</p>
                  <p className="text-xs text-slate-500">{team.titles} titles</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{team.summary}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-[#081a3b] text-white shadow-2xl p-6 md:p-8 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold mb-3">18-Season Winners Timeline</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Winners, strategies, and team evolution in one website.</h2>
            <p className="text-white/75 leading-relaxed">Use the navigation above to explore: Teams, Players, Matches, Analytics, Reports, and Users (admin).</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4"><p className="text-2xl font-black text-brand-gold">18</p><p className="text-xs uppercase tracking-[0.3em] text-white/60">Seasons</p></div>
            <div className="rounded-2xl bg-white/10 border border-white/10 p-4"><p className="text-2xl font-black text-brand-gold">10</p><p className="text-xs uppercase tracking-[0.3em] text-white/60">Teams</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;