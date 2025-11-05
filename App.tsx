import React, { useState, useCallback, useEffect } from 'react';
import { Route, PlanTier } from './types';
import TopNav from './components/TopNav';
import HomeView from './components/views/HomeView';
import PricingView from './components/views/PricingView';
import AboutView from './components/views/AboutView';
import ThankYouView from './components/views/ThankYouView';
import IntakeModal from './components/IntakeModal';

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | undefined>();

  const handleOpenIntake = useCallback(() => {
    setIsIntakeOpen(true);
  }, []);

  const handleSelectPlan = useCallback((plan: PlanTier) => {
    setSelectedPlan(plan);
    setIsIntakeOpen(true);
  }, []);
  
  const handleCloseIntake = useCallback(() => {
    setIsIntakeOpen(false);
    // Clear plan selection after a short delay to prevent UI flicker
    setTimeout(() => setSelectedPlan(undefined), 300);
  }, []);


  useEffect(() => {
    const handleNavigate = (event: Event) => {
        const customEvent = event as CustomEvent<Route>;
        if (customEvent.detail) {
            setRoute(customEvent.detail);
            window.scrollTo(0, 0);
        }
    };
    window.addEventListener('vca:navigate', handleNavigate);
    return () => {
        window.removeEventListener('vca:navigate', handleNavigate);
    };
  }, []);

  const renderContent = () => {
    switch (route) {
      case 'home':
        return <HomeView onOpenIntake={handleOpenIntake} onSelectPlan={handleSelectPlan} />;
      case 'pricing':
        return <PricingView onSelectPlan={handleSelectPlan} />;
      case 'about':
        return <AboutView />;
      case 'thankyou':
        return <ThankYouView />;
      default:
        return <HomeView onOpenIntake={handleOpenIntake} onSelectPlan={handleSelectPlan} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <TopNav route={route} setRoute={setRoute} onOpenIntake={handleOpenIntake} />
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      <IntakeModal
        open={isIntakeOpen}
        onClose={handleCloseIntake}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}

export default App;
