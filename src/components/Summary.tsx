import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import { LeadershipGap } from '../types';
import { calculateLoss, formatCurrency } from '../utils/calculations';

interface SummaryProps {
  gaps: LeadershipGap[];
}

const Summary: React.FC<SummaryProps> = ({ gaps }) => {
  const activeGaps = gaps.filter(gap => gap.isActive);
  const totalMonthly = activeGaps.reduce((sum, gap) => sum + calculateLoss(gap).monthlyLoss, 0);
  const totalAnnual = activeGaps.reduce((sum, gap) => sum + calculateLoss(gap).annualLoss, 0);

  if (activeGaps.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
      <div className="text-center mb-8">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Leadership Loss Report</h2>
        <p className="text-gray-600">Based on your assessment of {activeGaps.length} leadership gap(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 text-center border border-orange-200">
          <TrendingDown className="h-8 w-8 text-orange-500 mx-auto mb-3" />
          <div className="text-sm text-gray-600 mb-1">Total Monthly Estimated Loss</div>
          <div className="text-3xl font-bold text-orange-600">{formatCurrency(totalMonthly)}</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border border-red-200">
          <DollarSign className="h-8 w-8 text-red-500 mx-auto mb-3" />
          <div className="text-sm text-gray-600 mb-1">Total Annual Estimated Loss</div>
          <div className="text-3xl font-bold text-red-600">{formatCurrency(totalAnnual)}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Insight</h3>
            <blockquote className="text-gray-700 italic text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
              "You are losing approximately <span className="font-bold text-red-600">{formatCurrency(totalAnnual)}</span> annually 
              due to unaddressed leadership gaps. The cost of inaction is invisible — until you measure it. 
              Is leadership development an expense, or your biggest ROI opportunity?"
            </blockquote>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Remember:</strong> These calculations are estimates based on your inputs. 
            The actual impact of leadership gaps often extends beyond direct financial costs to include 
            employee satisfaction, customer relationships, and long-term business growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;