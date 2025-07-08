'use client';

import { useEffect, useState } from 'react';
import { FiCheckCircle, FiX, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const VARIANTS = {
  success: {
    icon: <FiCheckCircle className="h-6 w-6 text-green-400" />,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
  },
  error: {
    icon: <FiAlertCircle className="h-6 w-6 text-red-400" />,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
  },
  warning: {
    icon: <FiAlertTriangle className="h-6 w-6 text-yellow-400" />,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
  },
  info: {
    icon: <FiInfo className="h-6 w-6 text-blue-400" />,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
  },
};

export default function Toast({ message, variant = 'info', onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const { icon, bgColor, textColor, borderColor } = VARIANTS[variant] || VARIANTS.info;

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={`rounded-md p-4 border ${bgColor} ${borderColor} shadow-lg`}
        role="alert"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${textColor}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });

  const showToast = (message, variant = 'info') => {
    setToast({ show: true, message, variant });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const ToastContainer = () => (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={hideToast}
        />
      )}
    </>
  );

  return { showToast, hideToast, ToastContainer };
}
