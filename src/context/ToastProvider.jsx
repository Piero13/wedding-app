import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "./ToastContext"

/**
 * Toast provider
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, variant = "success") => {
    setToast({ message, variant });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="top-center" className="p-3">
        {toast && (
          <Toast
            bg={toast.variant}
            onClose={() => setToast(null)}
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">
              {toast.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </ToastContext.Provider>
  );
}