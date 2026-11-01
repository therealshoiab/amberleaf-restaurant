import React from 'react';
import { SEO } from '../components/SEO';
import { MessageCircle, Calendar } from 'lucide-react';

interface SignatureDishItem {
  id: string;
  overtitle: string;
  name: string;
  ratingText: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
}

export const Signatures: React.FC = React.memo(() => {
  const signatureDishes: SignatureDishItem[] = [
    {
      id: 'sig-1',
      overtitle: 'ULTRA-CRISPY GOLDEN DUMPLINGS',
      name: 'Fried Momos',
      ratingText: '4.9 ★ (320+ ratings)',
      price: 180,
      description:
        'Our signature chicken momos deep-fried to a perfect golden crisp, offering a crunchy exterior while remaining juicy and flavorful on the inside.',
      ingredients: ['Fried Chicken Momos', 'Garlic Mayo', 'Tandoori Dipping Sauce'],
      image: './images/g8.jpg',
    },
    {
      id: 'sig-2',
      overtitle: "SRINAGAR'S FAVORITE CHICKEN WRAP",
      name: 'Chicken Kathi Roll',
      ratingText: '4.8 ★ (190+ ratings)',
      price: 220,
      description:
        'Juicy, fire-roasted tandoori chicken chunks tossed with fresh onions, capsicum, green chutney, and cream, all wrapped inside a soft, flaky flatbread.',
      ingredients: ['Tandoori Chicken', 'Flaky Paratha', 'Sliced Onions', 'Mint Chutney'],
      image: './images/g7.jpg',
    },
    {
      id: 'sig-3',
      overtitle: 'AUTHENTIC KASHMIRI WAZWAN ROYALTY',
      name: 'Signature Mutton Rista',
      ratingText: '5.0 ★ (410+ ratings)',
      price: 490,
      description:
        'A masterpiece of Kashmiri Wazwan. Hand-hammered minced mutton meatballs simmered in a spiced red gravy infused with dried cockscomb flowers (maval) and pure Pampore saffron.',
      ingredients: ['Hand-Pounded Mutton', 'Pampore Saffron', 'Maval Extract', 'Shallot Paste', 'Clarified Ghee'],
      image: './images/g2.jpg',
    },
    {
      id: 'sig-4',
      overtitle: 'THE UNRIVALED KING OF WAZWAN',
      name: 'Mutton Gushtaba Wazwan',
      ratingText: '5.0 ★ (350+ ratings)',
      price: 540,
      description:
        'Served traditionally as the grand finale of Wazwan feasts. Velvety mutton spheres poached slowly in a smooth, mildly tangy yogurt broth enriched with green cardamoms and dry mountain mint.',
      ingredients: ['Velvet Hammered Lamb', 'Thick Spiced Curd', 'Dry Mountain Mint', 'Green Cardamom', 'Desi Ghee'],
      image: './images/g3.jpg',
    },
    {
      id: 'sig-5',
      overtitle: 'SLOW-COOKED MOUNTAIN DUM STYLE',
      name: 'Special Mutton Dum Biryani',
      ratingText: '4.9 ★ (280+ ratings)',
      price: 420,
      description:
        'Fragrant long-grain basmati rice layered with tender mutton chunks, caramelized onions, and our secret 14-spice blend, slow-cooked in traditional sealed dum style.',
      ingredients: ['Tender Lamb Cuts', 'Aged Basmati Rice', 'Pampore Saffron', 'Fried Barista Onions', 'Mint Raita'],
      image: './images/g11.jpg',
    },
    {
      id: 'sig-6',
      overtitle: 'TRADITIONAL SAMOVAR INFUSION',
      name: 'Authentic Kashmiri Kahwa',
      ratingText: '4.9 ★ (460+ ratings)',
      price: 110,
      description:
        'Saffron-infused mountain green tea brewed in a traditional copper samovar. Sweetened with honey or rock sugar, enriched with crushed green cardamoms, cinnamon bark, and blanched almond slivers.',
      ingredients: ['Organic Green Tea', 'Pampore Saffron Strands', 'Crushed Cardamoms', 'Cinnamon Bark', 'Slivered Almonds'],
      image: './images/amberleaf-vibe.jpg',
    },
    {
      id: 'sig-7',
      overtitle: 'HERITAGE MUGHAL DESSERT',
      name: 'Shahi Tukda Royal',
      ratingText: '4.9 ★ (210+ ratings)',
      price: 180,
      description:
        'Crispy ghee-fried bread triangles soaked in warm saffron syrup, layered with double-thick reduced milk rabri, and garnished with pistachios and edible silver leaf.',
      ingredients: ['Pure Ghee Bread', 'Six-Hour Slow Milk Rabri', 'Kashmiri Saffron', 'Pistachio Shavings', 'Edible Silver Vark'],
      image: './images/g1.jpg',
    },
  ];

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
    <div className="page-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem 6rem 1.5rem' }}>
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

              {/* Two Action Buttons Replacing Zomato & Swiggy (Matching Visual Style of Image 3) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginTop: '1.4rem',
                  flexWrap: 'wrap',
                }}
              >
                {/* Button 1: Order on WhatsApp (Vibrant Red Pill matching Zomato's position) */}
                <button
                  onClick={() => handleWhatsAppOrder(dish.name, dish.price)}
                  style={{
                    backgroundColor: '#e23744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 14px rgba(226, 55, 68, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#cc2f3b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(226, 55, 68, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e23744';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(226, 55, 68, 0.35)';
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp</span>
                </button>

                {/* Button 2: Reserve a Table (Warm Orange / Gold Pill matching Swiggy's position) */}
                <button
                  onClick={() => handleReserveTable(dish.name)}
                  style={{
                    backgroundColor: '#fc8019',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 4px 14px rgba(252, 128, 25, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e57013';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(252, 128, 25, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fc8019';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(252, 128, 25, 0.35)';
                  }}
                >
                  <Calendar size={16} />
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
