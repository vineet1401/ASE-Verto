import React, { useEffect } from 'react';
import '../Toast.css';

const Toast = ({ message, onClose }) => {
  if (!message) return null;
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  return <div className="toast">{message}</div>;
};

export default Toast;
