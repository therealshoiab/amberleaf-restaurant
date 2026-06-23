import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentHash: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentHash }) => {
  const [isThemeLight, setIsThemeLight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage or system settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
      setIsThemeLight(true);
      document.documentElement.classList.add('light-theme');
    } else {
      setIsThemeLight(false);
      document.documentElement.classList.remove('light-theme');
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
    { label: 'Order', hash: '#/order' },
    { label: 'Contact', hash: '#/contact' },
    { label: 'FAQ', hash: '#/faq' },
  ];

  return (
    <nav
      className="glass-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        transition: 'all 0.3s ease',
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
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
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
        }}
        className="desktop-menu-container"
      >
        {navItems.map((item, index) => {
          const isActive = currentHash === item.hash || (item.hash === '#/home' && currentHash === '');
          return (
            <React.Fragment key={item.hash}>
              <a
                href={item.hash}
                className="nav-hover-link"
                style={{
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  position: 'relative',
                  padding: '0.25rem 0',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--accent-gold)',
                      boxShadow: '0 0 8px rgba(var(--accent-gold-rgb), 0.6)',
                    }}
                  />
                )}
              </a>
              {index < navItems.length - 1 && (
                <span style={{ margin: '0 0.8rem', color: 'var(--accent-gold)', opacity: 0.5, fontSize: '0.8rem' }}>&bull;</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Action Controls (CTA button + Theme Switcher + Custom Mobile Trigger) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Reserve Table CTA (Desktop only) */}
        <a
          href="#/contact"
          className="btn-reserve-nav"
          style={{
            border: '1px solid var(--accent-gold)',
            background: 'transparent',
            color: 'var(--accent-gold)',
            padding: '0.5rem 1.25rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--accent-gold)';
          }}
        >
          Reserve a Table
        </a>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: 'var(--border-light)',
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ width: '22px', height: '2px', backgroundColor: 'var(--text-primary)' }}
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '22px', height: '2px', backgroundColor: 'var(--text-primary)' }}
          />
          <motion.div
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ width: '22px', height: '2px', backgroundColor: 'var(--text-primary)' }}
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
              gap: '1rem',
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
