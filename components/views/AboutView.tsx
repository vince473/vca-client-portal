import React from 'react';
import Card from '../ui/Card';
import Pill from '../ui/Pill';
import SectionHeader from '../ui/SectionHeader';

const AboutView: React.FC = () => (
  <section className="space-y-8">
    <SectionHeader
      title="About VCA"
      subtitle="We build modern brand infrastructure with a hybrid of elite polish and cultural fluency."
    />
    <Card>
      <h3 className="mt-0 text-[#0B1B3B] text-2xl font-bold">Pillars</h3>
      <div className="-m-1 flex flex-wrap">
        {[
          "Strategy",
          "Brand Architecture",
          "Influencer Relations",
          "Experiential Marketing",
          "Artist Development",
          "Microfilms & Content Pods",
          "Sponsorships & Partnerships",
          "Radio/Podcast Production",
          "Social & Community",
          "Web/App Development",
        ].map((p) => (
          <Pill key={p} text={p} />
        ))}
      </div>
    </Card>

    <Card>
      <h3 className="mt-0 text-[#0B1B3B] text-2xl font-bold">Engagement Model</h3>
      <ul className="pl-5 space-y-3 list-disc text-[#0B1B3B]">
        <li>
          <strong>Assess & Align:</strong> Deep dive on goals, constraints, and KPIs.
        </li>
        <li>
          <strong>Architect & Activate:</strong> Brand, content, creator, and partnerships working in sync.
        </li>
        <li>
          <strong>Measure & Scale:</strong> Scorecards, sprints, and quarterly compounding.
        </li>
      </ul>
    </Card>
  </section>
);

export default AboutView;
