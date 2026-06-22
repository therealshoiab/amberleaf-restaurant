import React from 'react';
import { SEO } from '../components/SEO';
import { Eye, FileText } from 'lucide-react';

export const Legal: React.FC = () => {
  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <SEO
        title="Terms & Privacy"
        description="Read the Terms of Service and Privacy Policy of Amberleaf Restaurant in Srinagar. Learn how we handle table bookings, data protection, and digital payments."
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
          Compliance & Policies
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Legal Information</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }} className="animate-fade-in">
        {/* Terms of Service Section */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <FileText size={22} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Terms of Service</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p>Welcome to Amberleaf Restaurant. By using our website, reservation desk, and online portals, you agree to comply with the following Terms of Service:</p>
            
            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>1. Reservations & Table Bookings</strong>
              <span>Table reservations placed through our website are subject to availability. Bookings are confirmed instantly on-screen and verified directly by our booking desk via phone call or SMS. We reserve the right to release tables if you are more than 15 minutes late without notifying us.</span>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>2. Conduct & Dine-In Policies</strong>
              <span>We maintain a casual yet refined environment suitable for families, groups, and solo diners. Guests are requested to respect other diners. We reserve the right to deny service or ask patrons to leave in case of disruptive behavior.</span>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>3. Online Ordering & Curbside Pickup</strong>
              <span>Orders placed via Zomato or Swiggy are subject to their respective terms and delivery parameters. For takeaway orders placed via call, guests are requested to arrive at the designated pickup time to ensure the food remains fresh and hot.</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>Last updated: June 22, 2026</p>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Eye size={22} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Privacy Policy</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p>Your privacy is of utmost importance to us. This Privacy Policy details how we collect, use, and protect your information when you visit Amberleaf:</p>

            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>1. Information We Collect</strong>
              <span>When you use our Table Reservation Form, we collect your Name, Phone Number, Email, and special request notes. This data is used solely to process your booking and is transmitted securely to our on-site reservation desk system. We do not sell or share this information.</span>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>2. Cookies & Analytics</strong>
              <span>We may use essential browser cookies to store your light/dark theme preference locally. No tracking or advertising cookies are utilized on our site.</span>
            </div>

            <div>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>3. Data Protection</strong>
              <span>We take reasonable precautions to protect the details you share with our staff. We will never sell, lease, or share your booking details or phone numbers with third-party marketing companies.</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>Last updated: June 22, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
