import React, { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
  duration?: number; // Duration in milliseconds
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    // Auto-dismiss notification after duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Clear timeout on unmount
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <span className={`notification-icon ${type}-icon`}></span>
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;
