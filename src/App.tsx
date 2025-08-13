import React, { useState } from 'react';
import { BarChart3, Calculator, Target } from 'lucide-react';
import { initialLeadershipGaps } from './data/leadershipGaps';
import { LeadershipGap as LeadershipGapType } from './types';
import { calculateLoss } from './utils/calculations';
import LeadershipGap from './components/LeadershipGap';
import Charts from './components/Charts';
import Summary from './components/Summary';
import LeadCapture from './components/LeadCapture';
import PrintableReport from './components/PrintableReport';

function App() {
  const [gaps, setGaps] = useState<LeadershipGapType[]>(initialLeadershipGaps);
  const [expandedGap, setExpandedGap] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'assessment' | 'results'>('assessment');

  const updateGap = (id: number, updates: Partial<LeadershipGapType>) => {
    setGaps(prev => prev.map(gap => 
      gap.id === id ? { ...gap, ...updates } : gap
    ));
  };

  const toggleExpanded = (id: number) => {
    setExpandedGap(expandedGap === id ? null : id);
  };

  const totalAnnualLoss = gaps
    .filter(gap => gap.isActive)
    .reduce((sum, gap) => sum + calculateLoss(gap).annualLoss, 0);

  const activeGapsCount = gaps.filter(gap => gap.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Calculator className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Hidden Cost of Leadership Gaps
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              Calculate Your Business Loss
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Discover the financial impact of poor leadership practices in your MSME. 
              This assessment will help you understand what leadership gaps are costing your business.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'assessment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Leadership Assessment</span>
                {activeGapsCount > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activeGapsCount}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'results'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Results & Analysis</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'assessment' ? (
          <div className="space-y-8">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Use This Comprehensive Assessment</h2>
              <div className="text-blue-800 space-y-2">
                <p>1. Review each of the 23 leadership challenges below</p>
                <p>2. Toggle "Yes" for challenges that exist in your organization</p>
                <p>3. Enter realistic estimates for time wasted or incidents per period</p>
                <p>4. Provide cost estimates (hourly rates, incident costs, etc.)</p>
                <p>5. View your results in the "Results & Analysis" tab</p>
              </div>
              
              {/* Calculation Formulas Section */}
              <div className="mt-6 bg-white border border-blue-300 rounded-lg p-4">
                <h3 className="text-md font-semibold text-blue-900 mb-3">📊 Calculation Methodology</h3>
                <div className="text-blue-800 text-sm space-y-3">
                  <div>
                    <p className="font-semibold mb-1">For Time-Based Losses (Weekly Hours):</p>
                    <div className="bg-blue-100 rounded p-2 font-mono text-xs">
                      Monthly Loss = Hours Wasted Weekly × Cost Per Hour × 4 weeks<br/>
                      Annual Loss = Monthly Loss × 12 months
                    </div>
                    <p className="text-xs mt-1 italic">Example: 5 hours/week × ₹500/hour × 4 weeks = ₹10,000/month</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-1">For Incident-Based Losses (Monthly Occurrences):</p>
                    <div className="bg-blue-100 rounded p-2 font-mono text-xs">
                      Monthly Loss = Number of Incidents × Cost Per Incident<br/>
                      Annual Loss = Monthly Loss × 12 months
                    </div>
                    <p className="text-xs mt-1 italic">Example: 3 conflicts/month × ₹15,000/conflict = ₹45,000/month</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                    <p className="text-xs text-yellow-800">
                      <strong>💡 Pro Tip:</strong> These calculations provide conservative estimates. The actual impact often includes 
                      hidden costs like reduced team morale, customer dissatisfaction, and missed opportunities that are harder to quantify.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Gaps */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Comprehensive Leadership Gap Assessment
              </h2>
              {gaps.map((gap) => (
                <LeadershipGap
                  key={gap.id}
                  gap={gap}
                  onUpdate={updateGap}
                  isExpanded={expandedGap === gap.id}
                  onToggleExpanded={() => toggleExpanded(gap.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <Summary gaps={gaps} />
            <Charts gaps={gaps} />
            <LeadCapture totalAnnualLoss={totalAnnualLoss} gaps={gaps} />
          </div>
        )}
      </div>

      {/* Hidden printable report */}
      <div className="hidden">
        <PrintableReport gaps={gaps} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 Leadership Loss Calculator. Helping MSMEs unlock their leadership potential.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;