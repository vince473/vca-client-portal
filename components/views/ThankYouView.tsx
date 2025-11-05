import React from 'react';
import { CALENDLY_URL } from '../../constants';

const ThankYouView: React.FC = () => (
  <section
    className="flex flex-col items-center justify-center text-center min-h-[50vh] p-4"
  >
    <div className="max-w-2xl">
      <h2 className="text-[#0B1B3B] text-3xl md:text-4xl font-bold m-0">Thank you — we’ve received your info.</h2>
      <p className="text-[#5F6B85] text-lg mt-4">
        A VCA team member will reach out shortly. If you'd prefer to pick a time now, feel free to book a call directly on our calendar.
      </p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block bg-[#D4AF37] text-[#0B1B3B] rounded-xl px-8 py-3 font-black text-lg transition-transform hover:scale-105 no-underline"
      >
        Book a Call
      </a>
    </div>
  </section>
);

export default ThankYouView;
