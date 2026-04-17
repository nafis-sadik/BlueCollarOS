import React from 'react';
import StatCard from './StatCard';
import { 
  Users, 
  Briefcase, 
  MapPin, 
  FileText, 
  AlertTriangle,
  ClipboardList,
  Clock
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { cn } from '../../lib/utils';

export default function ManagerDashboard() {
  const { jobs } = useRole();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Operations Overview</h2>
        <p className="text-gray-500 font-medium">Monitoring your assigned crews and active job sites.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="My Active Jobs" 
          value={8} 
          icon={Briefcase} 
          subtext="3 ending this week"
          color="text-blue-600"
        />
        <StatCard 
          label="Active Crews" 
          value={5} 
          icon={Users} 
          subtext="22 members on site"
          color="text-green-600"
        />
        <StatCard 
          label="Pending Approvals" 
          value={14} 
          icon={FileText} 
          subtext="Expenses and midday forms"
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Current Job Status</h3>
            <button className="text-xs font-bold text-primary uppercase tracking-widest">Map View</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.slice(0, 4).map(job => (
              <div key={job.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.address}
                    </p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter",
                    job.status === 'ACTIVE' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {job.status}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-700">{job.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                    ))}
                  </div>
                  <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Issues</h3>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Material Shortage', job: '42 Maple St', level: 'HIGH', time: '10 min ago' },
              { id: 2, title: 'Weather Delay', job: '81 Pine Ave', level: 'MEDIUM', time: '45 min ago' },
              { id: 3, title: 'Equipment Failure', job: '17 Main St', level: 'URGENT', time: '1h ago' },
            ].map(issue => (
              <div key={issue.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  issue.level === 'URGENT' ? "bg-red-50 text-red-600" : issue.level === 'HIGH' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                )}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{issue.title}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">{issue.job}</p>
                  <p className="text-[10px] text-gray-500 mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {issue.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg">
            Escalate New Issue
          </button>
        </div>
      </div>
    </div>
  );
}
