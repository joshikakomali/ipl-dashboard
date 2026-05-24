import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Trophy, AlignLeft, Camera, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import api from '../api';

const iplTeams = [
  "Chennai Super Kings",
  "Mumbai Indians",
  "Royal Challengers Bengaluru",
  "Sunrisers Hyderabad",
  "Kolkata Knight Riders",
  "Rajasthan Royals",
  "Delhi Capitals",
  "Punjab Kings",
  "Gujarat Titans",
  "Lucknow Super Giants"
];

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    favoriteTeam: '',
    avatar: ''
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!savedUser) {
      navigate('/login');
      return;
    }

    // Fetch latest user details from server to be absolutely sure
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/profile/${savedUser._id}`);
        const user = response.data;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || '',
          favoriteTeam: user.favoriteTeam || '',
          avatar: user.avatar || ''
        });
      } catch (err) {
        console.error("Failed to load user profile:", err);
        // Fallback to local storage if API call fails
        setFormData({
          name: savedUser.name || '',
          email: savedUser.email || '',
          phone: savedUser.phone || '',
          bio: savedUser.bio || '',
          favoriteTeam: savedUser.favoriteTeam || '',
          avatar: savedUser.avatar || ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image file size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        avatar: reader.result
      }));
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!savedUser) {
      navigate('/login');
      return;
    }

    try {
      const response = await api.put(`/users/profile/${savedUser._id}`, formData);
      if (response.status === 200) {
        const updatedUser = response.data.user;
        
        // Update local storage
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        
        // Dispatch event so layout header updates instantly
        window.dispatchEvent(new Event('userProfileUpdated'));
        
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-slate-600 hover:text-[#0B192C] font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Profile Card wrapper */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden">
        {/* Header decoration */}
        <div className="h-44 bg-[#0B192C] relative flex items-end px-8 pb-6">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute top-4 right-4 bg-yellow-400/10 text-yellow-400 font-semibold px-4 py-1.5 rounded-full text-xs border border-yellow-400/20 tracking-wider uppercase">
            IPL Franchise Fan Club
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Your Profile</h2>
        </div>

        {/* Profile details container */}
        <form onSubmit={handleSubmit} className="px-8 py-8 relative -mt-10">
          {/* Avatar display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-8 border-b border-slate-100">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 text-[#0B192C] shadow-lg flex items-center justify-center cursor-pointer transition-colors border-2 border-white">
                  <Camera size={14} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>

            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl font-black text-[#0B192C] leading-none mb-2">{formData.name || 'Anonymous User'}</h3>
              <p className="text-slate-500 text-sm mb-1">{formData.email}</p>
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Fan Member
              </span>
            </div>

            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 rounded-2xl bg-[#0B192C] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      // reload user
                      const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
                      if (savedUser) {
                        setFormData(prev => ({
                          ...prev,
                          name: savedUser.name || '',
                          phone: savedUser.phone || '',
                          bio: savedUser.bio || '',
                          favoriteTeam: savedUser.favoriteTeam || '',
                          avatar: savedUser.avatar || ''
                        }));
                      }
                      setError('');
                    }}
                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0B192C] font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-red-700 bg-red-50 px-5 py-3.5 rounded-2xl border border-red-100 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-2 text-green-700 bg-green-50 px-5 py-3.5 rounded-2xl border border-green-100 text-sm">
              <Check size={18} className="shrink-0 animate-bounce" />
              <span>{success}</span>
            </div>
          )}

          {/* Details form layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your Name"
                  className={`w-full pl-12 pr-5 py-3.5 rounded-2xl border ${isEditing ? 'border-slate-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100' : 'border-transparent bg-slate-50 text-slate-600'} outline-none transition-all font-medium`}
                  required
                />
                <User size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address (Locked)</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-transparent bg-slate-100 text-slate-500 outline-none font-medium cursor-not-allowed"
                />
                <Mail size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                  className={`w-full pl-12 pr-5 py-3.5 rounded-2xl border ${isEditing ? 'border-slate-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100' : 'border-transparent bg-slate-50 text-slate-600'} outline-none transition-all font-medium`}
                />
                <Phone size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
              </div>
            </div>

            {/* Favorite Team */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Favorite IPL Franchise</label>
              <div className="relative">
                <select
                  name="favoriteTeam"
                  value={formData.favoriteTeam}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-12 pr-5 py-3.5 rounded-2xl border appearance-none ${isEditing ? 'border-slate-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100' : 'border-transparent bg-slate-50 text-slate-600'} outline-none transition-all font-medium`}
                >
                  <option value="">Select your franchise</option>
                  {iplTeams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
                <Trophy size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
              </div>
            </div>

            {/* Biography */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-semibold text-slate-700">Fan Bio / Biography</label>
              <div className="relative">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full pl-12 pr-5 py-3.5 rounded-2xl border ${isEditing ? 'border-slate-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100' : 'border-transparent bg-slate-50 text-slate-600'} outline-none transition-all font-medium resize-none`}
                />
                <AlignLeft size={18} className="absolute top-6 left-4 text-slate-400" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
