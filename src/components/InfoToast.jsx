import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';


export const InfoToast = ({ message, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // Desaparece en 4 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

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
    <div className={`animate-slideDown ${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between mb-3`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
};