import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";








export const InfoToast = ({ message, onClose, type, duration = "short" }) => {
  const [isExiting, setIsExiting] = useState(false);

  const getDuration = () => {
    switch (duration) {
      case "short":
        return 4000;
      case "medium":
        return 6000;
      case "long":
        return 8000;
      case "infinite":
        return null;
      default:
        return 4000;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <ExclamationCircleIcon className="h-6 w-6 shrink-0" />;
      case "success":
        return <CheckCircleIcon className="h-6 w-6 shrink-0" />;
      case "info":
        return <InformationCircleIcon className="h-6 w-6 shrink-0" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-error";
      case "success":
        return "bg-success";
      case "info":
        return "bg-info";
      case "warning":
        return "bg-warning";
      default:
        return "bg-toast";
    }
  };
  // cerrar toast con animacion
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, getDuration());
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={`${isExiting ? 'animate-slideUp' : 'animate-slideDown'} ${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between pointer-events-auto min-w-64 max-w-sm`}>
      <div className="flex items-center gap-2">
        {getIcon()}
        <span>{message}</span>
      </div>
      <button onClick={handleClose} className="ml-4 shrink-0">
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
};