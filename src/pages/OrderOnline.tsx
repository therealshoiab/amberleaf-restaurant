import React from 'react';
import { SEO } from '../components/SEO';
import { ShoppingBag, PhoneCall, CheckCircle, ExternalLink, MapPin } from 'lucide-react';

export const OrderOnline: React.FC = () => {
  return (
    <div className="page-container">
      <SEO
        title="Order Online"
        description="Order food online from Amberleaf Restaurant in Srinagar. Connect directly to Swiggy and Zomato or read our drive-through and curbside pickup instructions."
      />

      {/* Page Header */}
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
          Delivery & Pickup
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Order Online</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Cards container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Swiggy & Zomato Delivery Panel */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            animation: 'fadeIn 0.8s ease forwards',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ShoppingBag size={24} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Direct Delivery Partners</h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Get hot, fresh Kashmiri food delivered directly to your doorstep. We pack our curries and seekh kebabs in leak-proof, food-grade hot cases to preserve texture and temperature.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {/* Zomato Button Card */}
            <a
              href="https://www.zomato.com" // Placeholder for Zomato order link
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'rgba(220, 38, 38, 0.03)',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--accent-gold-rgb), 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.03)';
              }}
            >
              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1.05rem', color: '#dc2626' }}>Zomato Order</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Delivering in 30-45 minutes</span>
              </div>
              <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
            </a>

            {/* Swiggy Button Card */}
            <a
              href="https://www.swiggy.com" // Placeholder for Swiggy order link
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'rgba(249, 115, 22, 0.03)',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--accent-gold-rgb), 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.03)';
              }}
            >
              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1.05rem', color: '#f97316' }}>Swiggy Order</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Free delivery on select ranges</span>
              </div>
              <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
            </a>
          </div>
        </div>

        {/* Takeaway / Drive-Through Instructions Panel */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            animation: 'fadeIn 0.8s ease forwards',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <PhoneCall size={24} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Takeaway & Curbside Pickup</h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Avoid wait times! Place an order directly with our crew and pick it up on your way home or straight to your vehicle at Balgarden.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <span style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>1. Pre-order via Call</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Call us 20 minutes prior to arrival at <a href="tel:+916006379610" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>+91 6006379610</a> to place your order.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <span style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>2. Drive to Balgarden</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Drive to our address: 310, Balgarden - Nursing garh Rd, Srinagar. Pull up by our parking lane.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <CheckCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.25rem' }} />
              <div>
                <span style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>3. Curbside Handover</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Our crew will deliver your sealed order in premium insulated carrybags directly to your car window or motorcycle.
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>Curbside pickup coordinates are free from street parking fees.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
