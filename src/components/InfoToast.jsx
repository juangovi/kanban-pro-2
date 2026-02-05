import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";








export const InfoToast = ({ message, onClose, type }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`${isExiting ? 'animate-slideUp' : 'animate-slideDown'} ${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between pointer-events-auto min-w-64 max-w-sm`}>
      <div className="flex items-center gap-2">
        {type === "error" && <ExclamationCircleIcon className="h-6 w-6" />}
        {type === "success" && <CheckCircleIcon className="h-6 w-6" />}
        {type === "info" && <InformationCircleIcon className="h-6 w-6" />}
        {type === "warning" && <ExclamationTriangleIcon className="h-6 w-6" />}
        <span>{message}</span>
      </div>
      <button onClick={handleClose} className="ml-4">
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
};