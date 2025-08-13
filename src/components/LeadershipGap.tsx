import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LeadershipGap as LeadershipGapType } from '../types';
import { calculateLoss, formatCurrency } from '../utils/calculations';

interface LeadershipGapProps {
  gap: LeadershipGapType;
  onUpdate: (id: number, updates: Partial<LeadershipGapType>) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const LeadershipGap: React.FC<LeadershipGapProps> = ({ 
  gap, 
  onUpdate, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const { monthlyLoss, annualLoss } = calculateLoss(gap);

  const handleToggleActive = () => {
    onUpdate(gap.id, { isActive: !gap.isActive });
  };

  const handleInputChange = (field: 'timeWasted' | 'costPerUnit', value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdate(gap.id, { [field]: numValue });
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="p-4 bg-white cursor-pointer flex items-center justify-between"
        onClick={onToggleExpanded}
      >
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-700">#{gap.id}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{gap.title}</h3>
              <p className="text-sm text-gray-600">{gap.description}</p>
            </div>
          </div>
          {gap.isActive && (
            <div className="ml-auto mr-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Annual Loss</div>
                <div className="text-lg font-bold text-red-600">{formatCurrency(annualLoss)}</div>
              </div>
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 bg-gray-50">
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={gap.isActive}
                onChange={handleToggleActive}
                className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Is this a current challenge in your business?
              </span>
            </label>
          </div>

          {gap.isActive && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {gap.inputLabel1}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={gap.timeWasted || ''}
                    onChange={(e) => handleInputChange('timeWasted', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {gap.inputLabel2}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={gap.costPerUnit || ''}
                    onChange={(e) => handleInputChange('costPerUnit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter cost in ₹"
                  />
                </div>
              </div>

              {gap.timeWasted > 0 && gap.costPerUnit > 0 && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Monthly Loss</div>
                      <div className="text-xl font-bold text-orange-600">{formatCurrency(monthlyLoss)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Annual Loss</div>
                      <div className="text-xl font-bold text-red-600">{formatCurrency(annualLoss)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadershipGap;