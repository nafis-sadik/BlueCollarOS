import React from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function JobPipeline() {
  const { jobs, branding, setSelectedJobId } = useRole();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Job Pipeline</h2>
          <p className="text-gray-500 font-medium">Tracking all operational sites and leads.</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          <Plus className="w-4 h-4" />
          <span>Create New Job</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All Jobs', 'Leads', 'Approved', 'Active', 'Delayed', 'Completed'].map((tab, idx) => (
          <button 
            key={tab}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
              idx === 0 ? "bg-gray-900 text-white" : "bg-white text-gray-500 border border-gray-100 hover:border-gray-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border-theme shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfcfd]">
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme">Project</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme">Client</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme">Progress</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme">Dates</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest border-b border-border-theme"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr 
                  key={job.id} 
                  onClick={() => setSelectedJobId(job.id)}
                  className="group hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[13px] font-semibold text-text-main group-hover:text-primary transition-colors">{job.title}</p>
                      <p className="text-[10px] text-text-muted font-medium flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.address}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-medium text-text-main">{job.clientName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "badge-theme",
                      job.status === 'ACTIVE' ? "bg-green-50 text-accent-green" : 
                      job.status === 'DELAYED' ? "bg-red-50 text-red-600" : 
                      "bg-slate-100 text-slate-500"
                    )}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${job.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-text-muted">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-[12px] font-medium text-text-muted">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-text-main transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#fcfcfd] border-t border-border-theme flex justify-between items-center">
            <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Project Portfolio: {jobs.length} Active</p>
            <div className="flex space-x-2">
                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold uppercase text-text-muted transition-all hover:bg-white active:scale-95 disabled:opacity-30" disabled>Previous</button>
                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold uppercase text-text-muted transition-all hover:bg-white active:scale-95 disabled:opacity-30" disabled>Next</button>
            </div>
        </div>
      </div>
    </div>
  );
}
