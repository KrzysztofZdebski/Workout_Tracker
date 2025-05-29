import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-t-2 border-b-2 border-[rgba(107,107,248,0.8)] rounded-full animate-spin"></div>
      <span className="ml-4 text-lg">Loading...</span>
    </div>
  );
}

export default Loading;