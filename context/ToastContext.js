// context/ToastContext.js
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, options = {}) => {
    const id = Date.now();
    const toast = { id, message, ...options };
    setToasts(prev => [...prev, toast]);
    
    // Auto-dismiss after delay
    setTimeout(() => {
      dismissToast(id);
    }, options.duration || 3000);
  };
  
  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div id="toast-container">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast ${toast.type ? 'toast-' + toast.type : ''}`}
          >
            <span>{toast.message}</span>
            <button 
              onClick={() => dismissToast(toast.id)}
              className="ml-3 p-1 rounded-full hover:bg-black/10"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);