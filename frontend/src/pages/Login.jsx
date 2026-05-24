import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Eye,
  EyeOff,
  Trophy,
  ShieldCheck,
  User,
  Lock,
  UserCog,
  Sparkles,
  Star,
  Briefcase
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {

  const navigate = useNavigate();

  const [loginRole, setLoginRole] = useState('user');

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [splashUser, setSplashUser] = useState({ name: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      const data = response.data;

      if (response.status === 200) {
        setSplashUser({
          name: data.user.name,
          role: data.user.role
        });
        setShowSplash(true);

        localStorage.setItem("userRole", data.user.role);

        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminEmail", data.user.email);
        } else if (data.user.role === "manager") {
          localStorage.setItem("isManager", "true");
          localStorage.setItem("managerEmail", data.user.email);
        } else {
          localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        }

        setTimeout(() => {
          if (data.user.role === "admin" || data.user.role === "manager") {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 2800);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error occurred during login");
    }
  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#eef4fb] to-[#dfeaf7] flex items-center justify-center px-4 py-10">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] rounded-full bg-yellow-300/30 blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-blue-400/20 blur-3xl"></div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 60
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.7
        }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Premium IPL Badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.7
          }}
          className="flex justify-center mb-8"
        >

          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-yellow-300/40 blur-2xl rounded-full scale-125 animate-pulse"></div>

            {/* Floating Sparkle */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
              className="absolute -top-3 -right-3 z-20"
            >

              <Sparkles
                size={22}
                className="text-yellow-400 drop-shadow-lg"
              />

            </motion.div>

            {/* Main Badge */}
            <div className="relative z-10 flex items-center gap-3 px-6 py-4 rounded-[28px]
            bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500
            shadow-[0_18px_50px_rgba(255,215,0,0.35)] border border-yellow-200">

              {/* Trophy */}
              <div className="w-16 h-16 rounded-2xl bg-[#07111f]
              flex items-center justify-center shadow-inner">

                <Trophy
                  className="text-yellow-400"
                  size={32}
                />

              </div>

              {/* Text */}
              <div className="text-left">

                <h2 className="text-[#07111f] font-black text-lg leading-tight tracking-wide">
                  IPL
                </h2>

                <p className="text-[#07111f]/80 text-xs font-semibold tracking-widest">
                  FRANCHISE SYSTEM
                </p>

              </div>

              {/* Star */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >

                <Star
                  size={24}
                  className="text-[#07111f]"
                  fill="#07111f"
                />

              </motion.div>

            </div>

          </div>

        </motion.div>

        {/* Main Card */}
        <div className="backdrop-blur-2xl bg-white/70 border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.12)] rounded-[32px] p-8">

          {/* Toggle Buttons */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">

            <button
              onClick={() => setLoginRole('user')}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loginRole === 'user'
                  ? 'bg-[#07111f] text-white shadow-lg'
                  : 'text-slate-600'
              }`}
            >

              <User size={18} />

              User

            </button>

            <button
              onClick={() => setLoginRole('manager')}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loginRole === 'manager'
                  ? 'bg-[#07111f] text-white shadow-lg'
                  : 'text-slate-600'
              }`}
            >

              <Briefcase size={18} />

              Manager

            </button>

            <button
              onClick={() => setLoginRole('admin')}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loginRole === 'admin'
                  ? 'bg-[#07111f] text-white shadow-lg'
                  : 'text-slate-600'
              }`}
            >

              <UserCog size={18} />

              Admin

            </button>

          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-black text-[#07111f] tracking-wide">

              {loginRole === 'admin'
                ? 'ADMIN LOGIN'
                : loginRole === 'manager'
                ? 'MANAGER LOGIN'
                : 'USER LOGIN'}

            </h1>

            <p className="text-slate-500 mt-3 text-sm leading-relaxed">

              IPL Franchise Management System

            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                  required
                />

                <User
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-12 pr-14 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200"
                  required
                />

                <Lock
                  size={18}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-5 text-slate-500"
                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />}

                </button>

              </div>

            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.03
              }}
              whileTap={{
                scale: 0.97
              }}
              type="submit"
              className="w-full mt-3 py-4 rounded-2xl bg-gradient-to-r from-[#07111f] to-[#0f172a] text-white font-bold tracking-wide shadow-[0_15px_35px_rgba(15,23,42,0.25)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.35)] transition-all duration-300"
            >

              {loginRole === 'admin'
                ? 'LOGIN AS ADMIN'
                : loginRole === 'manager'
                ? 'LOGIN AS MANAGER'
                : 'LOGIN AS USER'}

            </motion.button>

          </form>

          {/* Register Link */}
          {loginRole === 'user' && (

            <div className="mt-6 text-center text-sm text-slate-600">

              Don’t have an account?{' '}

              <button
                onClick={() =>
                  navigate('/register')
                }
                className="font-bold text-[#07111f] hover:text-yellow-600 transition"
              >
                Create Account
              </button>

            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">

            <ShieldCheck
              size={18}
              className="text-green-600"
            />

            Secure IPL Franchise Management System

          </div>

        </div>

      </motion.div>

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07111f] overflow-hidden"
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />

            {/* Glowing background circles */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-3xl animate-pulse"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-3xl"></div>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="relative z-10 text-center flex flex-col items-center max-w-lg px-6"
            >
              {/* Trophy Container */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 flex items-center justify-center shadow-[0_20px_50px_rgba(251,191,36,0.3)] border border-yellow-200 mb-8"
              >
                <Trophy className="text-[#07111f]" size={48} />
              </motion.div>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-yellow-400 text-sm font-bold tracking-[0.25em] uppercase mb-3"
              >
                {splashUser.role === 'admin' ? 'System Administrator' : splashUser.role === 'manager' ? 'System Manager' : 'IPL Franchise Fan'}
              </motion.p>

              {/* Main Welcome Message */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight"
              >
                Welcome back,<br />
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
                  {splashUser.name}
                </span>
              </motion.h2>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-slate-300 text-sm font-semibold tracking-wide mb-10"
              >
                Preparing your franchise dashboard experience...
              </motion.p>

              {/* Progress bar container */}
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                />
              </div>

              {/* Small lock details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-1.5 mt-8 text-xs text-white font-medium"
              >
                <ShieldCheck size={14} className="text-green-400" />
                <span>Secure Session Initialized</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;