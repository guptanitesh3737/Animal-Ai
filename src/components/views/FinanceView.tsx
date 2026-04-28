import React from 'react';
import { Heart, Wallet, ShieldCheck, Banknote, HelpCircle, ArrowRight, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const FinanceView: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-serif italic text-2xl md:text-3xl font-bold uppercase tracking-tight">Eco-Fintech Portal</h2>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Powered by eSewa | Instant Wildlife Compensation & Conservation Fund
          </p>
        </div>
        <div className="bg-[#60bb46] text-white px-4 py-2 flex items-center gap-3 self-start sm:self-auto">
           <Smartphone className="w-4 h-4" />
           <span className="font-mono text-[10px] font-bold uppercase tracking-widest">eSewa Linked</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Wallet & Claims */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[#141414] text-white p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#60bb46]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div>
                       <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">Available Relief Fund</p>
                       <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">NPR 1,240,500</h3>
                    </div>
                    <div className="bg-white/10 p-3 md:p-4 border border-white/10 shrink-0">
                       <Wallet className="w-6 h-6 md:w-8 md:h-8 text-[#60bb46]" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-auto">
                    <div className="space-y-1">
                       <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Active Insurance Policies</p>
                       <p className="text-xl md:text-2xl font-bold font-serif italic">1,420 Households</p>
                    </div>
                    <div className="space-y-1">
                       <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Total Disbursed (2026)</p>
                       <p className="text-xl md:text-2xl font-bold font-serif italic text-[#60bb46]">NPR 6.2M</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Claim Card */}
              <div className="bg-white border border-[#141414] p-8 group hover:bg-[#60bb46] hover:text-white transition-all cursor-pointer">
                 <ShieldCheck className="w-10 h-10 mb-6 group-hover:text-white text-[#60bb46]" />
                 <h4 className="font-serif italic font-bold text-xl uppercase mb-2">Instant Relief Claim</h4>
                 <p className="font-mono text-[10px] opacity-60 uppercase tracking-wider mb-6">Submit crop or livestock damage for AI-verified instant payout to eSewa.</p>
                 <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    <span className="font-mono text-[10px] font-bold uppercase">Submit Claim</span>
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>

              {/* Donation Card */}
              <div className="bg-white border border-[#141414] p-8 group hover:bg-[#141414] hover:text-white transition-all cursor-pointer">
                 <Heart className="w-10 h-10 mb-6 group-hover:text-[#60bb46] text-gray-300" />
                 <h4 className="font-serif italic font-bold text-xl uppercase mb-2">Conservation Stake</h4>
                 <p className="font-mono text-[10px] opacity-60 uppercase tracking-wider mb-6">Invest in community-managed anti-conflict IoT mesh networks. Earn "Eco-Credits".</p>
                 <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    <span className="font-mono text-[10px] font-bold uppercase">Support Now</span>
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
           </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-[#141414] flex flex-col">
           <div className="p-8 border-b border-[#141414] flex justify-between items-center">
              <h3 className="font-serif italic font-bold text-lg uppercase tracking-tight">Ledger / History</h3>
              <Banknote className="w-5 h-5 opacity-20" />
           </div>
           <div className="flex-1 divide-y divide-[#141414]">
             {[
               { id: 'TXN-902', user: 'Ram Bahadur', amount: '+45,000', type: 'Payout', time: 'Yesterday' },
               { id: 'TXN-881', user: 'Maya Devi', amount: '-2,500', type: 'Policy', time: 'Yesterday' },
               { id: 'TXN-820', user: 'Nitesh Gupta', amount: '+12,000', type: 'Reward', time: '2 days ago' },
               { id: 'TXN-741', user: 'WWF Hub', amount: '+1.2M', type: 'Funding', time: '1 wk ago' },
             ].map((txn, i) => (
               <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                     <p className="font-mono text-[10px] font-bold uppercase tracking-widest">{txn.user}</p>
                     <p className={classNames(
                        "font-mono text-xs font-bold",
                        txn.amount.startsWith('+') ? "text-[#60bb46]" : "text-[#141414]"
                     )}>{txn.amount} NPR</p>
                  </div>
                  <div className="flex justify-between items-end">
                     <span className="bg-gray-100 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest opacity-60">{txn.type}</span>
                     <span className="font-mono text-[8px] opacity-40 uppercase tracking-widest">{txn.time}</span>
                  </div>
               </div>
             ))}
           </div>
           <div className="p-6 bg-gray-50 border-t border-[#141414]">
              <div className="flex items-center gap-3">
                 <HelpCircle className="w-4 h-4 opacity-30" />
                 <p className="font-mono text-[8px] opacity-50 uppercase tracking-widest">Questions about verified payouts? Contact eSewa Support Central.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceView;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
