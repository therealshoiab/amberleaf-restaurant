import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/amberleafsgr/',
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61567573670152',
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/917780938743',
      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        padding: '4rem 2rem 2rem 2rem',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* 7. Pulsing Gold Gradient Border */}
      <div
        className="luxury-pulse"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--gradient-gold)',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Column 1: Brand & Vibe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginTop: '0.5rem' }}>
            Experience culinary excellence in the heart of Srinagar. Indulge in our selection of authentic Kashmiri Wazwan, grills, and artisanal mocktails in a high-end glassmorphic environment.
          </p>
          
          {/* Social Links with hover scale + gold color transition */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {socialLinks.map((social) => {
              const [hover, setHover] = React.useState(false);
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={{
                    color: hover ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    backgroundColor: hover ? 'rgba(197, 160, 89, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: hover ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    padding: '0.6rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hover ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {social.svg}
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <li>
              <a href="#/menu" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                View Our Menu
              </a>
            </li>
            <li>
              <a href="#/signatures" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                Signature Dishes
              </a>
            </li>
            <li>
              <a href="#/gallery" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                Restaurant Gallery
              </a>
            </li>
            <li>
              <a href="#/reviews" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                Guest Reviews
              </a>
            </li>
            <li>
              <a href="#/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                Book a Table
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Get In Touch</h3>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
            <span style={{ lineHeight: '1.5' }}>310, Balgarden - Nursing garh Rd, Balgarden, Srinagar, J&K 190010</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Phone size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <a href="tel:+916006379610" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
              +91 60063 79610
            </a>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <MessageSquare size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <a href="https://wa.me/917780938743" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
              +91 77809 38743 (WhatsApp Booking)
            </a>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Clock size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <span>Open Daily: 09:00am - 10:30pm</span>
          </div>
        </div>
      </div>

      {/* Legal & Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.85rem',
        }}
      >
        <span>&copy; {new Date().getFullYear()} Amberleaf Restaurant. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#/legal" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
            Terms of Service
          </a>
          <a href="#/legal" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
            Privacy Policy
          </a>
        </div>
      </div>

      {/* 7. Circular Fixed Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none', // hidden under custom cursor
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            zIndex: 9998,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--accent-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      )}
    </footer>
  );
};
