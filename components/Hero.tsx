import React from 'react';
import Card from './ui/Card';
import Pill from './ui/Pill';
import { CALENDLY_URL } from '../constants';

const Hero: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <section className="bg-gradient-to-b from-[#0B1B3B] to-[#12295A] text-white rounded-3xl p-6 md:p-10">
    <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
      <div>
        <h1 className="mt-0 text-4xl md:text-5xl font-extrabold leading-tight">
          Vince Carol & Associates (VCA)
        </h1>
        <p className="opacity-95 text-lg md:text-xl max-w-2xl mt-4">
          We build brand infrastructure for creators, founders, and institutions — from strategy to microfilms, from influencer ecosystems to experiential campaigns. Real polish. Real pipeline. Real growth.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={onOpen}
            className="bg-[#D4AF37] text-[#0B1B3B] border-2 border-[#D4AF37] rounded-xl px-6 py-3 font-black transition-transform hover:scale-105"
          >
            Start an Intake
          </button>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-transparent border-2 border-[#D4AF37] text-white rounded-xl px-6 py-3 font-black transition-transform hover:scale-105 no-underline"
          >
            Book a Call
          </a>
        </div>
        <div className="mt-6 -m-1">
          {["Strategy", "Brand Architecture", "Influencer Relations", "Experiential Marketing", "Artist Development"].map(
            (t) => (
              <Pill key={t} text={t} />
            )
          )}
        </div>
      </div>
      <Card className="text-[#0B1B3B]">
        <h3 className="mt-0 text-xl font-bold">Why VCA</h3>
        <ul className="pl-5 space-y-3 list-disc">
          <li>Hybrid of elite polish and cultural fluency</li>
          <li>Creator-centric growth with measurable KPIs</li>
          <li>Plug-in pods for video, experiential, and partnerships</li>
          <li>Built to scale with you — SMB to Enterprise</li>
        </ul>
      </Card>
    </div>
  </section>
);

export default Hero;
