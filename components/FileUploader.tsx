import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF, Text file, or Image of your resume.");
      return;
    }
    setFileName(file.name);
    onFileUpload(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative flex flex-col items-center justify-center w-full min-h-[300px] p-8 border-2 border-dashed rounded-2xl transition-all duration-200 ease-in-out
          ${dragActive ? 'border-indigo-600 bg-indigo-50 scale-[1.02]' : 'border-gray-300 bg-white hover:border-gray-400'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.txt,.png,.jpg,.jpeg"
        />

        {isLoading ? (
          <div className="flex flex-col items-center text-indigo-600">
            <Loader2 className="w-16 h-16 animate-spin mb-4" />
            <p className="text-xl font-semibold">Analyzing your resume...</p>
            <p className="text-sm text-indigo-400 mt-2">Matching your skills with thousands of jobs</p>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-full bg-indigo-50 mb-4 ${dragActive ? 'bg-indigo-100' : ''}`}>
               {fileName ? <FileText className="w-10 h-10 text-indigo-600" /> : <UploadCloud className="w-10 h-10 text-indigo-600" />}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {fileName ? `Selected: ${fileName}` : "Upload your resume"}
            </h3>
            
            <p className="text-gray-500 text-center mb-6 max-w-sm">
              {fileName 
                ? "We are ready to analyze. Click below if you want to change." 
                : "Drag and drop your resume here, or click to browse. Supported formats: PDF, TXT, PNG, JPG"}
            </p>

            <button
              onClick={onButtonClick}
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium shadow-md transition-all active:scale-95"
            >
              {fileName ? "Change File" : "Select File"}
            </button>
          </>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Tip:</strong> For the best results, ensure your resume lists your technical skills clearly. Our AI will extract them to find the highest-paying and most relevant roles.
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
