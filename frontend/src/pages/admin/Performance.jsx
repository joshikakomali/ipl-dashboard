import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'CSK', runs: 2800, wickets: 85 },
  { name: 'MI', runs: 2750, wickets: 90 },
  { name: 'RCB', runs: 2600, wickets: 80 },
  { name: 'KKR', runs: 2500, wickets: 88 },
  { name: 'SRH', runs: 2650, wickets: 75 },
  { name: 'DC', runs: 2400, wickets: 70 },
  { name: 'RR', runs: 2450, wickets: 78 },
  { name: 'PBKS', runs: 2300, wickets: 82 },
];

const Performance = () => {
  return (
    <div className="p-8 bg-white min-h-screen rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#07111f]">Performance Analytics</h1>
        <p className="text-slate-500 mt-2">Team & Player Performance Metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6 text-[#07111f]">Team Total Runs</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="runs" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6 text-[#07111f]">Team Total Wickets</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="wickets" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;