import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Lazy load all page components for optimization
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Menu = React.lazy(() => import('./pages/Menu').then(module => ({ default: module.Menu })));
const Signatures = React.lazy(() => import('./pages/Signatures').then(module => ({ default: module.Signatures })));
const Gallery = React.lazy(() => import('./pages/Gallery').then(module => ({ default: module.Gallery })));
const Reviews = React.lazy(() => import('./pages/Reviews').then(module => ({ default: module.Reviews })));
const OrderOnline = React.lazy(() => import('./pages/OrderOnline').then(module => ({ default: module.OrderOnline })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const FAQ = React.lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const Legal = React.lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));

// Custom Minimalist Luxury Loader Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="luxury-spinner" style={{ width: '40px', height: '40px', border: '1px solid rgba(197, 160, 89, 0.1)', borderTop: '1px solid var(--accent-gold)', borderRadius: '50%', animation: 'spinPageLoader 1.2s linear infinite' }} />
    <style>{`
      @keyframes spinPageLoader {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Hash change listener
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Auto scroll to top on hash change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Set default hash to #/home if empty or invalid
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/home';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper to render the active page based on the current hash
  const renderActivePage = () => {
    const cleanHash = currentHash.split('?')[0];
    switch (cleanHash) {
      case '#/home':
      case '':
        return <Home />;
      case '#/about':
        return <About />;
      case '#/menu':
        return <Menu />;
      case '#/signatures':
        return <Signatures />;
      case '#/gallery':
        return <Gallery />;
      case '#/reviews':
        return <Reviews />;
      case '#/order':
        return <OrderOnline />;
      case '#/contact':
        return <Contact />;
      case '#/faq':
        return <FAQ />;
      case '#/legal':
        return <Legal />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* Cinematic preloader */}
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Floating Navigation Header */}
          <Navbar currentHash={currentHash} />

          {/* Main Content Area with Page Transitions */}
          <main style={{ flex: '1 0 auto', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHash.split('?')[0]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Suspense fallback={<PageLoader />}>
                  {renderActivePage()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Premium Info Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
