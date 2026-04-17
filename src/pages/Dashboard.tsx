import React from 'react';
import { useRole } from '../context/RoleContext';
import OwnerDashboard from '../components/dashboard/OwnerDashboard';
import ManagerDashboard from '../components/dashboard/ManagerDashboard';
import CrewLeadDashboard from '../components/dashboard/CrewLeadDashboard';
import CrewMemberDashboard from '../components/dashboard/CrewMemberDashboard';
import ClientDashboard from '../components/dashboard/ClientDashboard';
import JobPipeline from '../components/jobs/JobPipeline';
import CompanyFeed from '../components/feed/CompanyFeed';
import Workforce from '../components/workforce/Workforce';
import Financials from '../components/financials/Financials';
import Training from '../components/training/Training';
import Branding from '../components/branding/Branding';
import Performance from '../components/performance/Performance';
import Messages from '../components/messages/Messages';
import Checklists from '../components/checklists/Checklists';
import Approvals from '../components/approvals/Approvals';
import Equipment from '../components/equipment/Equipment';
import SettingsPage from '../components/layout/SettingsPage';
import HelpCenter from '../components/layout/HelpCenter';
import { LayoutDashboard } from 'lucide-react';

import JobDetail from '../components/jobs/JobDetail';

export default function Dashboard() {
  const { role, activeTab, selectedJobId } = useRole();

  // If a job is selected, show its detail regardless of the current tab
  if (selectedJobId) return <JobDetail />;

  // Common high-level views
  if (activeTab === 'Company Feed') return <CompanyFeed />;
  
  // Job Pipeline views (unified component for different labels)
  const jobTabs = ['Job Pipeline', 'Assigned Jobs', 'My Jobs', 'Schedule'];
  if (jobTabs.includes(activeTab)) return <JobPipeline />;

  // Workforce views
  const workforceTabs = ['Workforce', 'My Teams'];
  if (workforceTabs.includes(activeTab)) return <Workforce />;

  // Financial views
  const financialTabs = ['Financials', 'Expenses', 'Invoices', 'Job Costs'];
  if (financialTabs.includes(activeTab)) return <Financials />;

  // Training views
  const trainingTabs = ['Training & SOPs', 'Training'];
  if (trainingTabs.includes(activeTab)) return <Training />;

  if (activeTab === 'Branding') return <Branding />;
  if (activeTab === 'Performance') return <Performance />;

  // Messages / Communications / Chat
  const messageTabs = ['Messages', 'Communications', 'Chat', 'Updates'];
  if (messageTabs.includes(activeTab)) return <Messages />;

  if (activeTab === 'Checklists' || activeTab === 'Crew Reports') return <Checklists />;
  if (activeTab === 'Approvals') return <Approvals />;
  if (activeTab === 'Equipment' || activeTab === 'Fleet & Tools') return <Equipment />;

  if (activeTab === 'Settings') return <SettingsPage />;
  if (activeTab === 'Help Center' || activeTab === 'Support' || activeTab === 'Help') return <HelpCenter />;

  // Role-specific main dashboards
  const mainDashboards = ['Dashboard', 'Overview', "Today's Work", 'My Tasks', 'Project Portal'];
  if (mainDashboards.includes(activeTab)) {
    switch (role) {
      case 'OWNER': return <OwnerDashboard />;
      case 'MANAGER': return <ManagerDashboard />;
      case 'CREW_LEAD': return <CrewLeadDashboard />;
      case 'CREW_MEMBER': return <CrewMemberDashboard />;
      case 'CLIENT': return <ClientDashboard />;
      default: return <OwnerDashboard />;
    }
  }

  // Fallback for views not yet implemented in this demo
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
        <LayoutDashboard className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-text-main">{activeTab}</h2>
        <p className="text-sm text-text-muted max-w-xs mx-auto">
          This module is part of the full BlueCollarOS suite and is not available in the current demo perspective.
        </p>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="text-xs font-bold text-primary uppercase tracking-wider hover:underline"
      >
        Return to Overview
      </button>
    </div>
  );
}
