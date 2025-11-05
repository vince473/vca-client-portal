import React from 'react';

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-6 md:mb-8">
    <h2 className="text-3xl md:text-4xl font-bold m-0 text-[#0B1B3B] tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p
        className="text-[#5F6B85] mt-2 text-base md:text-lg max-w-3xl mx-auto"
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
