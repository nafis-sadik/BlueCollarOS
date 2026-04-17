import React, { useState } from 'react';
import { useRole, SOP, TrainingModule } from '../../context/RoleContext';
import { 
  BookOpen, 
  Search, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  Download,
  Shield,
  Truck,
  MessageSquare,
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const categoryIcons = {
  SAFETY: Shield,
  OPERATIONS: Truck,
  EQUIPMENT: Settings,
  CUSTOMER_SERVICE: MessageSquare,
};

const categoryColors = {
  SAFETY: 'text-red-600 bg-red-50',
  OPERATIONS: 'text-blue-600 bg-blue-50',
  EQUIPMENT: 'text-amber-600 bg-amber-50',
  CUSTOMER_SERVICE: 'text-purple-600 bg-purple-50',
};

export default function Training() {
  const { sops, trainingModules, role } = useRole();
  const [activeSubTab, setActiveSubTab] = useState<'Library' | 'SOPs'>('Library');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTraining = trainingModules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSOPs = sops.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Knowledge Base</h1>
          <p className="text-text-muted text-sm mt-1">Standard operating procedures and skill development modules.</p>
        </div>
        
        {role === 'OWNER' && (
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-lg text-sm font-medium text-text-main hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2 text-text-muted" />
              Download All
            </button>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-sm transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              Create Document
            </button>
          </div>
        )}
      </div>

      {/* Sub-navigation */}
      <div className="flex border-b border-border-theme">
        <button 
          onClick={() => setActiveSubTab('Library')}
          className={cn(
            "px-6 py-3 text-sm font-bold border-b-2 transition-all",
            activeSubTab === 'Library' 
              ? "border-primary text-primary" 
              : "border-transparent text-text-muted hover:text-text-main"
          )}
        >
          Training Library
        </button>
        <button 
          onClick={() => setActiveSubTab('SOPs')}
          className={cn(
            "px-6 py-3 text-sm font-bold border-b-2 transition-all",
            activeSubTab === 'SOPs' 
              ? "border-primary text-primary" 
              : "border-transparent text-text-muted hover:text-text-main"
          )}
        >
          SOP Documents
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input 
          type="text" 
          placeholder={`Search ${activeSubTab === 'Library' ? 'modules' : 'procedures'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-border-theme rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {activeSubTab === 'Library' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTraining.map((module) => (
            <div key={module.id} className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden group hover:border-primary transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-white text-[10px] font-bold">
                  {module.duration}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-text-main leading-tight group-hover:text-primary transition-colors">{module.title}</h3>
                  {module.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : module.status === 'IN_PROGRESS' ? (
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : null}
                </div>
                <p className="text-xs text-text-muted line-clamp-2 mb-4 leading-relaxed">{module.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    {module.status.replace('_', ' ')}
                  </div>
                  <button className="text-[11px] font-bold text-primary hover:underline flex items-center">
                    {module.status === 'COMPLETED' ? 'Review' : 'Continue'}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border-theme shadow-sm overflow-hidden divide-y divide-border-theme">
          {filteredSOPs.map((sop) => {
            const Icon = categoryIcons[sop.category];
            const colorClass = categoryColors[sop.category];
            return (
              <div key={sop.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-5">
                  <div className={cn("p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300", colorClass)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-text-main group-hover:text-primary transition-colors">{sop.title}</h3>
                      <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{sop.category}</span>
                    </div>
                    <div className="flex items-center text-xs text-text-muted space-x-4 mb-3">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Updated {sop.lastUpdated}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        By {sop.author}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted line-clamp-1 leading-relaxed">{sop.content}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all self-center ml-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Progress Section for Crew */}
      {role !== 'OWNER' && activeSubTab === 'Library' && (
        <div className="p-6 bg-slate-900 rounded-2xl text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold italic tracking-tight">Your Learning Path</h3>
              <p className="text-blue-100/60 text-xs mt-1">Complete your assigned modules to stay compliant and unlock professional growth.</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">65%</p>
                <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Yearly Completion</p>
              </div>
              <div className="h-10 w-px bg-white/20 hidden md:block" />
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                View Certificates
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
        </div>
      )}
    </div>
  );
}
