import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Map as MapIcon, 
  ShieldAlert, 
  Camera, 
  Settings, 
  Search, 
  Bell, 
  User,
  Activity,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Lazy load views for cleaner structure (or directly import for prototype)
import DashboardView from './components/views/DashboardView';
import MapView from './components/views/MapView';
import ScannerView from './components/views/ScannerView';
import AlertView from './components/views/AlertView';
import FinanceView from './components/views/FinanceView';

type View = 'dashboard' | 'map' | 'scanner' | 'alerts' | 'finance';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Monitor', icon: BarChart3 },
    { id: 'map', label: 'Live Map', icon: MapIcon },
    { id: 'scanner', label: 'Detection', icon: Camera },
    { id: 'alerts', label: 'Early Warning', icon: ShieldAlert },
    { id: 'finance', label: 'Eco-Fintech', icon: Heart },
  ];

  // Auto-close mobile menu on desktop or view change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeView]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex bg-[#141414] text-white transition-all duration-300 flex-col border-r border-[#141414]",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#60bb46] rounded-sm flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-mono text-lg font-bold tracking-tighter uppercase italic truncate">
              WildGuard <span className="text-[#60bb46]">AI</span>
            </span>
          )}
        </div>

        <nav className="flex-1 mt-10">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center px-6 py-4 transition-all hover:bg-white hover:text-[#141414]",
                activeView === item.id ? "bg-white text-[#141414]" : "text-gray-400"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="ml-4 font-mono text-xs uppercase tracking-widest truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold truncate">Warden #042</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter truncate">Central Sector</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        {/* Responsive Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-[#141414] shrink-0 z-20">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-gray-100 rounded-sm transition-colors hidden md:block"
            >
              <Activity className="w-4 h-4" />
            </button>
            <div className="md:hidden w-8 h-8 bg-[#60bb46] rounded-sm flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-serif italic font-bold text-lg md:text-xl uppercase tracking-tight truncate max-w-[120px] md:max-w-none">
              {navigation.find(n => n.id === activeView)?.label}
            </h2>
            <div className="h-4 w-px bg-[#141414]/20 mx-1 md:mx-0" />
            <div className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[10px] uppercase tracking-widest font-mono text-gray-500 truncate">
              <Activity className="w-2 md:w-3 h-2 md:h-3 text-[#60bb46] animate-pulse" />
              <span className="hidden sm:inline">System Status:</span> Nominal
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-4 md:w-5 h-4 md:h-5" />
              <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-1.5 md:w-2 h-1.5 md:h-2 bg-red-600 rounded-full border border-white" />
            </button>
            <div className="h-8 w-px bg-[#141414]/20" />
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] opacity-50 uppercase tracking-widest font-mono">Ops</span>
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase truncate max-w-[80px] md:max-w-none">WWF HUB</span>
            </div>
          </div>
        </header>

        {/* View Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-[#E4E3E0] pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 md:p-8 h-full"
            >
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'map' && <MapView />}
              {activeView === 'scanner' && <ScannerView />}
              {activeView === 'alerts' && <AlertView />}
              {activeView === 'finance' && <FinanceView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#141414] text-white flex items-center justify-around px-2 shadow-2xl z-50 border border-white/10">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 transition-all rounded-sm",
                activeView === item.id ? "bg-[#60bb46] text-white" : "text-gray-400"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-[7px] uppercase tracking-tighter mt-1 font-mono font-bold">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default App;
