import React from 'react';
import { SplineHero } from '../components/SplineHero';
import { SEO } from '../components/SEO';
import { ArrowRight, Star, Clock, Utensils, Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="page-container" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <SEO
        title="Home"
        description="Welcome to Amberleaf Restaurant in Srinagar. Enjoy modern fine dining, authentic Kashmiri specialties, and artisanal mocktails in an elegant glassmorphic ambiance."
      />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          flex: 1,
          paddingTop: '2rem',
        }}
        className="hero-grid"
      >
        {/* Left Panel: Content */}
        <div
          className="animate-fade-in"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          {/* Badges Container */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Star size={14} fill="var(--accent-gold)" />
              <span>4.9 / 5 Guest Rating</span>
            </div>

            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              <Clock size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Open Daily: 09:00am - 10:30pm</span>
            </div>
          </div>

          {/* Heading and Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              Where Taste Meets <br />
              <span className="text-gold" style={{ display: 'inline-block', position: 'relative' }}>
                Refined Elegance
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                letterSpacing: '0.05em',
                fontWeight: 500,
              }}
            >
              Elevating Kashmiri Hospitality & Culinary Artistry
            </p>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '550px' }}>
            Located in the heart of Srinagar, Amberleaf merges cozy glassmorphic aesthetics with a premium, multi-cuisine dining experience. Indulge in our masterfully crafted Kashmiri Wazwan, fiery tandoor starters, and signature artisanal beverages.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <a href="#/menu" className="btn-primary" style={{ gap: '0.5rem' }}>
              <Utensils size={18} />
              Explore Menu
              <ArrowRight size={16} />
            </a>
            <a href="#/contact" className="btn-secondary" style={{ gap: '0.5rem' }}>
              <Calendar size={18} />
              Book a Table
            </a>
          </div>

          {/* Micro-Features grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.5rem',
            }}
          >
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>100%</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Halal Ingredients</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Private</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dining Room Available</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Free</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>On-site Parking</span>
            </div>
          </div>
        </div>

        {/* Right Panel: 3D Spline Canvas or store fallback */}
        <div
          style={{
            height: '450px',
            width: '100%',
            position: 'relative',
          }}
          className="hero-canvas-container"
        >
          <SplineHero />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .hero-canvas-container {
            height: 550px !important;
          }
        }
      `}</style>
    </div>
  );
};
