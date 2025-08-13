import React, { useState } from 'react';
import { Plus, CheckCircle, ArrowRight } from 'lucide-react';
import { LeadershipGap } from '../types';
import { initialLeadershipGaps } from '../data/leadershipGaps';

interface AdditionalAssessmentProps {
  assessedGapIds: number[];
  onAddGaps: (additionalGapIds: number[]) => void;
  onSkip: () => void;
}

const AdditionalAssessment: React.FC<AdditionalAssessmentProps> = ({ 
  assessedGapIds, 
  onAddGaps, 
  onSkip 
}) => {
  const [selectedAdditionalGaps, setSelectedAdditionalGaps] = useState<number[]>([]);

  // Get gaps that haven't been assessed yet
  const remainingGaps = initialLeadershipGaps.filter(gap => 
    !assessedGapIds.includes(gap.id)
  );

  // Group remaining gaps by category for better organization
  const groupedGaps = remainingGaps.reduce((acc, gap) => {
    // Simple categorization based on gap content
    let category = 'General Leadership';
    
    if (gap.title.toLowerCase().includes('communication') || gap.title.toLowerCase().includes('email') || gap.title.toLowerCase().includes('meeting')) {
      category = 'Communication & Meetings';
    } else if (gap.title.toLowerCase().includes('conflict') || gap.title.toLowerCase().includes('emotional')) {
      category = 'Emotional Intelligence & Conflict';
    } else if (gap.title.toLowerCase().includes('coaching') || gap.title.toLowerCase().includes('training') || gap.title.toLowerCase().includes('feedback')) {
      category = 'Development & Coaching';
    } else if (gap.title.toLowerCase().includes('delegation') || gap.title.toLowerCase().includes('decision') || gap.title.toLowerCase().includes('problem')) {
      category = 'Decision Making & Delegation';
    } else if (gap.title.toLowerCase().includes('time') || gap.title.toLowerCase().includes('productivity') || gap.title.toLowerCase().includes('project')) {
      category = 'Time & Project Management';
    }
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(gap);
    return acc;
  }, {} as Record<string, LeadershipGap[]>);

  const toggleGap = (gapId: number) => {
    setSelectedAdditionalGaps(prev => 
      prev.includes(gapId) 
        ? prev.filter(id => id !== gapId)
        : [...prev, gapId]
    );
  };

  const handleAddGaps = () => {
    onAddGaps(selectedAdditionalGaps);
  };

  if (remainingGaps.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Complete Assessment!
        </h3>
        <p className="text-green-800">
          You've assessed all available leadership areas. Great job on completing a comprehensive evaluation!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <Plus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Want to Assess Additional Leadership Areas?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've identified {remainingGaps.length} additional leadership areas that could impact your business. 
          Select any that you'd like to include in your assessment for a more comprehensive analysis.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedGaps).map(([category, gaps]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              {category}
            </h3>
            <div className="space-y-3">
              {gaps.map((gap) => (
                <label
                  key={gap.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    selectedAdditionalGaps.includes(gap.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedAdditionalGaps.includes(gap.id)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAdditionalGaps.includes(gap.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium mb-1 ${
                      selectedAdditionalGaps.includes(gap.id) ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {gap.title}
                    </h4>
                    <p className={`text-sm ${
                      selectedAdditionalGaps.includes(gap.id) ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {gap.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
        {selectedAdditionalGaps.length > 0 && (
          <button
            onClick={handleAddGaps}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <span>Assess {selectedAdditionalGaps.length} Additional Area{selectedAdditionalGaps.length !== 1 ? 's' : ''}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onSkip}
          className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
        >
          {selectedAdditionalGaps.length > 0 ? 'Skip Additional Assessment' : 'Continue with Current Assessment'}
        </button>
      </div>

      {selectedAdditionalGaps.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-blue-800 text-sm">
            <strong>Selected:</strong> {selectedAdditionalGaps.length} additional leadership area{selectedAdditionalGaps.length !== 1 ? 's' : ''} 
            will be added to your assessment. You can calculate their financial impact just like the previous areas.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdditionalAssessment;