import React from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, type = "text", placeholder, required }) => (
  <div>
    <label
      className="block font-bold text-[#0B1B3B] mb-1.5 text-sm"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full border border-[#E6E8EF] rounded-lg py-2.5 px-3 bg-white text-[#0B1B3B] placeholder-[#9fa7bc] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-shadow"
    />
  </div>
);

export default Field;
