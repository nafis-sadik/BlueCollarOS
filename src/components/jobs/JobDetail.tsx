import React from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Calendar, 
  Clock,
  Camera,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  ChevronRight,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function JobDetail() {
  const { selectedJobId, setSelectedJobId, jobs } = useRole();
  const job = jobs.find(j => j.id === selectedJobId) || jobs[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setSelectedJobId(null)}
        className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Overview</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest",
                job.status === 'ACTIVE' ? "bg-green-50 text-green-600 border border-green-100" : "bg-orange-50 text-orange-600 border border-orange-100"
              )}>
                {job.status}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">{job.title}</h2>
              <div className="flex flex-wrap gap-4 text-gray-500">
                <div className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                  {job.address}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <User className="w-4 h-4 mr-1.5 text-gray-400" />
                  Client: {job.clientName}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                  Ends: {new Date(job.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{job.progress}%</p>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${job.progress}%` }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Budget Used</p>
                  <p className="text-2xl font-bold text-gray-900">$12,450</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">of $22,000 Est.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Crew Lead</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
                    <p className="text-sm font-bold text-gray-900 leading-tight">Adam Robinson</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Job Timeline</h3>
                <button className="text-xs font-bold text-primary uppercase tracking-widest">View Full Log</button>
             </div>
             <div className="p-6 space-y-6">
                {[
                  { date: 'Today, 4:45 PM', role: 'Crew Lead', text: 'Daily report submitted. Trim prep finished. Materials for tomorrow verified.', type: 'REPORT' },
                  { date: 'Today, 1:15 PM', role: 'System', text: 'Midday check-in completed by Adam. All systems green.', type: 'SYSTEM' },
                  { date: 'Yesterday, 5:00 PM', role: 'Manager', text: 'Client request: Sarah wants to verify the paint sheen on the backsplash area before final coat.', type: 'NOTICE' },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4 relative">
                    {idx < 2 && <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-gray-100" />}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm",
                      item.type === 'REPORT' ? "bg-green-500 text-white" : item.type === 'NOTICE' ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      {item.type === 'REPORT' ? <ClipboardList className="w-4 h-4" /> : item.type === 'NOTICE' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-tight">{item.role}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Manager Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                    <Camera className="w-5 h-5 mb-2 text-gray-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase">Photos</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                    <MessageSquare className="w-5 h-5 mb-2 text-gray-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase">Chat</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                    <FileText className="w-5 h-5 mb-2 text-gray-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase">Estimate</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                    <AlertCircle className="w-5 h-5 mb-2 text-gray-400 group-hover:text-primary" />
                    <span className="text-[10px] font-bold uppercase">Issue</span>
                 </button>
              </div>
           </div>

           <div className="bg-gray-900 p-6 rounded-3xl text-white space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Client Portal Active</h3>
              <p className="text-xs text-gray-300 font-medium">Sarah Johnson can view 12 filtered updates and 4 progress photos.</p>
              <button className="w-full py-3 bg-white text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
                 Preview as Client
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
