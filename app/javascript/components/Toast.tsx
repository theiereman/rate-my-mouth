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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
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
          setTimeout(() => {
            setIsVisible(false);
            onClose();
          }, 300);
        }}
      >
        <span className="sr-only">Fermer</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
