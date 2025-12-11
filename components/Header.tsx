import React from 'react';
import { Briefcase, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 text-indigo-600">
              <Briefcase className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">SkillSync</span>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Find Jobs
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                My Resume
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Career Advice
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Saved Jobs
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
