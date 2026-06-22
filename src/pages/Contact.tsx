import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { MapPin, Phone, MessageSquare, Clock, Calendar, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStep, setSubmittingStep] = useState(0);
  const [formError, setFormError] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [assignedTable, setAssignedTable] = useState('');

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setFormError('Please enter a valid phone number.');
      return;
    }
    if (!date) {
      setFormError('Please select a booking date.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    setSubmittingStep(1);

    // Formulate variables
    const randomRef = 'AMB-' + Math.floor(10000 + Math.random() * 90000) + '-' + date.split('-')[0];
    const tables = [
      'Table 4 (Balgarden Balcony View)',
      'Table 8 (Sanctuary Garden Booth)',
      'Table 12 (Interior Glass Atrium)',
      'Table 16 (Family Executive Area)',
      'Table 2 (Cosy Corner Lounge)',
    ];
    const randomTable = tables[Math.floor(Math.random() * tables.length)];

    setBookingRef(randomRef);
    setAssignedTable(randomTable);

    // Multi-stage luxury booking progress
    setTimeout(() => {
      setSubmittingStep(2);
      setTimeout(() => {
        setSubmittingStep(3);
        setTimeout(() => {
          setSubmittingStep(4);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Trigger canvas-confetti
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 }
            });
          }, 1000);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="page-container">
      <SEO
        title="Contact & Bookings"
        description="Book a table at Amberleaf Restaurant in Srinagar. Submit our reservation form to secure instant table allocation and print your luxury pass."
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
          Get In Touch
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Contact & Reservations</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
        className="contact-layout"
      >
        {/* Left Side: Contact Information & Google Maps Iframe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Restaurant Location</h3>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
              <MapPin size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Street Address</strong>
                <span style={{ lineHeight: '1.5' }}>310, Balgarden - Nursing garh Rd, Balgarden, Srinagar, Jammu and Kashmir 190010</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
              <Phone size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Call Booking</strong>
                <span>+91 6006379610</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
              <MessageSquare size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>WhatsApp Booking</strong>
                <span>+91 7780938743</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
              <Clock size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Opening Hours</strong>
                <span>Open Daily: 09:00am to 10:30pm</span>
              </div>
            </div>
          </div>

          {/* Google Map Embed Frame */}
          <div
            className="glass-panel"
            style={{
              padding: '0.75rem',
              borderRadius: '16px',
              height: '350px',
              overflow: 'hidden',
            }}
          >
            <iframe
              title="Amberleaf Restaurant Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1610488665793!2d74.7937599!3d34.0751653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f2f0e138d9f%3A0x84f54ebf6f74ac30!2sAmberleaf%20Restaurant!5e0!3m2!1sen!2sin!4v1719084792610!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Side: Table Reservation Form */}
        <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
          {isSubmitting ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '420px',
                textAlign: 'center',
                gap: '2.5rem',
                animation: 'fadeIn 0.5s ease forwards',
              }}
            >
              {/* Luxury Gold Spinner */}
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    border: '3px solid rgba(197, 160, 89, 0.1)',
                    borderTop: '3px solid var(--accent-gold)',
                    borderRadius: '50%',
                    animation: 'spin 1.2s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite',
                  }}
                />
                <div
                  className="luxury-pulse"
                  style={{
                    position: 'absolute',
                    top: '15px', left: '15px', right: '15px', bottom: '15px',
                    backgroundColor: 'rgba(197, 160, 89, 0.08)',
                    borderRadius: '50%',
                  }}
                />
              </div>

              {/* Progress Text & Stage Detail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', maxWidth: '320px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Securing Reservation
                </span>
                
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.4' }}>
                  {submittingStep === 1 && "Connecting to Amberleaf Reservation Engine..."}
                  {submittingStep === 2 && `Analyzing table availability for ${guests} ${parseInt(guests) === 1 ? 'guest' : 'guests'}...`}
                  {submittingStep === 3 && "Dispatching reservation directly to desk +91 7780938743..."}
                  {submittingStep === 4 && "Allocating table and signing your luxury pass..."}
                </h4>

                {/* Progress Bar Indicator */}
                <div
                  style={{
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--border-light)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginTop: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--accent-gold)',
                      boxShadow: '0 0 10px var(--accent-gold)',
                      transition: 'width 0.8s ease',
                      width: `${(submittingStep / 4) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : isSubmitted ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeIn 0.6s ease forwards',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(197, 160, 89, 0.15)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '50%',
                  padding: '1rem',
                  display: 'inline-flex',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.25rem',
                  boxShadow: '0 0 15px rgba(197, 160, 89, 0.15)',
                }}
              >
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Booking Confirmed</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Your table has been reserved directly at our desk (+91 7780938743).
              </p>

              {/* Luxury Ticket Card */}
              <div
                className="ticket-glow"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Decorative Side Cuts */}
                <div style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }} />
                <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Reservation Pass</span>
                  <strong style={{ color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>{bookingRef}</strong>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Guest Name</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Guests Count</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{guests} {parseInt(guests) === 1 ? 'Person' : 'Persons'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Date & Time</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{date} at {time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Assigned Table</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{assignedTable}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  Book Another
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  Print Ticket
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Calendar size={20} style={{ color: 'var(--accent-gold)' }} />
                Table Reservation Form
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                Fill in the reservation details below. Table allocations are processed instantly.
              </p>

              <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {formError && (
                  <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>
                    {formError}
                  </div>
                )}

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Grid fields */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {/* Phone */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9999999999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Guests */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Guests Count</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6+ Persons (Family)</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {/* Date */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Time */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Time</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Special Notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Special Requests (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Window table, kid highchair, birthday celebration..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                  <Send size={16} />
                  Confirm Table Reservation
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
