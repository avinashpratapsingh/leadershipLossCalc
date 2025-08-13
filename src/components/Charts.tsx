import React from 'react';
import { LeadershipGap } from '../types';
import { calculateLoss, formatCurrency } from '../utils/calculations';

interface ChartsProps {
  gaps: LeadershipGap[];
}

const Charts: React.FC<ChartsProps> = ({ gaps }) => {
  const activeGaps = gaps.filter(gap => gap.isActive);
  const gapData = activeGaps.map(gap => ({
    ...gap,
    ...calculateLoss(gap)
  })).filter(gap => gap.annualLoss > 0);

  const totalAnnualLoss = gapData.reduce((sum, gap) => sum + gap.annualLoss, 0);
  const maxLoss = Math.max(...gapData.map(gap => gap.annualLoss));

  if (gapData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No active leadership gaps to display. Toggle some challenges above to see your financial impact.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Table View */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Financial Impact Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leadership Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Loss
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Loss
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gapData.map((gap) => (
                <tr key={gap.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{gap.title}</div>
                    <div className="text-sm text-gray-500">{gap.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">
                    {formatCurrency(gap.monthlyLoss)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                    {formatCurrency(gap.annualLoss)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Annual Loss by Leadership Gap</h3>
        <div className="space-y-4">
          {gapData.map((gap) => {
            const percentage = (gap.annualLoss / maxLoss) * 100;
            return (
              <div key={gap.id} className="flex items-center space-x-4">
                <div className="w-48 text-sm font-medium text-gray-700 truncate">
                  {gap.title}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-6 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-end pr-2">
                    <span className="text-xs font-semibold text-white">
                      {formatCurrency(gap.annualLoss)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contribution to Total Loss</h3>
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {gapData.map((gap, index) => {
                const percentage = (gap.annualLoss / totalAnnualLoss) * 100;
                const angle = (percentage / 100) * 360;
                const startAngle = gapData.slice(0, index).reduce(
                  (sum, prevGap) => sum + (prevGap.annualLoss / totalAnnualLoss) * 360,
                  0
                );
                
                const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 80 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                const y2 = 100 + 80 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const colors = [
                  '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6',
                  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F59E0B', '#10B981'
                ];
                
                return (
                  <path
                    key={gap.id}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index % colors.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            {gapData.map((gap, index) => {
              const percentage = ((gap.annualLoss / totalAnnualLoss) * 100).toFixed(1);
              const colors = [
                '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6',
                '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F59E0B', '#10B981'
              ];
              
              return (
                <div key={gap.id} className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{gap.title}</div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(gap.annualLoss)} ({percentage}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;