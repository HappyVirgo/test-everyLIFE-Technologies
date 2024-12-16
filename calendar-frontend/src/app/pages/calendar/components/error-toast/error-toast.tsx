import { ErrorToastStyle } from './styles/error-toast-style';

import React, { useEffect } from 'react';

// Define a type for the props of the toast
interface ErrorToastProps {
  message: string;
  showToast: boolean;
  onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, showToast, onClose }) => {
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Clean up timer on unmount
    }
  }, [showToast, onClose]);

  return (
    <div
      css={ErrorToastStyle(showToast)}
    >
      <p>{message}</p>
    </div>
  );
};

export default ErrorToast;
