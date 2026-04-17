import React from 'react';
import { useRole } from '../../context/RoleContext';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Users, 
  FileCheck, 
  TrendingUp, 
  Settings, 
  HelpCircle,
  Truck,
  Image as ImageIcon,
  BookOpen,
  DollarSign,
  ClipboardList,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
  key?: React.Key;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, isCollapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    title={isCollapsed ? label : undefined}
    className={cn(
      "flex items-center w-full px-4 py-2.5 text-[13px] font-medium transition-colors rounded-lg group mb-0.5 whitespace-nowrap overflow-hidden",
      active 
        ? "bg-[#eff6ff] text-primary" 
        : "text-text-muted hover:bg-gray-50 hover:text-text-main",
      label === "Logout" && "text-red-500 hover:bg-red-50 hover:text-red-600",
      isCollapsed && "px-3 justify-center"
    )}
  >
    <Icon className={cn("w-4.5 h-4.5", 
      !isCollapsed && "mr-3",
      active ? "text-primary" : (label === "Logout" ? "text-red-400 group-hover:text-red-500" : "text-gray-400 group-hover:text-gray-500")
    )} />
    {!isCollapsed && <span>{label}</span>}
    {active && !isCollapsed && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
  </button>
);

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const { role, branding, activeTab, setActiveTab, setIsLoggedIn } = useRole();

  const getMainTabLabel = (): string => {
    switch (role) {
      case 'MANAGER': return 'Overview';
      case 'CREW_LEAD': return "Today's Work";
      case 'CREW_MEMBER': return 'My Tasks';
      case 'CLIENT': return 'Project Portal';
      default: return 'Dashboard';
    }
  };

  const getMenuItems = () => {
    switch (role) {
      // (logic preserved)
      case 'OWNER':
        return [
          { icon: LayoutDashboard, label: 'Dashboard' },
          { icon: Briefcase, label: 'Job Pipeline' },
          { icon: Users, label: 'Workforce' },
          { icon: Truck, label: 'Equipment' },
          { icon: DollarSign, label: 'Financials' },
          { icon: BookOpen, label: 'Training & SOPs' },
          { icon: ImageIcon, label: 'Branding' },
          { icon: TrendingUp, label: 'Performance' },
          { icon: Settings, label: 'Settings' },
        ];
      case 'MANAGER':
        return [
          { icon: LayoutDashboard, label: 'Overview' },
          { icon: Briefcase, label: 'Assigned Jobs' },
          { icon: DollarSign, label: 'Job Costs' },
          { icon: Truck, label: 'Fleet & Tools' },
          { icon: ClipboardList, label: 'Crew Reports' },
          { icon: Users, label: 'My Teams' },
          { icon: MessageSquare, label: 'Messages' },
          { icon: FileCheck, label: 'Approvals' },
        ];
      case 'CREW_LEAD':
        return [
          { icon: LayoutDashboard, label: 'Today\'s Work' },
          { icon: Briefcase, label: 'My Jobs' },
          { icon: FileCheck, label: 'Checklists' },
          { icon: MessageSquare, label: 'Communications' },
          { icon: DollarSign, label: 'Expenses' },
        ];
      case 'CREW_MEMBER':
        return [
          { icon: LayoutDashboard, label: 'My Tasks' },
          { icon: Briefcase, label: 'Schedule' },
          { icon: MessageSquare, label: 'Chat' },
          { icon: BookOpen, label: 'Training' },
        ];
      case 'CLIENT':
        return [
          { icon: LayoutDashboard, label: 'Project Portal' },
          { icon: Briefcase, label: 'My Jobs' },
          { icon: MessageSquare, label: 'Updates' },
          { icon: DollarSign, label: 'Invoices' },
          { icon: HelpCircle, label: 'Support' },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-bg-sidebar border-r border-border-theme flex flex-col z-30 pt-6 transition-all duration-300",
      isCollapsed ? "w-[80px] px-3" : "w-[240px] px-4"
    )}>
      <div 
        className={cn(
          "mb-8 flex items-center cursor-pointer transition-all",
          isCollapsed ? "justify-center" : "px-4 space-x-3"
        )} 
        onClick={() => setActiveTab(getMainTabLabel())}
      >
        <div 
          className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 shrink-0"
        >
          {branding.name.charAt(0)}
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-base text-text-main truncate">{branding.name}</h1>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">Management OS</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <div className="nav-section mb-6">
          {!isCollapsed && <p className="px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Core Ops</p>}
          <div className="space-y-0.5">
            {getMenuItems().map((item) => (
            <SidebarItem 
              key={item.label} 
              icon={item.icon} 
              label={item.label} 
              active={activeTab === item.label} 
              onClick={() => setActiveTab(item.label)}
              isCollapsed={isCollapsed}
            />
          ))}
          </div>
        </div>

        <div className="mt-8 mb-4 border-t border-gray-100 pt-6">
          {!isCollapsed && <p className="px-4 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Analysis</p>}
          <div className="space-y-0.5">
            <SidebarItem 
              icon={ImageIcon} 
              label="Company Feed" 
              active={activeTab === 'Company Feed'}
              onClick={() => setActiveTab('Company Feed')}
              isCollapsed={isCollapsed}
            />
            <SidebarItem 
              icon={HelpCircle} 
              label="Help Center" 
              active={activeTab === 'Help Center'}
              onClick={() => setActiveTab('Help Center')}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
           <SidebarItem 
             icon={LogOut} 
             label="Logout" 
             onClick={() => setIsLoggedIn(false)}
             active={false}
             isCollapsed={isCollapsed}
           />
        </div>
      </nav>

      {!isCollapsed && (
        <div className="p-4 mb-6 bg-slate-50 rounded-2xl mx-2 mt-4 border border-slate-100 shadow-sm">
          <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Enterprise Tier</div>
          <div className="text-[11px] font-bold text-text-main">Demo Environment</div>
        </div>
      )}
    </aside>
  );
}
