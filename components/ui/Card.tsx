import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white border border-[#E6E8EF] rounded-2xl shadow-[0_6px_16px_rgba(11,27,59,0.08)] p-5 sm:p-6 ${className}`}
  >
    {children}
  </div>
);

export default Card;
