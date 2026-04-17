import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Calendar, 
  FileText, 
  User, 
  ClipboardList, 
  ChevronRight,
  Filter,
  Search,
  MoreVertical,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Approvals() {
  const { approvals } = useRole();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);

  const filteredApprovals = approvals.filter(a => filter === 'ALL' || a.status === filter);
  const selectedApproval = approvals.find(a => a.id === selectedApprovalId);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EXPENSE': return <DollarSign className="w-5 h-5" />;
      case 'TIMESHEET': return <Clock className="w-5 h-5" />;
      case 'CHANGE_ORDER': return <ClipboardList className="w-5 h-5" />;
      case 'LEAVE': return <Calendar className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const statusColors = {
    PENDING: 'bg-orange-50 text-orange-600 border-orange-100',
    APPROVED: 'bg-green-50 text-green-600 border-green-100',
    REJECTED: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">Approvals</h1>
          <p className="text-text-muted text-sm font-medium">Review and manage pending requests from your team.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white border border-border-theme rounded-2xl p-1 shadow-sm">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize",
                filter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-muted hover:text-text-main hover:bg-slate-50"
              )}
            >
              {f.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* List View */}
        <div className={cn("xl:col-span-8 space-y-4", selectedApprovalId && "hidden xl:block")}>
          <div className="bg-white rounded-3xl border border-border-theme shadow-sm overflow-hidden min-h-[500px]">
            <div className="p-6 border-b border-border-theme flex items-center justify-between bg-slate-50/50">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search requests..." 
                  className="w-full bg-white border border-border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <button className="ml-4 p-2 text-text-muted hover:text-text-main transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-border-theme">
              {filteredApprovals.length > 0 ? (
                filteredApprovals.map((req) => (
                  <button
                    key={req.id}
                    onClick={() => setSelectedApprovalId(req.id)}
                    className={cn(
                      "w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-all group",
                      selectedApprovalId === req.id && "bg-slate-50 ring-1 ring-inset ring-primary/20"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-primary bg-primary/5 border border-primary/10 shadow-sm group-hover:scale-105 transition-transform"
                      )}>
                        {getTypeIcon(req.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-text-main">{req.title}</h4>
                          {req.amount && <span className="text-xs font-bold text-primary">{req.amount}</span>}
                        </div>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-text-muted font-medium">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {req.requesterName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {req.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold border capitalize",
                        statusColors[req.status]
                      )}>
                        {req.status.toLowerCase()}
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-main">No requests found</h3>
                    <p className="text-xs text-text-muted">There are no {filter.toLowerCase()} approvals to display.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail View / Selected Request */}
        <div className={cn("xl:col-span-4", !selectedApprovalId && "hidden xl:block")}>
          <AnimatePresence mode="wait">
            {selectedApproval ? (
              <motion.div
                key={selectedApproval.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-border-theme shadow-sm overflow-hidden h-full flex flex-col"
              >
                <div className="p-8 border-b border-border-theme shrink-0 relative">
                  <button 
                    onClick={() => setSelectedApprovalId(null)}
                    className="xl:hidden absolute top-4 right-4 p-2 hover:bg-slate-50 rounded-full text-slate-400"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{selectedApproval.type.replace('_', ' ')}</p>
                  <h3 className="text-xl font-bold text-text-main leading-tight">{selectedApproval.title}</h3>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-text-main">{selectedApproval.requesterName}</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Description</p>
                    <p className="text-sm text-text-main leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-border-theme">
                      {selectedApproval.description}
                    </p>
                  </div>

                  {selectedApproval.jobTitle && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Related Project</p>
                      <div className="flex items-center p-4 rounded-2xl border border-border-theme bg-white shadow-sm ring-1 ring-inset ring-slate-50">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mr-3">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-main">{selectedApproval.jobTitle}</p>
                          <p className="text-[9px] text-text-muted font-bold tracking-tighter uppercase">Job ID: {selectedApproval.jobId}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-border-theme text-center">
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Date Submitted</p>
                      <p className="text-xs font-bold text-text-main">{selectedApproval.date}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-border-theme text-center">
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Priority</p>
                      <div className="flex items-center justify-center text-primary">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs font-bold">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedApproval.status === 'PENDING' && (
                  <div className="p-8 border-t border-border-theme bg-slate-50/50 space-y-3 shrink-0">
                    <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Approve Request
                    </button>
                    <button className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-2xl font-bold flex items-center justify-center hover:bg-red-50 transition-all">
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full bg-slate-50/50 rounded-3xl border-2 border-dashed border-border-theme flex flex-col items-center justify-center p-8 text-center text-slate-300">
                <ClipboardList className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-sm font-bold uppercase tracking-widest">Select a request to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
