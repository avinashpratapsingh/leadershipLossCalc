import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Target, AlertCircle } from 'lucide-react';
import { UserProblem } from '../types';
import { userProblems } from '../data/userProblems';

interface ProblemIdentificationProps {
  onNext: (selectedProblems: UserProblem[]) => void;
}

const ProblemIdentification: React.FC<ProblemIdentificationProps> = ({ onNext }) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  const toggleProblem = (problemId: string) => {
    setSelectedProblems(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleNext = () => {
    const selected = userProblems.filter(problem => selectedProblems.includes(problem.id));
    onNext(selected);
  };

  const groupedProblems = userProblems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = [];
    }
    acc[problem.category].push(problem);
    return acc;
  }, {} as Record<string, UserProblem[]>);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Target className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          What Challenges Are You Facing?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the problems you're currently experiencing in your organization. 
          This will help us provide a personalized assessment of your leadership gaps.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Use This Assessment</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Review each challenge below and check the ones that apply to your organization</li>
              <li>• Be honest - this assessment is designed to help you identify real issues</li>
              <li>• Select at least 3-5 challenges for a meaningful assessment</li>
              <li>• You can always add more challenges later in the process</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Problem Categories */}
      <div className="space-y-8">
        {Object.entries(groupedProblems).map(([category, problems]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              {category}
            </h2>
            <div className="space-y-3">
              {problems.map((problem) => (
                <label
                  key={problem.id}
                  onClick={() => toggleProblem(problem.id)}
                 Confirm the Leadership Gaps We Should Assess
}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProblems.includes(problem.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedProblems.includes(problem.id)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedProblems.includes(problem.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      selectedProblems.includes(problem.id) ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {problem.text}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedProblems.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">
              Great! You've selected {selectedProblems.length} challenge{selectedProblems.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <p className="text-green-800 mb-4">
            We'll now show you the specific leadership gaps that typically cause these problems 
            and help you calculate their financial impact on your business.
          </p>
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <span>Continue to Problem Analysis</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* No Selection Message */}
      {selectedProblems.length === 0 && (
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Select the challenges you're facing to get started with your personalized assessment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemIdentification;