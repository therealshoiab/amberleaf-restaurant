import React from 'react';
import { Phone, MessageSquare, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        color: 'var(--text-secondary)',
        padding: '4rem 2rem 2rem 2rem',
        transition: 'all 0.3s ease',
      }}
    >
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
            <svg width="40" height="40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--accent-gold)" strokeWidth="2" />
              <path d="M25,50 C25,35 35,25 50,25" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M75,50 C75,35 65,25 50,25" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M43,62 L43,50 M40,50 L46,50 M40,50 L40,43 M46,43 L46,50 M43,41 L43,50" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M43,62 L38,67" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" />
              <path d="M57,62 L57,48" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="57" cy="43" rx="4" ry="6" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" />
              <path d="M57,62 L62,67" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="54" r="2.5" fill="var(--accent-gold)" />
            </svg>
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
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a
              href="https://www.instagram.com/amberleafsgr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-gold)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--accent-gold-rgb), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567573670152"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-gold)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--accent-gold-rgb), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
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
                Cafe Vibe & Hub
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
    </footer>
  );
};
