import React from 'react';
import { MapPin, Building2, DollarSign, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Determine color based on match score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const scoreClass = getScoreColor(job.matchScore);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-full relative overflow-hidden group">
       {/* High Match Badge */}
       {job.matchScore >= 90 && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          TOP MATCH
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{job.company}</span>
          </div>
        </div>
        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 ${scoreClass}`}>
          <span className="text-sm font-bold">{job.matchScore}%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location} ({job.workMode})</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "{job.matchReason}"
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
           <span className="text-xs text-gray-400">Posted {job.postedAt}</span>
           <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
             Apply Now <ArrowUpRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
