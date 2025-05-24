
import { TaskTemplate } from '@/types/task';

export const taskTemplates: TaskTemplate[] = [
  // Contract Phase
  {
    id: 'contract-review',
    title: 'Contract Review',
    description: 'Review purchase agreement and all addenda',
    category: 'contract',
    priority: 'high',
    daysFromContract: 1,
    isRequired: true,
    transactionTypes: ['purchase', 'sale']
  },
  {
    id: 'earnest-money',
    title: 'Earnest Money Deposit',
    description: 'Collect and deposit earnest money',
    category: 'contract',
    priority: 'high',
    daysFromContract: 3,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  
  // Inspection Phase
  {
    id: 'schedule-inspection',
    title: 'Schedule Home Inspection',
    description: 'Schedule professional home inspection',
    category: 'inspection',
    priority: 'high',
    daysFromContract: 5,
    isRequired: true,
    dependencies: ['contract-review'],
    transactionTypes: ['purchase']
  },
  {
    id: 'inspection-contingency',
    title: 'Inspection Contingency Deadline',
    description: 'Buyer must complete inspection and provide notice',
    category: 'inspection',
    priority: 'high',
    daysFromContract: 10,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  
  // Financing Phase
  {
    id: 'loan-application',
    title: 'Submit Loan Application',
    description: 'Complete and submit mortgage application',
    category: 'financing',
    priority: 'high',
    daysFromContract: 3,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  {
    id: 'loan-approval',
    title: 'Loan Approval Deadline',
    description: 'Obtain final loan approval',
    category: 'financing',
    priority: 'high',
    daysFromContract: 21,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  
  // Appraisal Phase
  {
    id: 'order-appraisal',
    title: 'Order Appraisal',
    description: 'Schedule property appraisal',
    category: 'appraisal',
    priority: 'medium',
    daysFromContract: 7,
    isRequired: true,
    dependencies: ['loan-application'],
    transactionTypes: ['purchase']
  },
  {
    id: 'appraisal-review',
    title: 'Appraisal Review',
    description: 'Review appraisal report',
    category: 'appraisal',
    priority: 'medium',
    daysFromContract: 18,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  
  // Title and Insurance
  {
    id: 'title-search',
    title: 'Order Title Search',
    description: 'Initiate title search and examination',
    category: 'title',
    priority: 'medium',
    daysFromContract: 3,
    isRequired: true,
    transactionTypes: ['purchase', 'sale']
  },
  {
    id: 'homeowners-insurance',
    title: 'Obtain Homeowners Insurance',
    description: 'Secure homeowners insurance policy',
    category: 'insurance',
    priority: 'medium',
    daysFromContract: 14,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  
  // Closing Phase
  {
    id: 'final-walkthrough',
    title: 'Final Walkthrough',
    description: 'Conduct final property walkthrough',
    category: 'closing',
    priority: 'high',
    daysFromContract: 29,
    isRequired: true,
    transactionTypes: ['purchase']
  },
  {
    id: 'closing-documents',
    title: 'Prepare Closing Documents',
    description: 'Prepare all closing documentation',
    category: 'closing',
    priority: 'high',
    daysFromContract: 27,
    isRequired: true,
    transactionTypes: ['purchase', 'sale']
  },
  {
    id: 'schedule-closing',
    title: 'Schedule Closing',
    description: 'Coordinate closing date with all parties',
    category: 'closing',
    priority: 'high',
    daysFromContract: 25,
    isRequired: true,
    transactionTypes: ['purchase', 'sale']
  }
];
