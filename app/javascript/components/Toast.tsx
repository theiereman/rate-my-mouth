import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success";
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = "error",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseClasses =
    "fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-opacity";
  const typeClasses =
    type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white";

  return isVisible ? (
    <div className={`${baseClasses} ${typeClasses}`}>{message}</div>
  ) : null;
}
