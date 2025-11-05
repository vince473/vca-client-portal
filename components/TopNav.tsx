import React, { useState } from 'react';
import { Route } from '../types';
import LogoMark from './LogoMark';
import { CALENDLY_URL } from '../constants';

interface TopNavProps {
  route: Route;
  setRoute: (r: Route) => void;
  onOpenIntake: () => void;
}

const NavLink: React.FC<{
    currentRoute: Route;
    targetRoute: Route;
    setRoute: (r: Route) => void;
    children: React.ReactNode;
    onClick?: () => void;
}> = ({ currentRoute, targetRoute, setRoute, children, onClick }) => {
    const isActive = currentRoute === targetRoute;
    const classes = `px-3 py-2 rounded-lg font-extrabold cursor-pointer transition-colors duration-200 text-sm ${
        isActive ? 'bg-white text-[#0B1B3B] shadow-sm' : 'text-[#5F6B85] hover:text-[#0B1B3B]'
    }`;
    return (
        <button className={classes} onClick={() => { setRoute(targetRoute); if(onClick) onClick(); }}>
            {children}
        </button>
    );
};


const TopNav: React.FC<TopNavProps> = ({ route, setRoute, onOpenIntake }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuLinkClick = (r: Route) => {
    setRoute(r);
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#E6E8EF]">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-2.5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRoute('home')}>
          <LogoMark />
          <div className="font-black text-[#0B1B3B] text-base hidden sm:block">VCA Client Portal</div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1.5 items-center bg-[#F7F8FC] p-1 rounded-xl border border-[#E6E8EF]">
            <NavLink currentRoute={route} targetRoute="home" setRoute={setRoute}>Home</NavLink>
            <NavLink currentRoute={route} targetRoute="pricing" setRoute={setRoute}>Pricing</NavLink>
            <NavLink currentRoute={route} targetRoute="about" setRoute={setRoute}>About VCA</NavLink>
        </nav>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white border-2 border-[#D4AF37] text-[#0B1B3B] rounded-xl px-4 py-2 font-black text-sm transition-transform hover:scale-105"
          >
            Book a Call
          </a>
          <button
            onClick={onOpenIntake}
            className="bg-[#D4AF37] text-[#0B1B3B] border-2 border-[#D4AF37] rounded-xl px-4 py-2 font-black text-sm transition-transform hover:scale-105"
          >
            Start Intake
          </button>
        </div>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#0B1B3B]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E6E8EF] shadow-lg p-4">
          <nav className="flex flex-col gap-2 mb-4">
              <NavLink currentRoute={route} targetRoute="home" setRoute={handleMenuLinkClick}>Home</NavLink>
              <NavLink currentRoute={route} targetRoute="pricing" setRoute={handleMenuLinkClick}>Pricing</NavLink>
              <NavLink currentRoute={route} targetRoute="about" setRoute={handleMenuLinkClick}>About VCA</NavLink>
          </nav>
          <div className="flex flex-col gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center bg-white border-2 border-[#D4AF37] text-[#0B1B3B] rounded-xl px-4 py-2.5 font-black text-sm"
            >
              Book a Call
            </a>
            <button
              onClick={() => { onOpenIntake(); setIsMenuOpen(false); }}
              className="w-full text-center bg-[#D4AF37] text-[#0B1B3B] border-2 border-[#D4AF37] rounded-xl px-4 py-2.5 font-black text-sm"
            >
              Start Intake
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
