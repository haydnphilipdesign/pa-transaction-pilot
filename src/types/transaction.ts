
export type TransactionType = 'purchase' | 'sale' | 'refinance' | 'lease';
export type TransactionStatus = 'new' | 'under_contract' | 'inspection' | 'appraisal' | 'financing' | 'final_walkthrough' | 'closing' | 'closed' | 'cancelled';
export type PropertyType = 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'commercial' | 'land';

export interface Property {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  propertyType: PropertyType;
  squareFootage?: number;
  yearBuilt?: number;
  lotSize?: string;
  mlsNumber?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'buyer' | 'seller' | 'buyer_agent' | 'seller_agent' | 'lender' | 'attorney' | 'title_company' | 'inspector' | 'appraiser';
  company?: string;
  licenseNumber?: string;
}

export interface Transaction {
  id: string;
  property: Property;
  transactionType: TransactionType;
  status: TransactionStatus;
  purchasePrice: number;
  contractDate: string;
  closingDate: string;
  contacts: Contact[];
  assignedAgent: string;
  assignedTC: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Task {
  id: string;
  transactionId: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  assignedTo: string;
  category: 'contract' | 'inspection' | 'financing' | 'appraisal' | 'insurance' | 'title' | 'closing' | 'other';
  priority: 'low' | 'medium' | 'high';
  completedAt?: string;
  completedBy?: string;
  dependencies?: string[];
}
