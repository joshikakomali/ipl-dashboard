import React, { useState } from 'react';

import { motion } from 'framer-motion';

import {
  Trophy,
  User,
  Mail,
  Lock
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {
      const response = await api.post("/users/register", { name, email, password });

      if (response.status === 201) {
        alert("Registration Successful");
        navigate('/login');
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error occurred during registration");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] via-[#eef4fb] to-[#dfeaf7] flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{
          opacity: 0,
          y: 50
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="w-full max-w-md"
      >

        <div className="backdrop-blur-2xl bg-white/70 border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.12)] rounded-[32px] p-8">

          {/* Trophy */}
          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">

              <Trophy
                className="text-[#07111f]"
                size={38}
              />

            </div>

          </div>

          <div className="text-center mb-8">

            <h1 className="text-3xl font-black text-[#07111f]">
              CREATE ACCOUNT
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              IPL Franchise Management System
            </p>

          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}
            <div className="relative">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none"
                required
              />

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

            {/* Email */}
            <div className="relative">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none"
                required
              />

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

            {/* Password */}
            <div className="relative">

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none"
                required
              />

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

            {/* Confirm */}
            <div className="relative">

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 outline-none"
                required
              />

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#07111f] text-white font-bold hover:scale-[1.02] transition"
            >
              CREATE ACCOUNT
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-600">

            Already have an account?{' '}

            <button
              onClick={() =>
                navigate('/login')
              }
              className="font-bold text-[#07111f]"
            >
              Login
            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;