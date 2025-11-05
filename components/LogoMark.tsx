import React, { useState } from 'react';
import { LOGO_SRC } from '../constants';

const LogoMark: React.FC = () => {
  const [ok, setOk] = useState<boolean>(Boolean(LOGO_SRC));

  if (ok) {
    return (
      <img
        src={LOGO_SRC}
        alt="VCA"
        onError={() => setOk(false)}
        className="w-10 h-10 rounded-lg object-cover shadow-inner"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#f1d77a] grid place-items-center text-[#0B1B3B] font-black text-xl shadow-inner"
    >
      V
    </div>
  );
};

export default LogoMark;
