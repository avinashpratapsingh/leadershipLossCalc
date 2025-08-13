import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Lightbulb, Target } from 'lucide-react';
import { UserProblem, ProblemMapping } from '../types';
import { problemMappings } from '../data/userProblems';
import { initialLeadershipGaps } from '../data/leadershipGaps';

interface ProblemAnalysisProps {
  selectedProblems: UserProblem[];
  onNext: (confirmedGapIds: number[]) => void;
  onBack: () => void;
}

const ProblemAnalysis: React.FC<ProblemAnalysisProps> = ({ 
  selectedProblems, 
  onNext, 
  onBack 
}) => {
  const [confirmedMappings, setConfirmedMappings] = useState<string[]>([]);

  // Get mappings for selected problems
  const relevantMappings = problemMappings.filter(mapping => 
    selectedProblems.some(problem => problem.id === mapping.userProblem.id)
  );

  const toggleMapping = (problemId: string) => {
    setConfirmedMappings(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleNext = () => {
    // Get all gap IDs from confirmed mappings
    const confirmedGapIds = relevantMappings
      .filter(mapping => confirmedMappings.includes(mapping.userProblem.id))
      .flatMap(mapping => mapping.suggestedGaps);
    
    // Remove duplicates
    const uniqueGapIds = [...new Set(confirmedGapIds)];
    onNext(uniqueGapIds);
  };

  const getGapTitles = (gapIds: number[]) => {
    return gapIds
      .map(id => initialLeadershipGaps.find(gap => gap.id === id)?.title)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Lightbulb className="h-16 w-16 mx-auto mb-4 text-orange-600" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Here's What We Found
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on the challenges you selected, we've identified the specific leadership gaps 
          that are likely causing these problems in your organization.
        </p>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Problem Selection</span>
        </button>
      </div>

      {/* Problem Analysis */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Confirm the Leadership Gaps We Should Assess
        </h2>
        
        {relevantMappings.map((mapping) => (
          <div key={mapping.userProblem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* Original Problem */}
              <div className="flex items-start space-x-3 mb-4">
                <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Your Challenge: {mapping.userProblem.text}
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {mapping.userProblem.category}
                  </span>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-orange-900 mb-2">Our Analysis:</h4>
                <p className="text-orange-800 text-sm mb-3">{mapping.explanation}</p>
                <div className="text-sm text-orange-700">
                  <strong>Suggested Leadership Areas to Assess:</strong>
                  <br />
                  {getGapTitles(mapping.suggestedGaps)}
                </div>
              </div>

              {/* Confirmation */}
              <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                confirmedMappings.includes(mapping.userProblem.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  confirmedMappings.includes(mapping.userProblem.id)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {confirmedMappings.includes(mapping.userProblem.id) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`font-medium ${
                  confirmedMappings.includes(mapping.userProblem.id) 
                    ? 'text-green-900' 
                    : 'text-gray-900'
                }`}>
                  Yes, assess these leadership areas for this problem
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Summary and Next Steps */}
      {confirmedMappings.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">
              Ready for Impact Assessment
            </h3>
          </div>
          <p className="text-blue-800 mb-4">
            You've confirmed {confirmedMappings.length} problem area{confirmedMappings.length !== 1 ? 's' : ''} for assessment. 
            We'll now calculate the financial impact of the related leadership gaps on your business.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <span>Calculate Financial Impact</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• We'll show you a detailed assessment for each confirmed leadership area</li>
          <li>• You'll input realistic estimates for time wasted and costs</li>
          <li>• We'll calculate the monthly and annual financial impact</li>
          <li>• At the end, you'll have the option to assess additional leadership areas</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemAnalysis;