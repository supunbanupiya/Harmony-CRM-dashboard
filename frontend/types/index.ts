export type User = {
  id: number;
  name: string;
  companyName?: string | null;
  email: string;
  role: string;
  avatarUrl?: string | null;
};

export type Client = {
  id: number;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  status: 'lead' | 'active' | 'at_risk' | 'won' | 'lost';
  value: number;
  source?: string | null;
  notes?: string | null;
  createdAt?: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string | null;
  clientName?: string | null;
};

export type PipelineStage = {
  id: number;
  name: string;
  color: string;
  sortOrder: number;
  deals: Array<{
    id: number;
    title: string;
    amount: number;
    probability: number;
    stageId: number;
    expectedCloseDate?: string | null;
    clientName: string;
    clientCompany?: string | null;
  }>;
};

export type Communication = {
  id: number;
  channel: 'email' | 'phone' | 'meeting' | 'whatsapp' | 'note';
  subject: string;
  message?: string | null;
  direction: 'inbound' | 'outbound';
  createdAt: string;
  clientName: string;
  clientCompany?: string | null;
};
