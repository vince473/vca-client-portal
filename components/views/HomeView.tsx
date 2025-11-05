import React from 'react';
import { PlanTier } from '../../types';
import Hero from '../Hero';
import SectionHeader from '../ui/SectionHeader';
import PricingCard from '../PricingCard';
import { PLANS } from '../../constants';

interface HomeViewProps {
    onOpenIntake: () => void;
    onSelectPlan: (p: PlanTier) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onOpenIntake, onSelectPlan }) => (
  <section className="space-y-8 md:space-y-12">
    <Hero onOpen={onOpenIntake} />
    <div>
        <SectionHeader title="Choose Your Track" subtitle="From enterprise-grade buildouts to streamlined local packages, find the right fit for your goals." />
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">
            {PLANS.map((plan) => (
                <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
            ))}
        </div>
    </div>
  </section>
);

export default HomeView;
