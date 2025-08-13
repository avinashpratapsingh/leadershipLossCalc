export interface LeadershipGap {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  timeWasted: number;
  costPerUnit: number;
  calculationType: 'weekly_hours' | 'monthly_incidents';
  inputLabel1: string;
  inputLabel2: string;
}

export interface CalculationResult {
  monthlyLoss: number;
  annualLoss: number;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  annualRevenue: string;
  companySize: string;
}