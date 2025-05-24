
export type TaskCategory = 'contract' | 'inspection' | 'financing' | 'appraisal' | 'insurance' | 'title' | 'closing' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface TaskTemplate {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  daysFromContract: number; // Auto-calculate due date based on contract date
  isRequired: boolean;
  dependencies?: string[]; // Task IDs that must be completed first
  transactionTypes: string[]; // Which transaction types this applies to
}

export interface Task {
  id: string;
  transactionId: string;
  templateId?: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  status: TaskStatus;
  assignedTo: string;
  category: TaskCategory;
  priority: TaskPriority;
  completedAt?: string;
  completedBy?: string;
  dependencies?: string[];
  isRequired: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
