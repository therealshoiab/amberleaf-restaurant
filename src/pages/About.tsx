import React from 'react';
import { SEO } from '../components/SEO';
import { Award, Compass, Leaf } from 'lucide-react';

export const About: React.FC = () => {
  const timelineEvents = [
    {
      year: '2021',
      title: 'The Spark & Vision',
      desc: 'Our founders set out to create a culinary sanctuary in Srinagar that blends standard wood-panel warmth with state-of-the-art glass architecture.',
    },
    {
      year: '2022',
      title: 'Sourcing the Spice Route',
      desc: 'Spent months partnering with organic spice growers in Pampore and local herdsmen in the valleys to secure pure saffron and organic halal meats.',
    },
    {
      year: '2023',
      title: 'The Balgarden Landmark',
      desc: 'Constructed our signature modern dining room at Nursing Garh, utilizing advanced soundproofing, comfortable seating, and premium ambient glass lighting.',
    },
    {
      year: '2024',
      title: 'Grand Opening & Acclaim',
      desc: 'Opened doors to the public. Quickly became popular for solo dining, groups, and private family dinners, achieving a near-perfect 4.9 rating on local directories.',
    },
    {
      year: '2026',
      title: 'Digital Experience & Expansion',
      desc: 'Launched our premium online reservation system and expanded our cafe lounge, creating a high-end social hub for travelers and food critics.',
    },
  ];

  return (
    <div className="page-container">
      <SEO
        title="Our Story"
        description="Learn about the history and culinary philosophy of Amberleaf Restaurant in Srinagar. Discover our timeline and commitment to sourcing local organic ingredients."
      />

      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Discover Amberleaf
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Our Legacy & Passion</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Culinary Values Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
        }}
      >
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'inline-block' }}>
            <Leaf size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Pure Ingredients</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            We use only 100% certified Halal meats, organic local saffron, and farm-fresh produce harvested from the Kashmir valleys.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'inline-block' }}>
            <Compass size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Authentic Wazwan</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Our recipes are passed down through generations of expert wazas, ensuring every spoonful of Rogan Josh is authentic.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'inline-block' }}>
            <Award size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Cozy Vibe</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            A space curated for groups, kids, and solo diners alike. Enjoy premium table service under customized amber lighting.
          </p>
        </div>
      </div>

      {/* History Timeline section */}
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <h3
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            marginBottom: '3rem',
          }}
        >
          Our Journey Through Time
        </h3>

        {/* Central timeline vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '80px',
            bottom: '20px',
            width: '2px',
            backgroundColor: 'var(--border-color)',
            zIndex: 1,
          }}
          className="timeline-center-line"
        />

        {/* Timeline event items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={event.year}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                  zIndex: 2,
                }}
                className={`timeline-item ${isEven ? 'even' : 'odd'}`}
              >
                {/* Timeline Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold)',
                    border: '4px solid var(--bg-primary)',
                    boxShadow: '0 0 10px var(--accent-gold)',
                  }}
                />

                {/* Content Panel (Left or Right) */}
                <div
                  className="glass-panel timeline-content"
                  style={{
                    width: '45%',
                    padding: '1.5rem',
                    textAlign: isEven ? 'right' : 'left',
                    marginLeft: isEven ? '0' : 'auto',
                    marginRight: isEven ? 'auto' : '0',
                    animation: 'fadeIn 0.6s ease forwards',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {event.year}
                  </span>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{event.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline responsive styling */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-center-line {
            left: 20px !important;
          }
          .timeline-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-left: 40px;
          }
          .timeline-item div[style*="left: 50%"] {
            left: 20px !important;
          }
          .timeline-content {
            width: 100% !important;
            text-align: left !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
