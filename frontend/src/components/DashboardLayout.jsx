import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Shield, Users, CalendarDays, BarChart3, FileText, Menu, User, LogOut, X, Bell, Trophy, ChevronDown } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Guest');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const isAdmin = localStorage.getItem("isAdmin");

      if (savedUser) {
        setUserName(savedUser.name || 'User');
        setUserRole('User');
        setUserAvatar(savedUser.avatar || '');
      } else if (isAdmin) {
        setUserName('Admin');
        setUserRole('Admin');
        setUserAvatar('');
      } else {
        setUserName('Guest');
        setUserRole('Guest');
        setUserAvatar('');
      }
    };

    loadUser();

    const handleProfileUpdate = () => {
      loadUser();
    };

    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    return () => {
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Analysis', path: '/analysis', icon: <FileText size={18} /> },
    { name: 'Pros & Cons', path: '/pros-cons', icon: <Shield size={18} /> },
    { name: 'Challenges', path: '/challenges', icon: <Users size={18} /> },
    { name: 'Strategies', path: '/strategies', icon: <Trophy size={18} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={18} /> },
    { name: 'Conclusion', path: '/conclusion', icon: <FileText size={18} /> },
  ];

  // allow public access to pages; profile will reflect guest/user/admin state

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] font-['Inter',sans-serif]">
      {/* Premium Sticky Navbar */}
      <nav className={"w-full sticky top-0 z-50 transition-all duration-300 " + (scrolled ? 'bg-[#0B192C]/95 backdrop-blur-xl shadow-lg border-b border-white/10' : 'bg-[#0B192C] border-b border-white/5')}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LEFT: Logo & Brand */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFD700] to-amber-500 flex items-center justify-center shadow-lg shadow-[#FFD700]/20 transform transition-transform hover:scale-105">
                <Trophy size={24} className="text-[#0B192C]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <h1 className="text-white text-lg md:text-xl font-bold tracking-tight leading-none mb-1">
                  IPL Franchise
                </h1>
                <p className="text-[#FFD700] text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase leading-none">
                  Management
                </p>
              </div>
            </div>

            {/* CENTER: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2 bg-transparent rounded-2xl p-1 mx-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `px-4 py-3 rounded-xl text-base font-semibold flex items-center gap-3 transition-all duration-200 ${isActive ? 'bg-white/12 text-white shadow-md scale-100' : 'text-white/90 hover:bg-white/6 hover:text-white'}`}
                >
                  <span className="opacity-95">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* RIGHT: Notifications & Profile */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Notification Bell */}
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors group">
                <Bell size={20} className="group-hover:animate-bounce" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B192C]"></span>
              </button>

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <div className="hidden md:flex flex-col items-start pr-1">
                    <span className="text-sm font-semibold text-white leading-none mb-1">{userName}</span>
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium leading-none">{userRole === 'Admin' ? 'Admin' : userRole === 'User' ? 'User' : ''}</span>
                  </div>
                  <ChevronDown size={14} className={"text-slate-400 hidden md:block transition-transform duration-300 " + (profileOpen ? 'rotate-180' : '')} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} className="text-white" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-900 truncate">{userName}</p>
                          <p className="text-xs text-slate-500 truncate">{userRole === 'Admin' ? 'Administrator' : userRole === 'User' ? 'User' : ''}</p>
                        </div>
                      </div>
                      
                      {userRole === 'User' && (
                        <button 
                          onClick={() => {
                            setProfileOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full text-left px-4 py-3 mt-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 border-b border-slate-100"
                        >
                          <User size={18} className="text-slate-500" />
                          View Profile
                        </button>
                      )}

                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={"lg:hidden absolute left-0 right-0 top-full bg-[#0B192C]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-300 origin-top " + (menuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none')}>
          <div className="p-4 space-y-1.5 flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/5 hover:text-white'}`}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-[#f4f7fb]">
        {/*
          Center non-home pages and keep Home more spacious.
          Use a small heuristic to pick padding per route so pages feel balanced.
        */}
        {(() => {
          const path = location.pathname;
          const smallPadding = 'pt-6 pb-8 px-4 md:px-6 lg:px-8';
          const mediumPadding = 'py-8 px-4 md:px-6 lg:px-0';
          const centeredWrapper = 'max-w-5xl mx-auto';

          // pages we want centered like Conclusion
          const centeredPages = ['/analysis', '/pros-cons', '/challenges', '/strategies', '/analytics', '/conclusion', '/'];

          // Home and Analytics get slightly different (smaller) spacing
          if (path === '/' || path === '/analytics') {
            return (
              <div className={smallPadding}>
                <Outlet />
              </div>
            );
          }

          // Default: center content in a max-width container with medium padding
          return (
            <div className={mediumPadding}>
              <div className={centeredWrapper}>
                <Outlet />
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
};

export default DashboardLayout;
