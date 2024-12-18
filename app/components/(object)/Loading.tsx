import React from 'react';

const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <div className="relative w-16 h-16">
      <div className="absolute border-4 border-blue-500 rounded-full w-full h-full animate-ping"></div>
      <div className="absolute border-4 border-blue-300 rounded-full w-full h-full"></div>
    </div>
  </div>
);

export default Loading;
