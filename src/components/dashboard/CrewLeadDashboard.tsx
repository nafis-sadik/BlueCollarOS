import React, { useState } from 'react';
import StatCard from './StatCard';
import { 
  Play, 
  CheckCircle2, 
  Camera, 
  MessageSquare, 
  AlertCircle,
  Clock,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { motion, AnimatePresence } from 'motion/react';

export default function CrewLeadDashboard() {
  const { jobs } = useRole();
  const [jobStarted, setJobStarted] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const activeJob = jobs[0];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Today's Job Site</h2>
          <p className="text-gray-500 font-medium">Manage your crew and report progress.</p>
        </div>
        {!jobStarted ? (
          <button 
            onClick={() => {
              setJobStarted(true);
              setShowChecklist(true);
            }}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Job</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold border border-green-100">
            <span className="relative flex h-3 w-3 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Clocked In: 08:30 AM
          </div>
        )}
      </div>

      {/* Hero Job Card */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Active Now</span>
                <span className="text-xs text-gray-400 font-bold tracking-tighter uppercase">Job ID: #420-MAPLE</span>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">{activeJob.title}</h3>
              <p className="text-gray-500 flex items-center font-medium">
                <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                {activeJob.address}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                <Camera className="w-4 h-4 text-gray-500" />
                <span>Add Photo</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span>Job Chat</span>
              </button>
              <button className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                <AlertCircle className="w-4 h-4" />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900">{activeJob.progress}%</span>
                <span className="text-xs text-gray-500 mb-1 font-medium">of scope</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${activeJob.progress}%` }} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timeline</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900">Day 4</span>
                <span className="text-xs text-gray-500 mb-1 font-medium">of 10</span>
              </div>
              <p className="text-[10px] text-green-600 font-bold uppercase mt-1">On Schedule</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Crew Attendance</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900">4/4</span>
                <span className="text-xs text-gray-500 mb-1 font-medium">Present</span>
              </div>
              <div className="flex -space-x-2 mt-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-100" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Required Forms</h3>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">2 Action items</span>
          </div>
          <div className="space-y-4">
            <div 
              onClick={() => setShowChecklist(true)}
              className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <ClipboardList className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Midday Check-in</p>
                  <p className="text-[10px] text-gray-500 font-medium">Due at 12:30 PM (in 15m)</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent grayscale opacity-50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">End-of-Day Report</p>
                  <p className="text-[10px] text-gray-500 font-medium tracking-tight">Available at 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Manager Communications</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">From: Mike (Manager)</p>
              <p className="text-sm text-blue-900 font-medium leading-relaxed italic">
                "Sarah mentioned she'll be home late today. Please ensure all exterior gates are locked before you leave the site."
              </p>
              <p className="text-[10px] text-blue-400 font-bold mt-2 uppercase tracking-tight">11:05 AM</p>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-bold hover:border-primary hover:text-primary transition-all">
              Request Manager Call / Support
            </button>
          </div>
        </div>
      </div>

      {/* Checklist / Form Modal Simulation */}
      <AnimatePresence>
        {showChecklist && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChecklist(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Required Form</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">Midday Check-In</h3>
                  </div>
                  <button onClick={() => setShowChecklist(false)} className="text-gray-400 hover:text-gray-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-700">1. Is everything going well?</p>
                    <div className="flex space-x-2">
                       <button className="flex-1 py-3 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 font-bold text-sm transition-all ring-offset-2 focus:ring-2 ring-green-500">YES</button>
                       <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold text-sm transition-all hover:border-red-200 hover:text-red-500">NO</button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-700">2. Any client concerns reported?</p>
                    <textarea 
                      placeholder="Enter details or leave blank..." 
                      className="w-full h-24 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-gray-700">3. Need additional materials?</p>
                    <div className="flex items-center space-x-2">
                       <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                       <span className="text-sm font-medium text-gray-600">Yes, notify manager now</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setShowChecklist(false);
                      setJobStarted(true);
                    }}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 mt-4"
                  >
                    Submit Report & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
