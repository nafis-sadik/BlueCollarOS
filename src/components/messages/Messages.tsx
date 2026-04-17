import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { Message, Conversation } from '../../types';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Hash, 
  User, 
  Hammer, 
  Phone, 
  Video,
  Info,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';

const mockMessages: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', senderId: '1', senderName: 'Mike Foreman', senderRole: 'CREW_LEAD', text: 'Team, the kitchen cabinets just arrived at 42 Maple.', timestamp: '10:15 AM', type: 'TEXT' },
    { id: 'm2', senderId: '2', senderName: 'Alex Worker', senderRole: 'CREW_MEMBER', text: 'Great, I will start unpacking them immediately.', timestamp: '10:17 AM', type: 'TEXT' },
    { id: 'm3', senderId: '4', senderName: 'John Doe', senderRole: 'CREW_MEMBER', text: 'Hardware is mostly here too, just checking the hinges.', timestamp: '10:20 AM', type: 'TEXT' },
    { id: 'm4', senderId: '1', senderName: 'Mike Foreman', senderRole: 'CREW_LEAD', text: 'Make sure you check for any transit damage before setting them.', timestamp: '10:25 AM', type: 'TEXT' },
    { id: 'm4.5', senderId: '1', senderName: 'Mike Foreman', senderRole: 'CREW_LEAD', text: 'Floor looks level, starting the base units.', timestamp: '10:45 AM', type: 'TEXT' },
  ],
  'c2': [
    { id: 'm5', senderId: '1', senderName: 'Mike Foreman', senderRole: 'CREW_LEAD', text: 'Checking in on the siding delivery.', timestamp: 'Yesterday', type: 'TEXT' },
    { id: 'm6', senderId: 'current', senderName: 'Admin', senderRole: 'OWNER', text: 'It is scheduled for tomorrow morning.', timestamp: 'Yesterday', type: 'TEXT' },
  ],
  'c3': [
    { id: 'm7', senderId: '3', senderName: 'Sarah Manager', senderRole: 'MANAGER', text: 'Did you see the new safety SOP?', timestamp: '2h ago', type: 'TEXT' },
  ],
  'c4': [
    { id: 'm8', senderId: '3', senderName: 'Sarah Manager', senderRole: 'MANAGER', text: 'Safety meeting at 7:30 tomorrow.', timestamp: '3h ago', type: 'TEXT' },
  ]
};

export default function Messages() {
  const { conversations, activeConversationId, setActiveConversationId, workforce, role } = useRole();
  const [messageInput, setMessageInput] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = mockMessages[activeConv.id] || [];

  const handleSelectConv = (id: string) => {
    setActiveConversationId(id);
    setShowMobileSidebar(false);
  };

  const getConvIcon = (type: Conversation['type']) => {
    switch (type) {
      case 'JOB': return Hammer;
      case 'CHANNEL': return Hash;
      case 'DIRECT': return User;
      default: return Hash;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-3xl border border-border-theme shadow-sm overflow-hidden flex animate-in fade-in duration-500">
      {/* Messages Sidebar */}
      <div className={cn(
        "w-full md:w-[320px] border-r border-border-theme flex flex-col bg-slate-50/30 transition-all",
        !showMobileSidebar && "hidden md:flex"
      )}>
        <div className="p-6 border-b border-border-theme">
          <h2 className="text-xl font-bold text-text-main">Messages</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white border border-border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Threads</p>
          </div>
          
          {conversations.map(conv => {
            const Icon = getConvIcon(conv.type);
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={cn(
                  "w-full flex items-center p-3 rounded-2xl transition-all group",
                  isActive ? "bg-white shadow-sm border border-border-theme" : "hover:bg-slate-100/50 border border-transparent"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  isActive ? "bg-primary text-white" : "bg-white text-slate-400 group-hover:text-primary transition-colors border border-border-theme shadow-sm"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 text-left overflow-hidden flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn("text-sm font-bold truncate", isActive ? "text-text-main" : "text-text-muted group-hover:text-text-main")}>
                      {conv.name}
                    </h4>
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-white transition-all",
        showMobileSidebar && "hidden md:flex"
      )}>
        {/* Chat Header */}
        <div className="h-[72px] px-6 border-b border-border-theme flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden p-2 mr-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-muted" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-border-theme flex items-center justify-center text-primary shadow-sm mr-3">
              {React.createElement(getConvIcon(activeConv.type), { className: "w-5 h-5" })}
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-main">{activeConv.name}</h3>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                {activeConv.type === 'DIRECT' ? 'Online' : `${activeConv.participants.length} members`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-4">
            <button className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-slate-50 rounded-lg hidden sm:block">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-slate-50 rounded-lg hidden sm:block">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 text-text-muted hover:text-text-main transition-colors hover:bg-slate-50 rounded-lg">
              <Info className="w-4 h-4" />
            </button>
            <button className="p-2 text-text-muted hover:text-text-main transition-colors hover:bg-slate-50 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
          {activeMessages.map((msg, i) => {
            const isMe = msg.senderId === 'current' || (role === 'CREW_LEAD' && msg.senderId === '1');
            return (
              <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                {!isMe && (
                  <div className="flex items-center mb-1 ml-1 space-x-2">
                    <span className="text-[10px] font-bold text-text-main">{msg.senderName}</span>
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 rounded uppercase tracking-tighter">
                      {msg.senderRole.replace('_', ' ')}
                    </span>
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                  isMe 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white text-text-main border border-border-theme rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[9px] font-bold text-text-muted mt-1 px-1 uppercase tracking-tighter">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border-theme bg-white shrink-0">
          <div className="bg-slate-50 border border-border-theme rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
            <textarea 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..." 
              className="w-full bg-transparent border-none outline-none text-sm p-3 resize-none h-12"
            />
            <div className="flex items-center justify-between mt-2 border-t border-slate-200 pt-2 px-1">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-white rounded-lg">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-white rounded-lg">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
              <button 
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold flex items-center transition-all",
                  messageInput.trim() ? "bg-primary text-white shadow-lg active:scale-95" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-text-muted mt-3 font-medium uppercase tracking-widest">
            Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
