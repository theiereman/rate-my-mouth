import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info" | "warning";
  duration?: number;
  onClose: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

export default function Toast({
  message,
  type = "error",
  duration = 4000,
  onClose,
  position = "top-right",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Enter animation
    setIsVisible(true);

    const timer = setTimeout(() => {
      // Exit animation
      setIsLeaving(true);

      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300); // Match the duration of the exit animation
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  // Type classes
  const getTypeClasses = () => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-800 border-l-4 border-red-500";
      case "success":
        return "bg-green-50 text-green-800 border-l-4 border-green-500";
      case "info":
        return "bg-blue-50 text-blue-800 border-l-4 border-blue-500";
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500";
      default:
        return "bg-red-50 text-red-800 border-l-4 border-red-500";
    }
  };

  // Icon based on type
  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <span className="material-symbols-outlined text-error-600">
            priority_high
          </span>
        );
      case "success":
        return (
          <span className="material-symbols-outlined text-valid-600">
            check
          </span>
        );
      case "info":
        return (
          <span className="material-symbols-outlined text-primary-600">
            info
          </span>
        );
      case "warning":
        return (
          <span className="material-symbols-outlined text-warning-600">
            warning
          </span>
        );
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed ${
          positionClasses[position]
        } flex items-start p-4 mb-4 w-full max-w-xs sm:max-w-sm
        rounded-lg shadow-lg z-50
        ${getTypeClasses()}
        ${
          isLeaving
            ? "animate-[fadeOut_0.3s_ease-in-out]"
            : "animate-[fadeIn_0.3s_ease-in-out]"
        }
      `}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 text-neutral-400 hover:text-neutral-900 focus:outline-none"
        onClick={() => {
          setIsLeaving(true);
          setIsVisible(false);
          onClose();
        }}
      >
        <span className="sr-only">Fermer</span>
        <span className="material-symbols-outlined text-primary-600 cursor-pointer">
          close
        </span>
      </button>
    </div>
  );
}
