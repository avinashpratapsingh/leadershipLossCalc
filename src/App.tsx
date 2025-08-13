import React, { useState } from 'react';
import { BarChart3, Calculator, Target, ArrowLeft } from 'lucide-react';
import { initialLeadershipGaps } from './data/leadershipGaps';
import { LeadershipGap as LeadershipGapType, UserProblem } from './types';
import { calculateLoss } from './utils/calculations';
import ProblemIdentification from './components/ProblemIdentification';
import ProblemAnalysis from './components/ProblemAnalysis';
import LeadershipGap from './components/LeadershipGap';
import AdditionalAssessment from './components/AdditionalAssessment';
import Charts from './components/Charts';
import Summary from './components/Summary';
import LeadCapture from './components/LeadCapture';
import PrintableReport from './components/PrintableReport';

function App() {
  const [currentStep, setCurrentStep] = useState<'problems' | 'analysis' | 'assessment' | 'additional' | 'results'>('problems');
  const [selectedUserProblems, setSelectedUserProblems] = useState<UserProblem[]>([]);
  const [confirmedGapIds, setConfirmedGapIds] = useState<number[]>([]);
  const [gaps, setGaps] = useState<LeadershipGapType[]>(initialLeadershipGaps);
  const [expandedGap, setExpandedGap] = useState<number | null>(null);
  const [showAdditionalAssessment, setShowAdditionalAssessment] = useState(false);

  // Filter gaps based on confirmed gap IDs
  const relevantGaps = gaps.filter(gap => confirmedGapIds.includes(gap.id));
  const assessedGaps = relevantGaps.filter(gap => gap.isActive);

  const handleProblemSelection = (problems: UserProblem[]) => {
    setSelectedUserProblems(problems);
    setCurrentStep('analysis');
  };

  const handleProblemAnalysis = (gapIds: number[]) => {
    setConfirmedGapIds(gapIds);
    // Activate the confirmed gaps
    setGaps(prev => prev.map(gap => ({
      ...gap,
      isActive: gapIds.includes(gap.id)
    })));
    setCurrentStep('assessment');
  };

  const handleBackToProblems = () => {
    setCurrentStep('problems');
  };

  const handleBackToAnalysis = () => {
    setCurrentStep('analysis');
  };

  const handleAssessmentComplete = () => {
    setShowAdditionalAssessment(true);
    setCurrentStep('additional');
  };

  const handleAdditionalGaps = (additionalGapIds: number[]) => {
    const newConfirmedIds = [...confirmedGapIds, ...additionalGapIds];
    setConfirmedGapIds(newConfirmedIds);
    // Activate the additional gaps
    setGaps(prev => prev.map(gap => ({
      ...gap,
      isActive: newConfirmedIds.includes(gap.id)
    })));
    setCurrentStep('assessment');
    setShowAdditionalAssessment(false);
  };

  const handleSkipAdditional = () => {
    setCurrentStep('results');
  };

  const handleViewResults = () => {
    setCurrentStep('results');
  };

  const updateGap = (id: number, updates: Partial<LeadershipGapType>) => {
    setGaps(prev => prev.map(gap => 
      gap.id === id ? { ...gap, ...updates } : gap
    ));
  };

  const toggleExpanded = (id: number) => {
    setExpandedGap(expandedGap === id ? null : id);
  };

  const totalAnnualLoss = relevantGaps
    .filter(gap => gap.isActive)
    .reduce((sum, gap) => sum + calculateLoss(gap).annualLoss, 0);

  const activeGapsCount = gaps.filter(gap => gap.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Problem Identification Step */}
      {currentStep === 'problems' && (
        <ProblemIdentification onNext={handleProblemSelection} />
      )}

      {/* Render Problem Analysis Step */}
      {currentStep === 'analysis' && (
        <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Calculator className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Leadership Gap Analysis
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              Refining Your Problem Assessment
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Based on your selected challenges, we've identified specific leadership gaps to assess.
            </p>
          </div>
        </div>
      </div>

          <ProblemAnalysis 
            selectedProblems={selectedUserProblems}
            onNext={handleProblemAnalysis}
            onBack={handleBackToProblems}
          />
        </div>
      )}

      {/* Render Assessment Step */}
      {currentStep === 'assessment' && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <Calculator className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">
                  Financial Impact Assessment
                </h1>
                <p className="text-xl text-blue-100 mb-2">
                  Calculate Your Business Loss
                </p>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  Now let's calculate the financial impact of the leadership gaps we've identified for your specific challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={handleBackToAnalysis}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Problem Analysis</span>
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">How to Complete Your Assessment</h2>
                <div className="text-blue-800 space-y-2">
                  <p>1. Review each leadership gap below (based on your selected challenges)</p>
                  <p>2. Enter realistic estimates for time wasted or incidents per period</p>
                  <p>3. Provide cost estimates (hourly rates, incident costs, etc.)</p>
                  <p>4. View your calculated financial impact in real-time</p>
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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Personalized Leadership Assessment
                  </h2>
                  {assessedGaps.length > 0 && (
                    <button
                      onClick={handleViewResults}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>View Results</span>
                    </button>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">
                  Based on your challenges, we're assessing {relevantGaps.length} specific leadership area{relevantGaps.length !== 1 ? 's' : ''}.
                </p>
                
                {relevantGaps.map((gap) => (
                  <LeadershipGap
                    key={gap.id}
                    gap={gap}
                    onUpdate={updateGap}
                    isExpanded={expandedGap === gap.id}
                    onToggleExpanded={() => toggleExpanded(gap.id)}
                  />
                ))}
              </div>

              {/* Assessment Complete Button */}
              {assessedGaps.length > 0 && !showAdditionalAssessment && (
                <div className="text-center">
                  <button
                    onClick={handleAssessmentComplete}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                  >
                    Assessment Complete - What's Next?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Render Additional Assessment Step */}
      {currentStep === 'additional' && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <Target className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">
                  Expand Your Assessment
                </h1>
                <p className="text-xl text-purple-100 mb-2">
                  Optional Additional Leadership Areas
                </p>
                <p className="text-lg text-purple-200 max-w-3xl mx-auto">
                  Great job completing your core assessment! Now you can optionally assess additional leadership areas 
                  for a more comprehensive analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdditionalAssessment 
              assessedGapIds={confirmedGapIds}
              onAddGaps={handleAdditionalGaps}
              onSkip={handleSkipAdditional}
            />
          </div>
        </div>
      )}

      {/* Render Results Step */}
      {currentStep === 'results' && (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">
                  Your Leadership Assessment Results
                </h1>
                <p className="text-xl text-green-100 mb-2">
                  Financial Impact Analysis
                </p>
                <p className="text-lg text-green-200 max-w-3xl mx-auto">
                  Here's the complete analysis of how leadership gaps are impacting your business financially.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              <Summary gaps={relevantGaps} />
              <Charts gaps={relevantGaps} />
              <LeadCapture totalAnnualLoss={totalAnnualLoss} gaps={relevantGaps} />
            </div>
          </div>
        </div>
      )}

      {/* Hidden printable report */}
      <div className="hidden">
        <PrintableReport gaps={relevantGaps} />
      </div>

      {/* Footer */}
      {(currentStep === 'results' || currentStep === 'assessment') && (
        <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 Leadership Loss Calculator. Helping MSMEs unlock their leadership potential.
            </p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}

export default App;