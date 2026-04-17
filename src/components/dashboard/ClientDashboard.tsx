import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ChevronRight,
  MessageSquare,
  FileText,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ClientDashboard() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back, Sarah</h2>
        <p className="text-gray-500 font-medium">Tracking your Kitchen Renovation project.</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
         <div className="bg-primary p-8 text-white relative h-48 overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Live Project</span>
              <h3 className="text-3xl font-bold mt-2">Kitchen Renovation</h3>
              <p className="text-primary-foreground/80 flex items-center mt-1 text-sm font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                42 Maple Street, Seattle
              </p>
            </div>
            {/* Visual fluff for premium feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
         </div>
         
         <div className="p-8 -mt-10 relative z-20">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50 space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-gray-900">Project Completion</p>
                    <p className="text-sm font-extrabold text-primary">65%</p>
                  </div>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary rounded-full shadow-lg shadow-primary/30"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 font-bold text-center uppercase tracking-widest">Est. Completion: April 25, 2026</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-4">
                     <div className="flex items-center space-x-2 text-primary">
                        <CheckCircle2 className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Latest Daily Update</h4>
                     </div>
                     <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        "Trim preparation was completed today. Final finishing work is expected tomorrow. The project remains active and is progressing well."
                     </p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Posted: Friday, 4:45 PM</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-4 font-sans">
                     <div className="flex items-center space-x-2 text-blue-600">
                        <Clock className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Next Step</h4>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                           <div className="w-2 h-2 rounded-full bg-blue-600" />
                           <p className="text-sm font-bold text-gray-900 leading-tight">Install backsplash tiles</p>
                        </div>
                        <div className="flex items-center space-x-3 opacity-50">
                           <div className="w-2 h-2 rounded-full bg-gray-300" />
                           <p className="text-sm font-bold text-gray-600 leading-tight">Final painting coats</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:scale-[1.03] transition-transform group">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-gray-900">Message Manager</span>
        </button>
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:scale-[1.03] transition-transform group">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors relative">
            <CreditCard className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
          <span className="text-sm font-bold text-gray-900">Pay Final Invoice</span>
        </button>
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:scale-[1.03] transition-transform group">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-gray-900">Project Documents</span>
        </button>
      </div>

      <div className="bg-gray-900 text-white p-8 rounded-[32px] flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-lg font-bold">Your satisfaction is guaranteed.</h4>
               <p className="text-sm text-gray-400 font-medium">Review our 2-year warranty policy on all labor and materials.</p>
            </div>
         </div>
         <ChevronRight className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}
