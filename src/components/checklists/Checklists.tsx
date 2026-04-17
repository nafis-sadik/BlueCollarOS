import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Camera,
  Signature,
  ArrowRight,
  History,
  Info,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Checklists() {
  const { checklists, role } = useRole();
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [completedForms, setCompletedForms] = useState<Set<string>>(new Set(['f1']));
  const [answers, setAnswers] = useState<Record<string, Record<number, boolean>>>({});

  const activeForm = checklists.find(f => f.id === activeFormId);

  const toggleAnswer = (formId: string, questionIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [formId]: {
        ...(prev[formId] || {}),
        [questionIdx]: !(prev[formId]?.[questionIdx])
      }
    }));
  };

  const isFormComplete = (formId: string) => {
    const form = checklists.find(f => f.id === formId);
    if (!form) return false;
    const formAnswers = answers[formId] || {};
    return form.questions.every((_, idx) => formAnswers[idx]);
  };

  const handleSubmit = (formId: string) => {
    setCompletedForms(prev => new Set([...prev, formId]));
    setActiveFormId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">Field Checklists & Forms</h1>
          <p className="text-text-muted text-sm font-medium">Compliance, safety, and progress reporting.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-border-theme rounded-xl text-xs font-bold text-text-muted hover:text-text-main transition-colors">
            <History className="w-4 h-4 mr-2" />
            Archive
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
            New Inspection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-border-theme shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border-theme bg-slate-50/50">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">Available Forms</h3>
            </div>
            
            <div className="divide-y divide-border-theme">
              {checklists.map(form => {
                const isCompleted = completedForms.has(form.id);
                return (
                  <div key={form.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-colors",
                        isCompleted ? "bg-green-50 border-green-100 text-green-600" : "bg-white border-border-theme text-slate-400 group-hover:text-primary group-hover:border-primary/20"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <ClipboardCheck className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-text-main">{form.title}</h4>
                          <span className={cn(
                            "px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-widest",
                            form.type === 'PRE_JOB' ? "bg-blue-100 text-blue-600" :
                            form.type === 'MIDDAY' ? "bg-orange-100 text-orange-600" :
                            form.type === 'POST_JOB' ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
                          )}>
                            {form.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          Requires {form.questions.length} safety checks and photo documentation.
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => !isCompleted && setActiveFormId(form.id)}
                      className={cn(
                        "flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                        isCompleted 
                          ? "bg-slate-50 text-slate-400 cursor-default" 
                          : "bg-white border border-border-theme text-text-main hover:border-primary hover:text-primary shadow-sm active:scale-95"
                      )}
                    >
                      {isCompleted ? 'Submitted' : 'Start Form'}
                      {!isCompleted && <ArrowRight className="w-3.5 h-3.5 ml-2" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidelines info */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-start space-x-4">
            <div className="p-2 bg-blue-100/50 rounded-xl text-blue-600">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-900">Compliance Notice</h4>
              <p className="text-xs text-blue-700/80 leading-relaxed mt-1">
                All forms marked as "PRE_JOB" must be submitted within 30 minutes of clock-in. Failure to submit daily reports may affect job site safety scores and crew lead bonuses.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <h3 className="text-lg font-bold mb-6 flex items-center relative z-10">
              <TrendingUp className="w-5 h-5 mr-3 text-blue-400" />
              Daily Summary
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion Rate</p>
                  <p className="text-3xl font-black">75%</p>
                </div>
                <div className="text-xs font-bold text-green-400 flex items-center mb-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs LW
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Progress</span>
                  <span>3/4 Forms</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>Morning Walkthrough completed</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Remaining: 3 Forms</span>
                </div>
              </div>
            </div>

            {/* Aesthetic circle */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4">Required Documents</h3>
            <div className="space-y-3">
               {[
                 { title: 'Site Permit #412', status: 'Verified', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
                 { title: 'Insurance COI', status: 'Expiring', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
                 { title: 'Owner Contract', status: 'Signed', icon: Signature, color: 'text-green-500', bg: 'bg-green-50' },
               ].map((doc, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-3">
                       <div className={cn("p-1.5 rounded-lg", doc.bg)}>
                          <doc.icon className={cn("w-4 h-4", doc.color)} />
                       </div>
                       <span className="text-xs font-bold text-text-main">{doc.title}</span>
                    </div>
                    <span className={cn("text-[9px] font-black uppercase tracking-tighter", doc.color)}>{doc.status}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {activeForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFormId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-border-theme shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                      {activeForm.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-2xl font-bold text-text-main mt-2">{activeForm.title}</h3>
                  </div>
                  <button onClick={() => setActiveFormId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-text-main transition-colors">
                    <ArrowRight className="w-6 h-6 rotate-45" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Questions</p>
                  <div className="space-y-3">
                    {activeForm.questions.map((q, idx) => (
                      <div 
                        key={idx}
                        onClick={() => toggleAnswer(activeForm.id, idx)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                          answers[activeForm.id]?.[idx] 
                            ? "bg-primary/5 border-primary shadow-sm" 
                            : "bg-white border-border-theme hover:border-slate-300"
                        )}
                      >
                        <span className={cn("text-sm font-bold", answers[activeForm.id]?.[idx] ? "text-text-main" : "text-slate-500")}>
                          {q}
                        </span>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                          answers[activeForm.id]?.[idx] ? "bg-primary border-primary text-white" : "border-slate-200 group-hover:border-slate-300"
                        )}>
                          {answers[activeForm.id]?.[idx] && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Media Documentation</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-theme rounded-2xl bg-slate-50/50 hover:bg-white hover:border-primary/50 transition-all text-slate-400 hover:text-primary group">
                      <Camera className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-theme rounded-2xl bg-slate-50/50 hover:bg-white hover:border-primary/50 transition-all text-slate-400 hover:text-primary group">
                      <FileText className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Add Note</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-border-theme bg-slate-50/50 shrink-0">
                <button 
                  onClick={() => isFormComplete(activeForm.id) && handleSubmit(activeForm.id)}
                  disabled={!isFormComplete(activeForm.id)}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold transition-all shadow-xl",
                    isFormComplete(activeForm.id)
                      ? "bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  )}
                >
                  Submit Final Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

