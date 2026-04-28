import React, { useState } from 'react';
import { ShieldAlert, Send, Smartphone, Volume2, History, AlertTriangle, CheckCircle } from 'lucide-react';

const AlertView: React.FC = () => {
  const [activeAlerts] = useState([
    { id: '1', area: 'Buffer Zone B', subject: 'Tiger Movement', time: '14:02', threat: 'High' },
    { id: '2', area: 'Sector 4', subject: 'Elephant Group', time: '12:45', threat: 'Medium' },
  ]);

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-serif italic text-2xl md:text-3xl font-bold uppercase tracking-tight">Early Warning System</h2>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Communication Protocol: SMS-Gateway v4 | Siren-Link Active
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Alert Control */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white border border-[#141414] p-8">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                 </div>
                 <div>
                    <h3 className="font-serif italic font-bold text-xl uppercase tracking-widest">Global Broadcast Control</h3>
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-1">Manual Override & System Dispatch</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <button className="p-8 border border-[#141414] hover:bg-red-600 hover:text-white transition-all group flex flex-col items-center text-center">
                    <Volume2 className="w-8 h-8 mb-4 " />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">Master Siren Activate</span>
                    <span className="font-mono text-[8px] opacity-50 uppercase tracking-widest mt-2">External Output: 110dB</span>
                 </button>
                 <button className="p-8 border border-[#141414] hover:bg-[#141414] hover:text-white transition-all group flex flex-col items-center text-center">
                    <Smartphone className="w-8 h-8 mb-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">SMS Emergency Blast</span>
                    <span className="font-mono text-[8px] opacity-50 uppercase tracking-widest mt-2">Est. Delivery: 4,200 Devices</span>
                 </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                 <input 
                   type="text" 
                   placeholder="Enter custom advisory message..." 
                   className="flex-1 bg-gray-50 border border-[#141414] px-6 py-4 font-mono text-xs outline-none focus:bg-white transition-colors"
                 />
                 <button className="bg-[#141414] text-white p-4 hover:bg-black transition-colors">
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Active Alert Table */}
           <div className="bg-white border border-[#141414]">
              <div className="p-6 border-b border-[#141414] bg-gray-50">
                 <h3 className="font-serif italic font-bold uppercase tracking-widest text-sm">Active Threat Table</h3>
              </div>
              <div className="divide-y divide-[#141414]">
                 {activeAlerts.map(alert => (
                   <div key={alert.id} className="p-4 md:p-6 flex flex-col md:grid md:grid-cols-4 md:items-center gap-4 group hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between md:block">
                         <div>
                            <p className="font-mono text-[8px] text-gray-500 uppercase">Station/Area</p>
                            <p className="font-bold text-sm">{alert.area}</p>
                         </div>
                         <div className="md:hidden">
                            <p className="font-mono text-[8px] text-gray-500 uppercase text-right">Time</p>
                            <p className="font-mono text-xs text-right">{alert.time}</p>
                         </div>
                      </div>
                      <div className="flex justify-between md:block">
                         <div>
                            <p className="font-mono text-[8px] text-gray-500 uppercase">Subject</p>
                            <p className="font-bold text-sm tracking-tight">{alert.subject}</p>
                         </div>
                         <div className="md:hidden">
                            <span className="font-mono text-[8px] px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 uppercase tracking-widest">
                               {alert.threat}
                            </span>
                         </div>
                      </div>
                      <div className="hidden md:block">
                         <p className="font-mono text-[8px] text-gray-500 uppercase">Alert Time</p>
                         <p className="font-mono text-xs">{alert.time}</p>
                      </div>
                      <div className="flex justify-start md:justify-end gap-2">
                         <button className="flex-1 md:flex-none px-3 py-2 md:py-1 border border-[#141414] font-mono text-[10px] md:text-[8px] uppercase tracking-widest hover:bg-[#141414] hover:text-white transition-all">Dismiss</button>
                         <button className="flex-1 md:flex-none px-3 py-2 md:py-1 bg-red-600 text-white font-mono text-[10px] md:text-[8px] uppercase tracking-widest hover:bg-red-700 transition-all">Escalate</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* System Logs & Integrity */}
        <div className="bg-[#141414] text-white p-8 flex flex-col">
           <div className="flex items-center gap-3 mb-8">
              <History className="w-5 h-5 text-[#60bb46]" />
              <h3 className="font-serif italic font-bold text-lg uppercase tracking-widest">Protocol Logs</h3>
           </div>
           
           <div className="flex-1 space-y-6 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">
              <div className="flex gap-4">
                 <span className="text-[#60bb46] shrink-0">[09:40]</span>
                 <span>Siren node #12 heart-beat received.</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-[#60bb46] shrink-0">[09:32]</span>
                 <span>SMS Gateway daily quota sync: 100k/100k</span>
              </div>
              <div className="flex gap-4">
                 <span className="text-amber-500 shrink-0">[09:15]</span>
                 <span className="text-amber-500">Node #04 reported low battery (12%). Deployment unit notified.</span>
              </div>
              <div className="flex gap-4 opacity-40">
                 <span className="shrink-0">[08:45]</span>
                 <span>Automatic daily backup completed.</span>
              </div>
              <div className="flex gap-4 opacity-40">
                 <span className="shrink-0">[08:00]</span>
                 <span>System integrity check passed with 100% score.</span>
              </div>
           </div>

           <div className="mt-12 p-6 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                 <AlertTriangle className="w-4 h-4 text-amber-500" />
                 <span className="font-mono text-[10px] text-amber-500 font-bold tracking-widest">Maintenance Alert</span>
              </div>
              <p className="font-mono text-[10px] opacity-60 leading-relaxed uppercase tracking-wider">
                 Camera #08 Vision lens requires cleaning. Obstruction detected in upper-left quadrant.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AlertView;
