export type UserRole = 'OWNER' | 'MANAGER' | 'CREW_LEAD' | 'CREW_MEMBER' | 'CLIENT';

export interface CompanyBranding {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Job {
  id: string;
  title: string;
  address: string;
  clientName: string;
  status: 'LEAD' | 'QUOTED' | 'APPROVED' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'DELAYED' | 'COMPLETED' | 'INVOICED' | 'PAID' | 'ARCHIVED';
  progress: number;
  managerId: string;
  crewLeadId: string;
  crewMemberIds: string[];
  startDate: string;
  endDate: string;
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE';
  url?: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'DIRECT' | 'CHANNEL' | 'JOB';
  lastMessage?: string;
  unreadCount: number;
  participants: string[];
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface FormRequirement {
  id: string;
  title: string;
  type: 'PRE_JOB' | 'MIDDAY' | 'END_OF_DAY' | 'POST_JOB';
  questions: string[];
}

export interface ApprovalRequest {
  id: string;
  title: string;
  type: 'EXPENSE' | 'TIMESHEET' | 'CHANGE_ORDER' | 'LEAVE';
  requesterName: string;
  amount?: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  description: string;
  jobId?: string;
  jobTitle?: string;
}
