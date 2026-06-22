import React, { useState } from 'react';
import { SplineHero } from '../components/SplineHero';
import { SEO } from '../components/SEO';
import { ArrowRight, Star, Clock, Utensils, Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  const [activeImage, setActiveImage] = useState('./images/g1.jpg');
  const showcaseImages = [
    './images/g1.jpg',
    './images/g2.jpg',
    './images/g3.jpg',
    './images/g4.jpg',
    './images/g5.jpg',
    './images/g6.jpg',
    './images/g7.jpg',
  ];

  return (
    <div className="page-container">
      <SEO
        title="Home"
        description="Welcome to Amberleaf Restaurant in Srinagar. Enjoy modern fine dining, authentic Kashmiri specialties, and artisanal mocktails in an elegant glassmorphic ambiance."
      />
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start',
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

      {/* Ambience Showcase Section */}
      <div
        className="glass-panel ambience-grid"
        style={{
          marginTop: '3.5rem',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center',
          animation: 'fadeIn 1s ease forwards',
        }}
      >
        {/* Large Preview & Thumbnails Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '330px', border: '1px solid var(--border-color)' }}>
            <img
              src={activeImage}
              alt="Amberleaf Restaurant Interior"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                transition: 'all 0.5s ease',
              }}
            />
          </div>
          {/* Thumbnails Row */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.4rem',
            }}
          >
            {showcaseImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                style={{
                  width: '60px',
                  height: '45px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: activeImage === img ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  padding: 0,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#000',
                }}
              >
                <img src={img} alt={`Thumbnail ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Dine-In Ambiance
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
            Our Balgarden Sanctuary
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Step into a space where modern glass architecture meets warm, cozy wooden accents. Designed specifically for group gatherings, family dinners, and peaceful solo dining. Scroll through our real photo showcase to preview our warm lighting and dining spaces.
          </p>
          <a
            href="#/gallery"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '0.5rem',
            }}
          >
            Explore Full Gallery &rarr;
          </a>
        </div>
      </div>

      {/* Visual Stories - 5 Video Reels Preview */}
      <div
        style={{
          marginTop: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          animation: 'fadeIn 1s ease forwards',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Culinary Motion
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>
              Stories from the Kitchen & Lounge
            </h3>
          </div>
          <a
            href="#/gallery"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            All Videos &rarr;
          </a>
        </div>

        {/* Videos Horizontal Row */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
            width: '100%',
          }}
          className="home-videos-row"
        >
          {[
            { id: 's1', url: './images/s1.mp4', caption: 'Chef plating signature Wazwan' },
            { id: 's2', url: './images/s2.mp4', caption: 'Premium espresso brews' },
            { id: 's4', url: './images/s4.mp4', caption: 'Saffron Cooler Mocktail' },
            { id: 's5', url: './images/s5.mp4', caption: 'Mutton seekhs roasting' },
            { id: 's7', url: './images/s7.mp4', caption: 'Fresh artisan coffee beans' },
          ].map((vid) => (
            <div
              key={vid.id}
              className="glass-panel"
              style={{
                padding: '0.5rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                minWidth: '200px',
                width: '200px',
                flexShrink: 0,
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => { window.location.hash = '#/gallery'; }}
            >
              <div
                style={{
                  width: '100%',
                  height: '280px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#000',
                }}
              >
                <video
                  src={vid.url}
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.play().catch(err => console.log(err)); }}
                  onMouseLeave={(e) => { e.currentTarget.pause(); }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.7rem',
                  }}
                >
                  ▶
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  padding: '0.2rem 0',
                }}
              >
                {vid.caption}
              </span>
            </div>
          ))}
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
        @media (min-width: 768px) {
          .ambience-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
};
