// components/ModalTable.tsx
"use client";

import React from "react";

interface ModalTableProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalTable: React.FC<ModalTableProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg z-10 max-h-[90vh] overflow-y-auto w-11/12 md:w-3/4 lg:w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTable;
