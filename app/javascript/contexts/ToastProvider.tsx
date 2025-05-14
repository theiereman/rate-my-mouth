import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/Toast";

type ToastType = "error" | "success" | "info" | "warning";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    {
      type = "info",
      duration = 4000,
      position = "top-right",
    }: ToastOptions = {}
  ) => {
    const id = Date.now(); // Simple unique ID
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, duration, position },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error(
      "useToast doit être utilisé à l'intérieur d'un ToastProvider"
    );
  }
  return context;
};
