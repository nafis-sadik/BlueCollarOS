import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Image as ImageIcon,
  MessageSquare,
  ClipboardList
} from 'lucide-react';

export default function CrewMemberDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Today's Schedule</h2>
        <p className="text-gray-500 font-medium">Your assigned tasks and site details.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Active Site</p>
              <h3 className="font-bold text-gray-900 leading-tight">42 Maple Street - Kitchen Reno</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">08:00 AM - 04:30 PM</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Shift Duration: 8.5h</p>
          </div>
        </div>
        <div className="p-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Assigned Tasks</h4>
          <div className="space-y-3">
            {[
              { id: 1, text: 'Prep secondary walls for priming', done: true },
              { id: 2, text: 'Clean jobsite of debris', done: false },
              { id: 3, text: 'Unpack cabinet hardware', done: false },
            ].map(task => (
              <div key={task.id} className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
                <div className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                  task.done ? "bg-primary border-primary text-white" : "border-gray-300 bg-white"
                )}>
                  {task.done && <CheckCircle className="w-4 h-4" />}
                </div>
                <span className={cn("text-sm font-semibold", task.done ? "text-gray-400 line-through" : "text-gray-900")}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-primary/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-gray-900">Crew Chat</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">2 New Messages</span>
        </button>
        <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-primary/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <ClipboardList className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-gray-900">Submit Expense</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Gas, Materials, etc.</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Required Training</h4>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 border border-orange-100">
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
               <BookOpen className="w-6 h-6" />
             </div>
             <div>
               <p className="text-sm font-bold text-orange-900">Ladder Safety Protocol</p>
               <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">Due in 2 days</p>
             </div>
           </div>
           <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm shadow-orange-100">Start</button>
        </div>
      </div>
    </div>
  );
}

import { Briefcase, BookOpen } from 'lucide-react';
function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }
