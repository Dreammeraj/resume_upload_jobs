import React from 'react';
import { ResumeAnalysis } from '../types';
import JobCard from './JobCard';
import { User, Award, RefreshCcw } from 'lucide-react';

interface AnalysisViewProps {
  data: ResumeAnalysis;
  onReset: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onReset }) => {
  return (
    <div className="animate-fade-in pb-12">
      {/* Profile Summary Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {data.candidateName || 'Candidate'}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {data.professionalSummary}
            </p>
          </div>

          <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Your Top Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.extractedSkills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recommended Opportunities</h2>
          <p className="text-gray-500 mt-1">Based on your skills profile, we found {data.recommendedJobs.length} matches.</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Upload New Resume
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recommendedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AnalysisView;
