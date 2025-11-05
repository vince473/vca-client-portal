import React from 'react';
import { Plan, PlanTier } from '../types';
import Card from './ui/Card';
import { CALENDLY_URL } from '../constants';

interface PricingCardProps {
  plan: Plan;
  onSelect: (planId: PlanTier) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => (
  <Card className="flex flex-col h-full">
    <div className="flex justify-between items-start">
      <h3 className="m-0 text-[#0B1B3B] text-xl font-bold">{plan.id}</h3>
      <strong className="text-[#D4AF37] text-xl font-bold whitespace-nowrap pl-2">
        {plan.priceLabel}
        <span className="text-[#5F6B85] font-medium text-base">{plan.cadence}</span>
      </strong>
    </div>
    <p className="text-[#5F6B85] mt-2 text-base flex-grow">{plan.blurb}</p>
    <ul className="mt-4 mb-5 pl-5 space-y-2 list-disc text-[#0B1B3B]">
      {plan.features.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
    <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        onClick={() => onSelect(plan.id)}
        className="w-full bg-[#D4AF37] text-[#0B1B3B] border-2 border-[#D4AF37] rounded-lg px-4 py-3 font-bold cursor-pointer transition-transform hover:scale-105"
      >
        Get Started
      </button>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        className="w-full text-center bg-white border-2 border-[#D4AF37] text-[#0B1B3B] rounded-lg px-4 py-3 font-bold no-underline transition-transform hover:scale-105"
      >
        Book a Call
      </a>
    </div>
  </Card>
);

export default PricingCard;
