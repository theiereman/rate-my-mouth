import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "error" | "success" | "info" | "warning";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    { type = "info", duration = 4000 }: ToastOptions = {},
  ) => {
    const id = Date.now(); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error(
      "useToast doit être utilisé à l'intérieur d'un ToastProvider",
    );
  }
  return context;
};
