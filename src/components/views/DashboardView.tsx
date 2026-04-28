import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Eye, 
  Camera, 
  AlertTriangle,
  ArrowUpRight,
  MapPin,
  Heart,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const data = [
  { name: '00:00', detections: 4 },
  { name: '04:00', detections: 12 },
  { name: '08:00', detections: 25 },
  { name: '12:00', detections: 18 },
  { name: '16:00', detections: 32 },
  { name: '20:00', detections: 45 },
];

const DashboardView: React.FC = () => {
  const [stats, setStats] = useState({
    activeCameras: 42,
    detectionsToday: 156,
    criticalAlerts: 3,
    protectedSpecies: 12
  });

  const recentDetections = [
    { species: 'Bengal Tiger', location: 'Chitwan Sector B', time: '12 mins ago', risk: 'Critical', confidence: 0.98 },
    { species: 'One-Horned Rhino', location: 'Buffer Zone East', time: '45 mins ago', risk: 'Low', confidence: 0.92 },
    { species: 'Asian Elephant', location: 'Community Forest', time: '2 hours ago', risk: 'High', confidence: 0.89 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Cameras', value: stats.activeCameras, icon: Camera, trend: '+2' },
          { label: 'Detections / 24h', value: stats.detectionsToday, icon: Eye, trend: '+14%' },
          { label: 'Critical Alerts', value: stats.criticalAlerts, icon: ShieldAlert, trend: '-1', color: 'text-red-600' },
          { label: 'Protected Species', value: stats.protectedSpecies, icon: Heart, trend: 'Stable' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#141414] p-6 group hover:bg-[#141414] hover:text-white transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={cn("w-5 h-5", stat.color || "text-gray-500")} />
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">{stat.trend}</span>
            </div>
            <h3 className="font-serif italic text-sm opacity-60 mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold font-mono tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white border border-[#141414] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-serif italic text-2xl font-bold uppercase tracking-tight">Detection Activity</h2>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Real-time sampling rate: 1.2Hz</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#141414] text-white font-mono text-[10px] uppercase tracking-widest">24H</button>
              <button className="px-3 py-1 border border-[#141414] font-mono text-[10px] uppercase tracking-widest">7D</button>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8f8f8' }}
                  contentStyle={{ borderRadius: 0, border: '1px solid #141414', fontFamily: 'monospace', fontSize: '10px' }}
                />
                <Bar dataKey="detections" fill="#141414" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Feed */}
        <div className="bg-white border border-[#141414] flex flex-col">
          <div className="p-6 border-bottom border-[#141414] bg-gray-50 flex items-center justify-between">
            <h2 className="font-serif italic font-bold uppercase tracking-tight">Live Incidents</h2>
            <Activity className="w-4 h-4 text-[#60bb46] animate-pulse" />
          </div>
          <div className="flex-1 divide-y divide-[#141414]">
            {recentDetections.map((detection, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "font-mono text-[10px] px-2 py-0.5 uppercase tracking-widest border",
                    detection.risk === 'Critical' ? "border-red-600 text-red-600 bg-red-50" : "border-[#141414] text-[#141414]"
                  )}>
                    {detection.risk}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{detection.time}</span>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:underline underline-offset-4 decoration-2">{detection.species}</h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none">
                  <MapPin className="w-3 h-3" />
                  {detection.location}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 border-t border-[#141414] font-mono text-[10px] uppercase tracking-widest hover:bg-[#141414] hover:text-white transition-all">
            View Mission Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
