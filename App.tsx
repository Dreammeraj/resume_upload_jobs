import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import AnalysisView from './components/AnalysisView';
import { AppState, ResumeAnalysis } from './types';
import { analyzeResumeAndFindJobs } from './services/geminiService';
import { Sparkles, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisData, setAnalysisData] = useState<ResumeAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        try {
          const data = await analyzeResumeAndFindJobs(base64String, file.type);
          setAnalysisData(data);
          setAppState(AppState.RESULTS);
        } catch (error) {
          console.error(error);
          setAppState(AppState.ERROR);
          setErrorMsg("Could not analyze resume. Please try again or check your API key.");
        }
      };
      reader.onerror = () => {
        setAppState(AppState.ERROR);
        setErrorMsg("Error reading file.");
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setAppState(AppState.ERROR);
      setErrorMsg("Unexpected error occurred.");
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setAppState(AppState.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Intro / Hero Section - Only show when IDLE or ERROR */}
        {(appState === AppState.IDLE || appState === AppState.ERROR || appState === AppState.ANALYZING) && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-full mb-4">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-600 shadow-sm border border-indigo-100 uppercase tracking-wide">
                AI Powered
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Find Your Dream Job with <span className="text-indigo-600">Smart Matching</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Upload your resume and let our Gemini AI analyze your skills to instantly match you with the best available opportunities.
            </p>
          </div>
        )}

        {/* Error State */}
        {appState === AppState.ERROR && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p>{errorMsg || "Something went wrong. Please try again."}</p>
          </div>
        )}

        {/* Conditional Rendering based on State */}
        {appState === AppState.IDLE || appState === AppState.ANALYZING || appState === AppState.ERROR ? (
          <FileUploader 
            onFileUpload={handleFileUpload} 
            isLoading={appState === AppState.ANALYZING} 
          />
        ) : (
          appState === AppState.RESULTS && analysisData && (
            <AnalysisView 
              data={analysisData} 
              onReset={handleReset} 
            />
          )
        )}

        {/* Footer Features - Only show on IDLE */}
        {appState === AppState.IDLE && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Skill Extraction</h3>
              <p className="text-gray-500 text-sm">We automatically identify your core competencies, tools, and technologies from your resume text.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Ranking</h3>
              <p className="text-gray-500 text-sm">Jobs are scored based on how well they align with your experience, ensuring relevant results.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Instant Feedback</h3>
              <p className="text-gray-500 text-sm">Get immediate insights into why a job is a good match and what skills you might be missing.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
