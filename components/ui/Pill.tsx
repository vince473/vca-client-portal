import React from 'react';

const Pill: React.FC<{ text: string }> = ({ text }) => (
  <span
    className="inline-block border border-[#E6E8EF] py-2 px-3 rounded-full bg-white text-sm m-1 text-[#0B1B3B] whitespace-nowrap"
  >
    {text}
  </span>
);

export default Pill;
