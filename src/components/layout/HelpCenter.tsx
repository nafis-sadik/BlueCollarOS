import React from 'react';
import { 
  Search, 
  Book, 
  MessageSquare, 
  Play, 
  HelpCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function HelpCenter() {
  const faqs = [
    { q: 'How do I clock in for a job?', a: 'Navigate to the Today\'s Work tab and press the blue Clock In button at the top of the interface.' },
    { q: 'Can I edit a submitted checklist?', a: 'Once a checklist is finalized, it requires Manager approval to unlock for edits. Contact your Crew Lead.' },
    { q: 'Where are my training certificates?', a: 'Visit the Training & SOPs module. Completed modules will have a "Download Certificate" option.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-black text-text-main tracking-tight">How can we help?</h1>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search documentation, tutorials, or FAQs..." 
            className="w-full bg-white border border-border-theme rounded-2xl py-4 pl-12 pr-6 shadow-xl shadow-slate-200/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Knowledge Base', icon: Book, desc: 'Detailed guides on every module.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Video Tutorials', icon: Play, desc: 'Watch how to use specific features.', color: 'text-purple-600', bg: 'bg-purple-50' },
          { title: 'Live Support', icon: MessageSquare, desc: 'Chat with our success team.', color: 'text-green-600', bg: 'bg-green-50' },
        ].map(card => (
          <button key={card.title} className="bg-white p-6 rounded-3xl border border-border-theme text-left hover:border-primary transition-all group shadow-sm">
            <div className={`p-3 rounded-2xl ${card.bg} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="font-bold text-text-main mb-1">{card.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-main flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map(faq => (
            <div key={faq.q} className="bg-white p-6 rounded-2xl border border-border-theme shadow-sm">
              <h4 className="font-bold text-text-main text-sm mb-2">{faq.q}</h4>
              <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-text-main">Developer API Docs</h3>
            <p className="text-sm text-text-muted">Want to integrate with BlueCollarOS? Read our technical documentation.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white border border-border-theme rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
          Visit Developer Hub
        </button>
      </div>
    </div>
  );
}
