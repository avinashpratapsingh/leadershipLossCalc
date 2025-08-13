import { LeadershipGap, CalculationResult } from '../types';

export const calculateLoss = (gap: LeadershipGap): CalculationResult => {
  if (!gap.isActive || gap.timeWasted <= 0 || gap.costPerUnit <= 0) {
    return { monthlyLoss: 0, annualLoss: 0 };
  }

  let monthlyLoss = 0;
  
  if (gap.calculationType === 'weekly_hours') {
    // Weekly hours × cost per hour × 4 weeks
    monthlyLoss = gap.timeWasted * gap.costPerUnit * 4;
  } else {
    // Monthly incidents × cost per incident
    monthlyLoss = gap.timeWasted * gap.costPerUnit;
  }

  const annualLoss = monthlyLoss * 12;
  
  return { monthlyLoss, annualLoss };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};