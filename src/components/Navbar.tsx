import React, { useState, useEffect } from 'react';
import { Sun, Moon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentHash: string;
  hasBanner?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentHash, hasBanner = false }) => {
  const [isThemeLight, setIsThemeLight] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = currentHash === '#/home' || currentHash === '' || currentHash === '#';

  // Track scroll position to transition from transparent over hero to frosted glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme from localStorage or default to bright (light theme)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsThemeLight(false);
      document.documentElement.classList.remove('light-theme');
    } else {
      setIsThemeLight(true);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isThemeLight) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      setIsThemeLight(false);
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      setIsThemeLight(true);
    }
  };

  const navItems = [
    { label: 'Home', hash: '#/home' },
    { label: 'Menu', hash: '#/menu' },
    { label: 'Signatures', hash: '#/signatures' },
    { label: 'Gallery', hash: '#/gallery' },
    { label: 'Reviews', hash: '#/reviews' },
    { label: 'Contact', hash: '#/contact' },
    { label: 'FAQ', hash: '#/faq' },
  ];

  // Meydani Cafe style: Floating transparent navbar directly over hero on Home
  const isTransparentOverHero = isHome && !isScrolled;
  const navTextColor = isTransparentOverHero ? '#ffffff' : 'var(--text-primary)';
  const navBg = isTransparentOverHero
    ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.2) 65%, transparent 100%)'
    : 'var(--navbar-bg)';
  const navBorder = isTransparentOverHero ? 'none' : '1px solid var(--border-color)';
  const navShadow = isTransparentOverHero ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.25)';

  return (
    <nav
      className={isTransparentOverHero ? 'transparent-navbar' : 'glass-navbar'}
      style={{
        position: 'fixed',
        top: hasBanner ? '36px' : 0,
        left: 0,
        right: 0,
        height: '80px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: navBg,
        borderBottom: navBorder,
        boxShadow: navShadow,
        backdropFilter: isTransparentOverHero ? 'none' : 'blur(55px) saturate(200%)',
        WebkitBackdropFilter: isTransparentOverHero ? 'none' : 'blur(55px) saturate(200%)',
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Brand Logo and Name */}
      <a
        href="#/home"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
        }}
      >
        <img
          src="./images/logo.png"
          alt="Amberleaf Logo"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            border: '1px solid var(--accent-gold)',
            objectFit: 'cover',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.05rem, 4.5vw, 1.25rem)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: navTextColor,
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              textShadow: isTransparentOverHero ? '0 2px 10px rgba(0,0,0,0.8)' : 'none',
              transition: 'color 0.3s ease',
            }}
          >
            Amberleaf
          </span>
          <span
            style={{
              fontSize: 'clamp(0.55rem, 2.5vw, 0.65rem)',
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              textShadow: isTransparentOverHero ? '0 2px 8px rgba(0,0,0,0.8)' : 'none',
            }}
          >
            Fine Dine & Cafe
          </span>
        </div>
      </a>

      {/* Desktop Navigation Links with Gold Dot Dividers */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.25rem',
        }}
        className="desktop-menu-container"
      >
        {navItems.map((item, index) => {
          const isActive = currentHash === item.hash || (item.hash === '#/home' && currentHash === '');
          return (
            <React.Fragment key={item.hash}>
              <a
                href={item.hash}
                className="luxury-nav-link"
                style={{
                  color: isActive ? 'var(--accent-gold)' : navTextColor,
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  padding: '0.3rem 0',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  textShadow: isTransparentOverHero ? '0 2px 8px rgba(0,0,0,0.8)' : 'none',
                }}
              >
                {item.label}
                <span
                  className="nav-gold-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-gold)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </a>

              {/* Subtle Gold Dot separator between nav items on desktop */}
              {index < navItems.length - 1 && (
                <span
                  style={{
                    color: 'var(--accent-gold)',
                    opacity: 0.5,
                    fontSize: '0.7rem',
                    userSelect: 'none',
                  }}
                >
                  &bull;
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Controls Container */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Solid Gold Reserve Table CTA Button (Exact Meydani Cafe style) */}
        <a
          href="#/contact"
          className="btn-reserve-nav"
          style={{
            backgroundColor: 'var(--accent-gold)',
            color: '#040906',
            padding: '0.6rem 1.45rem',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 15px rgba(var(--accent-gold-rgb), 0.4)',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(var(--accent-gold-rgb), 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(var(--accent-gold-rgb), 0.4)';
          }}
        >
          Reserve Table
        </a>

        {/* Admin Quick Access Button */}
        <a
          href="#/admin"
          aria-label="Admin Portal"
          title="Admin Portal"
          style={{
            background: 'none',
            border: isTransparentOverHero ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
            color: currentHash === '#/admin' ? 'var(--accent-gold)' : (isTransparentOverHero ? '#ffffff' : 'var(--text-secondary)'),
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: currentHash === '#/admin' ? 'rgba(197, 160, 89, 0.25)' : (isTransparentOverHero ? 'rgba(0, 0, 0, 0.3)' : 'var(--border-light)'),
            transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.color = 'var(--accent-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = currentHash === '#/admin' ? 'var(--accent-gold)' : (isTransparentOverHero ? '#ffffff' : 'var(--text-secondary)');
          }}
        >
          <Lock size={16} />
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${isThemeLight ? 'Dark' : 'Light'} Mode`}
          style={{
            background: 'none',
            border: isTransparentOverHero ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
            color: isTransparentOverHero ? '#ffffff' : 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: isTransparentOverHero ? 'rgba(0, 0, 0, 0.3)' : 'var(--border-light)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(15deg)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
        >
          {isThemeLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Mobile Menu Button - custom animated Framer Motion Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '6px',
            width: '32px',
            height: '32px',
            zIndex: 1001,
          }}
          className="mobile-menu-trigger"
        >
          <motion.div
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ width: '22px', height: '2px', backgroundColor: navTextColor }}
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '22px', height: '2px', backgroundColor: navTextColor }}
          />
          <motion.div
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ width: '22px', height: '2px', backgroundColor: navTextColor }}
          />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '85px',
              left: '1rem',
              right: '1rem',
              padding: '1.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              zIndex: 999,
              borderRadius: '12px',
              backgroundColor: 'var(--mobile-menu-bg)',
              backdropFilter: 'blur(55px)',
              WebkitBackdropFilter: 'blur(55px)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.75), inset 0 0 15px rgba(197, 160, 89, 0.05)',
            }}
          >
            {navItems.map((item) => {
              const isActive = currentHash === item.hash || (item.hash === '#/home' && currentHash === '');
              return (
                <a
                  key={item.hash}
                  href={item.hash}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.label}
                  {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }} />}
                </a>
              );
            })}

            {/* Mobile Admin Link */}
            <a
              href="#/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: currentHash === '#/admin' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Lock size={15} />
              <span>Admin Management Portal</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for responsive layout controls */}
      <style>{`
        .btn-reserve-nav {
          display: none !important;
        }
        @media (min-width: 1024px) {
          .desktop-menu-container {
            display: flex !important;
          }
          .btn-reserve-nav {
            display: inline-block !important;
          }
        }
        @media (max-width: 1023px) {
          .glass-navbar {
            padding: 0 1.25rem !important;
          }
          .mobile-menu-trigger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
