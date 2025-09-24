import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'primary' | 'secondary' | 'success' | 'warning';
  inline?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  inline = false 
}) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
  }[size];

  const colorClass = `spinner-${color}`;
  const inlineClass = inline ? 'spinner-inline' : '';

  return (
    <div className={`spinner-container ${inlineClass} ${sizeClass}`}>
      <div className={`spinner ${colorClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;
