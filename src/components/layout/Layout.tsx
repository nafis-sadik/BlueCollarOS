import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useRole } from '../../context/RoleContext';
import { UserRole } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Menu, 
  Palette,
  Eye,
  Zap,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { role, setRole, branding, setBranding, setIsLoggedIn, userName } = useRole();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'OWNER', label: 'Owner', desc: 'Full business control & metrics' },
    { id: 'MANAGER', label: 'Manager', desc: 'Job oversight & approvals' },
    { id: 'CREW_LEAD', label: 'Crew Lead', desc: 'On-site reporting & field data' },
    { id: 'CREW_MEMBER', label: 'Crew Member', desc: 'Tasks & field updates' },
    { id: 'CLIENT', label: 'Client', desc: 'Project portal & status' },
  ];

  return (
    <div className="min-h-screen bg-bg-main flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isSidebarCollapsed ? "ml-[80px]" : "ml-[240px]"
      )}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-border-theme sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-slate-50 rounded-lg text-text-muted transition-colors mr-4"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2 text-text-muted hover:text-text-main transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-100 pl-6 ml-6">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-text-main leading-tight">{userName}</p>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{role.replace('_', ' ')}</p>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all group overflow-hidden relative"
                title="Logout"
              >
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] group-hover:opacity-0 transition-opacity">
                  {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <LogOut className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 max-w-[1400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Role Switcher for Demo */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowRoleMenu(!showRoleMenu)}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="font-semibold text-sm">Demo Controller: {role}</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", showRoleMenu && "rotate-180")} />
        </button>

        <AnimatePresence>
          {showRoleMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-16 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2"
            >
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Switch Perspective</p>
              </div>
              <div className="space-y-1">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setShowRoleMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl transition-all",
                      role === r.id ? "bg-primary/10 ring-1 ring-primary/20" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("font-bold text-sm", role === r.id ? "text-primary" : "text-gray-900")}>{r.label}</span>
                      {role === r.id && <Eye className="w-3 h-3 text-primary" />}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>

              <div className="px-3 py-2 border-t border-gray-100 mt-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">White-Labeling</p>
                <div className="flex space-x-2">
                  {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                    <button 
                      key={color}
                      onClick={() => setBranding({ primaryColor: color })}
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Global Theme Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${branding.primaryColor};
        }
        .text-primary { color: var(--primary); }
        .bg-primary { background-color: var(--primary); }
        .border-primary { border-color: var(--primary); }
        .ring-primary { --tw-ring-color: var(--primary); }
      `}} />
    </div>
  );
}
