import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, CompanyBranding, Job, Message, Conversation, FormRequirement, ApprovalRequest } from '../types';

export type WorkforceStatus = 'CLOCKED_IN' | 'ON_SITE' | 'OFF' | 'BREAK';

export interface WorkforceMember {
  id: string;
  name: string;
  role: UserRole;
  status: WorkforceStatus;
  contact: string;
  lastActive: string;
  avatar?: string;
}

export interface SOP {
  id: string;
  title: string;
  category: 'SAFETY' | 'OPERATIONS' | 'EQUIPMENT' | 'CUSTOMER_SERVICE';
  lastUpdated: string;
  content: string;
  author: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
  thumbnail: string;
  description: string;
}

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  branding: CompanyBranding;
  setBranding: (branding: Partial<CompanyBranding>) => void;
  jobs: Job[];
  workforce: WorkforceMember[];
  sops: SOP[];
  trainingModules: TrainingModule[];
  conversations: Conversation[];
  checklists: FormRequirement[];
  approvals: ApprovalRequest[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const defaultBranding: CompanyBranding = {
  name: "Jerry's Construction",
  logo: "https://picsum.photos/seed/jerry/200/200",
  primaryColor: "#3b82f6", // Blue
  secondaryColor: "#1e40af",
};

const mockWorkforce: WorkforceMember[] = [
  { id: '1', name: 'Mike Foreman', role: 'CREW_LEAD', status: 'ON_SITE', contact: 'mike@jerrys.com', lastActive: '5 mins ago', avatar: 'https://picsum.photos/seed/mike/100/100' },
  { id: '2', name: 'Alex Worker', role: 'CREW_MEMBER', status: 'CLOCKED_IN', contact: 'alex@jerrys.com', lastActive: 'Active now', avatar: 'https://picsum.photos/seed/alex/100/100' },
  { id: '3', name: 'Sarah Manager', role: 'MANAGER', status: 'OFF', contact: 'sarah@jerrys.com', lastActive: '2 hours ago', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: '4', name: 'John Doe', role: 'CREW_MEMBER', status: 'ON_SITE', contact: 'john@jerrys.com', lastActive: '12 mins ago', avatar: 'https://picsum.photos/seed/john/100/100' },
  { id: '5', name: 'Jane Smith', role: 'CREW_MEMBER', status: 'BREAK', contact: 'jane@jerrys.com', lastActive: '15 mins ago', avatar: 'https://picsum.photos/seed/jane/100/100' },
];

const mockSOPs: SOP[] = [
  { id: '1', title: 'On-site Safety Protocol', category: 'SAFETY', lastUpdated: '2026-03-01', author: 'Jerry Construction', content: 'Detailed safety steps for field work...' },
  { id: '2', title: 'Daily Equipment Inspection', category: 'EQUIPMENT', lastUpdated: '2026-03-15', author: 'Sarah Manager', content: 'Morning check-list for trucks and tools...' },
  { id: '3', title: 'Client Communication Standards', category: 'CUSTOMER_SERVICE', lastUpdated: '2026-04-05', author: 'Jerry Construction', content: 'How to interact with homeowners...' },
  { id: '4', title: 'After-job Cleanup Procedure', category: 'OPERATIONS', lastUpdated: '2026-01-20', author: 'Mike Foreman', content: 'Standards for leaving a job site spotless...' },
];

const mockTrainingModules: TrainingModule[] = [
  { id: '1', title: 'Advanced Carpentry Techniques', duration: '45 mins', status: 'IN_PROGRESS', thumbnail: 'https://picsum.photos/seed/wood/400/225', description: 'Advanced joinery and finishing skills.' },
  { id: '2', title: 'OSHA 10-Hour Construction Safety', duration: '10 hours', status: 'COMPLETED', thumbnail: 'https://picsum.photos/seed/safety/400/225', description: 'Fundamental safety training for construction.' },
  { id: '3', title: 'Customer Experience Excellence', duration: '30 mins', status: 'NOT_STARTED', thumbnail: 'https://picsum.photos/seed/smile/400/225', description: 'Enhancing client satisfaction on every job.' },
];

const mockConversations: Conversation[] = [
  { id: 'c1', name: 'Kitchen Renovation Team', type: 'JOB', lastMessage: 'Cabinets arrived.', unreadCount: 2, participants: ['1', '2', '4'] },
  { id: 'c2', name: 'Mike Foreman', type: 'DIRECT', lastMessage: 'See you at 8.', unreadCount: 0, participants: ['1'] },
  { id: 'c3', name: 'Sarah Manager', type: 'DIRECT', lastMessage: 'Check the SOP update.', unreadCount: 1, participants: ['3'] },
  { id: 'c4', name: 'Safety Channel', type: 'CHANNEL', lastMessage: 'New protocol for ladders.', unreadCount: 0, participants: ['1', '2', '3', '4', '5'] },
];

const mockFormRequirements: FormRequirement[] = [
  { id: 'f1', title: 'Morning Safety Walkthrough', type: 'PRE_JOB', questions: ['Site secured?', 'PPE checked?', 'Tools inspected?'] },
  { id: 'f2', title: 'Midday Progress Update', type: 'MIDDAY', questions: ['Units installed?', 'Waste removed?', 'Owner notified of progress?'] },
  { id: 'f3', title: 'End of Day Site Closure', type: 'END_OF_DAY', questions: ['Hazards eliminated?', 'Gates locked?', 'Storage secured?'] },
  { id: 'f4', title: 'Final Quality Audit', type: 'POST_JOB', questions: ['Photos taken?', 'Client signed off?', 'Invoices generated?'] },
];

const mockApprovals: ApprovalRequest[] = [
  { id: 'a1', title: 'New Hammer Drill', type: 'EXPENSE', requesterName: 'Mike Foreman', amount: '$249.00', date: '2026-04-16', status: 'PENDING', description: 'Replacement for broken unit at Maple St site.', jobId: '1', jobTitle: 'Kitchen Renovation' },
  { id: 'a2', title: 'Weekly Timesheet - Alex', type: 'TIMESHEET', requesterName: 'Alex Worker', date: '2026-04-15', status: 'PENDING', description: '42 hours logged for the week of April 10th.' },
  { id: 'a3', title: 'Extra Tiles - Backsplash', type: 'CHANGE_ORDER', requesterName: 'Sarah Manager', amount: '$450.00', date: '2026-04-14', status: 'APPROVED', description: 'Additional material requested by client for extended splash area.', jobId: '1', jobTitle: 'Kitchen Renovation' },
  { id: 'a4', title: 'Friday PTO Request', type: 'LEAVE', requesterName: 'John Doe', date: '2026-04-18', status: 'PENDING', description: 'Personal appointment in the afternoon.' },
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    address: '42 Maple Street',
    clientName: 'Sarah Johnson',
    status: 'ACTIVE',
    progress: 55,
    managerId: 'm1',
    crewLeadId: 'cl1',
    crewMemberIds: ['cm1', 'cm2'],
    startDate: '2026-04-10',
    endDate: '2026-04-20',
    description: 'Full kitchen remodel including cabinets and flooring.',
  },
  {
    id: '2',
    title: 'Deck Repair',
    address: '81 Pine Ave',
    clientName: 'Robert Smith',
    status: 'DELAYED',
    progress: 20,
    managerId: 'm1',
    crewLeadId: 'cl2',
    crewMemberIds: ['cm3'],
    startDate: '2026-04-15',
    endDate: '2026-04-18',
    description: 'Fixing structural issues and staining.',
  },
  {
    id: '3',
    title: 'Interior Painting',
    address: '17 Main St',
    clientName: 'Alice Brown',
    status: 'SCHEDULED',
    progress: 0,
    managerId: 'm2',
    crewLeadId: 'cl1',
    crewMemberIds: ['cm1'],
    startDate: '2026-04-22',
    endDate: '2026-04-25',
    description: 'Living room and bedroom painting.',
  },
];

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('OWNER');
  const [branding, setBrandingState] = useState<CompanyBranding>(defaultBranding);
  const [activeTab, setActiveTabState] = useState('Dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Admin User');
  const [activeConversationId, setActiveConversationId] = useState<string | null>('c1');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', branding.primaryColor);
    // Rough approximation for hover color
    root.style.setProperty('--color-primary-hover', branding.secondaryColor);
  }, [branding]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setSelectedJobId(null);
    
    // Reset to role's default dashboard label
    const defaultLabels: Record<UserRole, string> = {
      OWNER: 'Dashboard',
      MANAGER: 'Overview',
      CREW_LEAD: "Today's Work",
      CREW_MEMBER: 'My Tasks',
      CLIENT: 'Project Portal'
    };
    setActiveTabState(defaultLabels[newRole]);
  };

  const setActiveTab = (tab: string) => {
    setSelectedJobId(null);
    setActiveTabState(tab);
  };

  const setBranding = (newBranding: Partial<CompanyBranding>) => {
    setBrandingState(prev => ({ ...prev, ...newBranding }));
  };

  return (
    <RoleContext.Provider value={{ 
      role, setRole, branding, setBranding, jobs: mockJobs, 
      workforce: mockWorkforce,
      sops: mockSOPs,
      trainingModules: mockTrainingModules,
      conversations: mockConversations,
      checklists: mockFormRequirements,
      approvals: mockApprovals,
      activeConversationId, setActiveConversationId,
      activeTab, setActiveTab, selectedJobId, setSelectedJobId,
      isLoggedIn, setIsLoggedIn,
      userName, setUserName
    }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
