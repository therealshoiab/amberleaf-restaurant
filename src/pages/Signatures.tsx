import React from 'react';
import { SEO } from '../components/SEO';
import { Award, Star, Compass } from 'lucide-react';

interface SignatureDish {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  chefNote: string;
  category: string;
}

export const Signatures: React.FC = () => {
  const signatureDishes: SignatureDish[] = [
    {
      id: 'sig1',
      name: 'Mutton Rista Wazwan Special',
      price: 490,
      rating: 4.9,
      reviewsCount: 42,
      category: 'Wazwan Specialty',
      description: 'A masterpiece of Kashmiri Wazwan. Hand-hammered minced mutton meatballs are pounded on wooden logs, formed into perfectly smooth spheres, and simmered in a red gravy spiced with dried cockscomb flowers (maval) and pure Pampore saffron.',
      ingredients: ['Hand-pounded minced mutton', 'Organic Pampore saffron', 'Dried cockscomb (maval) extract', 'Fennel seed powder', 'Clarified butter (ghee)', 'Kashmiri shallot paste'],
      chefNote: 'Pounded continuously for 45 minutes to achieve its legendary velvet texture. Absolutely no binders or fillers used.',
    },
    {
      id: 'sig2',
      name: 'Mutton Gushtaba',
      price: 540,
      rating: 5.0,
      reviewsCount: 58,
      category: 'Wazwan Specialty',
      description: 'Known traditionally as the "King of Wazwan," Gushtaba is served as the final meat dish in a standard Wazwan feast. These large mutton balls are cooked in a smooth, mildly sour curd-based gravy enriched with cardamoms and dry mint.',
      ingredients: ['Finely pounded lamb meat', 'Thick curd', 'Cashew nut paste', 'Green cardamoms', 'Dried mint leaves', 'Saffron solution'],
      chefNote: 'Traditionally served at the very end of the meal. The mild yogurt gravy serves to cool down the palate after the spicy courses.',
    },
    {
      id: 'sig3',
      name: 'Authentic Kashmiri Kahwa',
      price: 110,
      rating: 4.8,
      reviewsCount: 95,
      category: 'Artisanal Brew',
      description: 'Saffron-infused Kashmiri green tea brewed in a traditional copper samovar. Sweetened with honey or rock sugar and garnished with crushed green cardamoms, cinnamon bark, and fine slivers of blanched almonds.',
      ingredients: ['Organic green tea leaves', 'Pampore saffron strands', 'Cardamom pods', 'Cinnamon bark', 'Raw honey', 'Slivered almonds'],
      chefNote: 'Brewed using pure mountain spring water. A perfect digestif and warm companion to the chilly Srinagar evening.',
    },
    {
      id: 'sig4',
      name: 'Shahi Tukda Royal',
      price: 180,
      rating: 4.9,
      reviewsCount: 37,
      category: 'Gourmet Dessert',
      description: 'An indulgent dessert made by deep-frying white bread triangles in pure ghee, soaking them in a warm saffron and green cardamom syrup, and layering them with double-thick reduced milk rabri and edible silver leaf.',
      ingredients: ['Ghee-fried premium bread', 'Slow-cooked milk rabri', 'Saffron strands', 'Cardamom pods', 'Pistachios & almonds', 'Edible silver leaf (Vark)'],
      chefNote: 'Our rabri is simmered for six hours until it reduces to a third of its volume, giving it an unmatched richness.',
    },
  ];

  return (
    <div className="page-container">
      <SEO
        title="Signatures"
        description="Explore the signature dishes of Amberleaf Restaurant in Srinagar. Read about Mutton Rista, Gushtaba, Shahi Tukda, and Kashmiri Kahwa, complete with chef notes and ingredients."
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
          Chef's Special
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Signature Masterpieces</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Signatures List Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {signatureDishes.map((dish) => {
          return (
            <div
              key={dish.id}
              className="glass-panel signature-card-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2.5rem',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeIn 0.8s ease forwards',
              }}
            >
              {/* Gold glowing accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, var(--accent-gold), var(--accent-amber))',
                }}
              />

              {/* Detail Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Award size={14} />
                    {dish.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                    <Star size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{dish.rating}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>({dish.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>{dish.name}</h3>
                  <span style={{ fontSize: '1.6rem', color: 'var(--accent-gold)', fontWeight: 800 }}>₹{dish.price}</span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {dish.description}
                </p>

                {/* Ingredients section */}
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Core Ingredients:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {dish.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="glass-card"
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chef's Note Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(var(--accent-gold-rgb), 0.04)',
                    borderLeft: '2px solid var(--accent-gold)',
                    padding: '1rem',
                    borderRadius: '0 8px 8px 0',
                    marginTop: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <Compass size={12} />
                    Chef's Crafting Note
                  </span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{dish.chefNote}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .signature-card-grid {
            padding: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
};
