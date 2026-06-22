import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Signatures } from './pages/Signatures';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { OrderOnline } from './pages/OrderOnline';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Legal } from './pages/Legal';

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
    switch (currentHash) {
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
        return <Home />; // fallback to home
    }
  };

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Floating Navigation Header */}
          <Navbar currentHash={currentHash} />

          {/* Main Content Area */}
          <main style={{ flex: '1 0 auto' }}>
            {renderActivePage()}
          </main>

          {/* Premium Info Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
