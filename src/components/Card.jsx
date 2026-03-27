import React from 'react';

export const Card = ({ children, className = '', highlight = false, ...props }) => {
  const baseClasses = 'card';
  const highlightClasses = highlight ? 'highlight-card' : '';

  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
