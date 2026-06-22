import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Amberleaf
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Fine Dine & Cafe
          </span>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.8rem',
        }}
        className="desktop-menu-container"
      >
        {navItems.map((item) => {
          const isActive = currentHash === item.hash || (item.hash === '#/home' && currentHash === '');
          return (
            <a
              key={item.hash}
              href={item.hash}
              style={{
                color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '0.25rem 0',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-gold)',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px rgba(var(--accent-gold-rgb), 0.6)',
                  }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Action Controls (Theme Switcher + Mobile Drawer Trigger) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="mobile-menu-trigger"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '85px',
            left: '1rem',
            right: '1rem',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 999,
            borderRadius: '12px',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
        </div>
      )}

      {/* Inline styles for responsive layout controls */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu-container {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-menu-trigger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
