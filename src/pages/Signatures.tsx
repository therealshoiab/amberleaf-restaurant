import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { MessageCircle, Calendar } from 'lucide-react';
import { menuService } from '../services/menuService';
import type { SignatureDishItem } from '../data/defaultMenu';

export const Signatures: React.FC = React.memo(() => {
  const [signatureDishes, setSignatureDishes] = useState<SignatureDishItem[]>(() =>
    menuService.getSignatures()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setSignatureDishes(menuService.getSignatures());
    };

    window.addEventListener('amberleaf:signatures_updated', handleUpdate);
    return () => window.removeEventListener('amberleaf:signatures_updated', handleUpdate);
  }, []);

  const handleWhatsAppOrder = (dishName: string, price: number) => {
    const text = encodeURIComponent(
      `Hello Amberleaf Fine Dine! I would like to order your signature dish: ${dishName} (₹${price}). Please confirm availability.`
    );
    window.open(`https://wa.me/917006579018?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleReserveTable = (dishName: string) => {
    try {
      sessionStorage.setItem('amberleaf_preferred_dish', dishName);
    } catch {}
    window.location.hash = '#/home';
    setTimeout(() => {
      const el = document.getElementById('reservation') || document.getElementById('reviews');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1240px', margin: '0 auto', paddingTop: '150px', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      <SEO
        title="Signatures"
        description="Explore the signature culinary masterpieces of Amberleaf Restaurant in Srinagar. Discover our Fried Momos, Chicken Kathi Roll, Mutton Rista, and Kashmiri Kahwa."
      />

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Amberleaf Haute Cuisine
        </span>
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4vw, 2.85rem)',
            marginTop: '0.5rem',
            color: 'var(--text-primary)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
          }}
        >
          Signature Masterpieces
        </h1>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '0.85rem auto 0 auto',
          }}
        />
      </div>

      {/* Alternating Signature Dish Cards Matching Reference Image 3 */}
      {signatureDishes.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
            No signature masterpieces currently featured. Please check back soon or explore our main menu.
          </p>
          <a href="#/menu" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            Explore Full Menu
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {signatureDishes.map((dish, index) => {
          const isImageOnLeft = index % 2 === 1; // Alternating layout (Card 1: Right, Card 2: Left, etc.)

          const contentBlock = (
            <div
              key={`content-${dish.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.65rem',
                flex: '1 1 50%',
              }}
            >
              {/* Overtitle in Crimson / Amber Uppercase */}
              <span
                style={{
                  color: '#e23744',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                }}
              >
                {dish.overtitle}
              </span>

              {/* Title + Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.35rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {dish.name}
                </h2>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                  }}
                >
                  ₹{dish.price}
                </span>
              </div>

              {/* Green Rating Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#16a34a',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  margin: '0.2rem 0',
                }}
              >
                <span>{dish.ratingText}</span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: '1.65',
                  margin: '0.35rem 0 0.85rem 0',
                }}
              >
                {dish.description}
              </p>

              {/* Key Ingredients Section */}
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  KEY INGREDIENTS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {dish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      style={{
                        backgroundColor: 'rgba(226, 55, 68, 0.05)',
                        border: '1px solid rgba(226, 55, 68, 0.22)',
                        color: 'var(--text-primary)',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.85rem',
                        borderRadius: '9999px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Two Action Buttons Replacing Zomato & Swiggy (Matching Visual Style of Reference Image 5) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginTop: '1.4rem',
                  flexWrap: 'wrap',
                }}
              >
                {/* Button 1: Order on WhatsApp (Matching Gold Box Style in Image 5) */}
                <button
                  onClick={() => handleWhatsAppOrder(dish.name, dish.price)}
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: '#040906',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.65rem 1.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-gold-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(197, 160, 89, 0.35)';
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Order on WhatsApp</span>
                </button>

                {/* Button 2: Reserve a Table (Matching Gold Box Style in Image 5) */}
                <button
                  onClick={() => handleReserveTable(dish.name)}
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: '#040906',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.65rem 1.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-gold-hover)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(197, 160, 89, 0.35)';
                  }}
                >
                  <Calendar size={15} />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </div>
          );

          const imageBlock = (
            <div
              key={`image-${dish.id}`}
              style={{
                flex: '1 1 45%',
                minHeight: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#161412',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--border-color)',
                position: 'relative',
              }}
              className="signature-dish-img-wrapper"
            >
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  minHeight: '280px',
                  maxHeight: '380px',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = './images/g1.jpg';
                }}
              />
            </div>
          );

          return (
            <div
              key={dish.id}
              className="glass-panel"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                padding: '2.5rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: isImageOnLeft ? 'row-reverse' : 'row',
                gap: '2.5rem',
                alignItems: 'center',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(197, 160, 89, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.05)';
              }}
            >
              {contentBlock}
              {imageBlock}
            </div>
          );
        })}
      </div>
      )}

      {/* Responsive Stacking CSS */}
      <style>{`
        @media (max-width: 860px) {
          .glass-panel {
            flex-direction: column !important;
            padding: 1.75rem !important;
          }
          .signature-dish-img-wrapper {
            width: 100% !important;
            min-height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
});
