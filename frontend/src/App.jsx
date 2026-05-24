import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';

import Login from './pages/Login';

import Register from './pages/Register';

import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Teams from './pages/admin/Teams';
import Players from './pages/admin/Players';
import Matches from './pages/admin/Matches';
import Reports from './pages/admin/Reports';
import Performance from './pages/admin/Performance';
import AddPlayer from './pages/admin/AddPlayer';
import ManagerProfile from './pages/admin/ManagerProfile';
import Home from './pages/Home';

import Analysis from './pages/Analysis';
import ProsCons from './pages/ProsCons';
import Challenges from './pages/Challenges';
import Strategies from './pages/Strategies';
import Analytics from './pages/Analytics';
import Conclusion from './pages/Conclusion';
import Profile from './pages/Profile';

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="*" element={<Login />} />
        {/* Login */}
        <Route
          path='/login'
          element={<Login />}
        />

        {/*Register*/}
        <Route
          path='/register'
          element={<Register />}
        />

        {/* Admin */}
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="teams" element={<Teams />} />
  <Route path="players" element={<Players />} />
  <Route path="matches" element={<Matches />} />
  <Route path="performance" element={<Performance />} />
  <Route path="reports" element={<Reports />} />
  <Route path="add-player" element={<AddPlayer />} />
  <Route path="profile" element={<ManagerProfile />} />
</Route>

        {/* Website */}
        <Route
          path='/'
          element={<DashboardLayout />}
        >

          <Route
            index
            element={<Home />}
          />

          <Route
            path='profile'
            element={<Profile />}
          />

          <Route
            path='analytics'
            element={<Analytics />}
          />
          <Route
            path='analysis'
            element={<Analysis />}
          />

          <Route
            path='pros-cons'
            element={<ProsCons />}
          />

          <Route
            path='challenges'
            element={<Challenges />}
          />

          <Route
            path='strategies'
            element={<Strategies />}
          />

          <Route
            path='conclusion'
            element={<Conclusion />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;