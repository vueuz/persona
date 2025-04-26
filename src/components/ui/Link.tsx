import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, children, className = '', onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Handle external links
    if (to.startsWith('http')) {
      window.open(to, '_blank');
      return;
    }
    
    // Handle internal navigation
    const hash = to.startsWith('/') ? `#${to}` : to;
    window.location.hash = hash;
    
    if (onClick) {
      onClick();
    }
  };
  
  const href = to.startsWith('http') ? to : `#${to.startsWith('/') ? to : `/${to}`}`;
  
  return (
    <a 
      href={href}
      className={`${className} cursor-pointer`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};