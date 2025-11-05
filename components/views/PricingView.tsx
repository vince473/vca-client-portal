import React, { useMemo } from 'react';
import { PlanTier } from '../../types';
import { PLANS } from '../../constants';
import PricingCard from '../PricingCard';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';

interface PricingViewProps {
  onSelectPlan: (p: PlanTier) => void;
}

const PricingView: React.FC<PricingViewProps> = ({ onSelectPlan }) => {
  const enterprise = useMemo(
    () => PLANS.filter((p) => p.category === "Enterprise & Institutional"),
    []
  );
  const smb = useMemo(
    () => PLANS.filter((p) => p.category === "Local Business Plans"),
    []
  );

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionHeader
        title="Pricing & Programs"
        subtitle="Two tracks: enterprise-grade buildouts for institutions, and streamlined packages for local operators."
      />
      <Card>
        <h3 className="mt-0 text-[#0B1B3B] text-2xl font-bold">
          Enterprise & Institutional Clients
        </h3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">
          {enterprise.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mt-0 text-[#0B1B3B] text-2xl font-bold">Local Business Plans</h3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">
          {smb.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default PricingView;
