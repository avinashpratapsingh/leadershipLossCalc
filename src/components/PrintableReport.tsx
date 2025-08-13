import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import { LeadershipGap } from '../types';
import { calculateLoss, formatCurrency } from '../utils/calculations';

interface PrintableReportProps {
  gaps: LeadershipGap[];
  companyName?: string;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ gaps, companyName }) => {
  const activeGaps = gaps.filter(gap => gap.isActive);
  const gapData = activeGaps.map(gap => ({
    ...gap,
    ...calculateLoss(gap)
  })).filter(gap => gap.annualLoss > 0);

  const totalMonthly = gapData.reduce((sum, gap) => sum + gap.monthlyLoss, 0);
  const totalAnnual = gapData.reduce((sum, gap) => sum + gap.annualLoss, 0);
  const sortedGaps = [...gapData].sort((a, b) => b.annualLoss - a.annualLoss);
  const maxLoss = Math.max(...gapData.map(g => g.annualLoss));

  return (
    <div data-print-content className="bg-white">
      {/* Header */}
      <div className="header bg-blue-900 text-white p-6 text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Leadership Loss Assessment Report</h1>
        <p className="text-lg">Comprehensive Analysis of Leadership Gaps & Financial Impact</p>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Company:</strong> {companyName || 'Your Company'}</p>
            <p><strong>Report Date:</strong> {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div>
            <p><strong>Areas Evaluated:</strong> {activeGaps.length} out of 23</p>
            <p><strong>Critical Areas Identified:</strong> {gapData.length}</p>
          </div>
        </div>

        {/* Critical Impact Box */}
        <div className="summary-box bg-red-50 border border-red-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-xl font-bold text-red-700">CRITICAL FINANCIAL IMPACT</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Monthly Loss</div>
              <div className="critical-loss text-2xl">{formatCurrency(totalMonthly)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Annual Loss</div>
              <div className="critical-loss text-2xl">{formatCurrency(totalAnnual)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Critical Areas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top 5 Critical Leadership Gaps</h2>
        {sortedGaps.slice(0, 5).map((gap, index) => (
          <div key={gap.id} className="gap-item border-l-4 border-red-500 pl-4 mb-4">
            <h3 className="font-bold text-lg">{index + 1}. {gap.title}</h3>
            <p className="text-gray-700 mb-2">{gap.description}</p>
            <p className="font-semibold text-red-600">Annual Impact: {formatCurrency(gap.annualLoss)}</p>
          </div>
        ))}
      </div>

      {/* Detailed Breakdown Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Detailed Financial Breakdown</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Leadership Area</th>
              <th className="border border-gray-300 p-3 text-left">Monthly Loss</th>
              <th className="border border-gray-300 p-3 text-left">Annual Loss</th>
              <th className="border border-gray-300 p-3 text-left">Priority</th>
            </tr>
          </thead>
          <tbody>
            {gapData.map((gap) => {
              const priority = gap.annualLoss > maxLoss * 0.7 ? 'HIGH' : 
                              gap.annualLoss > maxLoss * 0.3 ? 'MEDIUM' : 'LOW';
              const priorityClass = priority === 'HIGH' ? 'high-priority' : 
                                  priority === 'MEDIUM' ? 'medium-priority' : 'low-priority';
              
              return (
                <tr key={gap.id}>
                  <td className="border border-gray-300 p-3">{gap.title}</td>
                  <td className="border border-gray-300 p-3">{formatCurrency(gap.monthlyLoss)}</td>
                  <td className="border border-gray-300 p-3 font-bold text-red-600">{formatCurrency(gap.annualLoss)}</td>
                  <td className={`border border-gray-300 p-3 ${priorityClass}`}>{priority}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Strategic Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Strategic Recommendations</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-red-600">Immediate Action Required (Next 30 Days)</h3>
          <ul className="list-disc pl-6">
            {sortedGaps.slice(0, 2).map((gap) => (
              <li key={gap.id} className="mb-2">
                Address <strong>{gap.title}</strong> - Potential savings: {formatCurrency(gap.annualLoss)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-orange-600">Medium-term Focus (Next 90 Days)</h3>
          <ul className="list-disc pl-6">
            {sortedGaps.slice(2, 4).map((gap) => (
              <li key={gap.id} className="mb-2">
                Implement solutions for <strong>{gap.title}</strong> - Impact: {formatCurrency(gap.annualLoss)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-blue-600">Long-term Development (Next 6 Months)</h3>
          <ul className="list-disc pl-6">
            <li className="mb-2">Establish comprehensive leadership development program</li>
            <li className="mb-2">Create measurement systems for leadership effectiveness</li>
            <li className="mb-2">Build internal coaching capabilities</li>
          </ul>
        </div>
      </div>

      {/* ROI Projection */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4">Investment ROI Projection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">If 50% of identified gaps are addressed within 12 months:</p>
            <p className="font-bold text-green-600 text-lg">Potential Annual Savings: {formatCurrency(totalAnnual * 0.5)}</p>
          </div>
          <div>
            <p className="mb-2">Typical Leadership Development Investment:</p>
            <p className="font-bold text-green-600">{formatCurrency(totalAnnual * 0.1)} - {formatCurrency(totalAnnual * 0.2)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t">
        <p>This report is generated based on your assessment inputs. Actual results may vary.</p>
        <p>For professional leadership development consultation, contact us for a detailed analysis.</p>
      </div>
    </div>
  );
};

export default PrintableReport;