import React, { useState } from 'react';
import { useRole, WorkforceMember, WorkforceStatus } from '../../context/RoleContext';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Clock, 
  Filter,
  Users,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';

const statusStyles: Record<WorkforceStatus, { label: string; bg: string; text: string; dot: string }> = {
  CLOCKED_IN: { label: 'Clocked In', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  ON_SITE: { label: 'On Site', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  OFF: { label: 'Off Duty', bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-400' },
  BREAK: { label: 'On Break', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
};

export default function Workforce() {
  const { workforce, role } = useRole();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkforce = workforce.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Staff', value: workforce.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: workforce.filter(m => ['CLOCKED_IN', 'ON_SITE'].includes(m.status)).length, icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Field Duty', value: workforce.filter(m => m.status === 'ON_SITE').length, icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Workforce Management</h1>
          <p className="text-text-muted text-sm mt-1">Monitor, manage, and coordinate your field teams.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2 text-text-muted" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-sm transition-all active:scale-95">
            <UserPlus className="w-4 h-4 mr-2" />
            Hire Member
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border-theme flex items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by name, role, or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-theme rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="text-xs text-text-muted font-medium">
            Showing {filteredWorkforce.length} members
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-theme bg-slate-50/30">
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Last Interaction</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {filteredWorkforce.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 mr-3 overflow-hidden border border-border-theme">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main">{member.name}</p>
                        <div className="flex items-center text-[11px] text-text-muted group-hover:text-primary transition-colors">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.contact}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      {member.role.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                      statusStyles[member.status].bg,
                      statusStyles[member.status].text
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mr-2", statusStyles[member.status].dot)} />
                      {statusStyles[member.status].label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-main">{member.lastActive}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-text-muted hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-border-theme shadow-none hover:shadow-sm" title="View Profile">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-text-muted hover:text-text-main hover:bg-white rounded-lg transition-all border border-transparent hover:border-border-theme shadow-none hover:shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredWorkforce.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-text-main">No members found</h3>
            <p className="text-sm text-text-muted mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold">Scaling Up?</h3>
          <p className="text-blue-100 text-sm mt-1 max-w-md">Our Enterprise tier includes background checks, automated onboarding, and compliance tracking.</p>
        </div>
        <button className="relative z-10 px-6 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg">
          Explore Advanced HR
        </button>
        <div className="absolute top-0 right-0 w-64 h-full bg-primary/20 -skew-x-12 translate-x-10" />
      </div>
    </div>
  );
}
