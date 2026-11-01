import React, { useState, useMemo, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Search } from 'lucide-react';
import { menuService } from '../services/menuService';
import { MENU_CATEGORIES } from '../data/defaultMenu';
import type { MenuItem } from '../data/defaultMenu';

export const Menu: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => menuService.getMenuItems());

  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(menuService.getMenuItems());
    };

    window.addEventListener('amberleaf:menu_updated', handleUpdate);
    return () => window.removeEventListener('amberleaf:menu_updated', handleUpdate);
  }, []);

  // Compute active categories dynamically from items
  const categories = useMemo(() => {
    const itemCategories = Array.from(new Set(menuItems.map((i) => i.category))).filter(Boolean);
    const combined = Array.from(new Set([...MENU_CATEGORIES, ...itemCategories]));
    return combined;
  }, [menuItems]);

  // Filter logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const handleOrder = (dishName: string, price: number | string) => {
    const text = encodeURIComponent(
      `Hello Amberleaf Fine Dine! I would like to place an order for: ${dishName} (₹${price}). Please confirm availability.`
    );
    window.open(`https://wa.me/917006579018?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-container" style={{ maxWidth: '1240px', margin: '0 auto', paddingTop: '150px', paddingBottom: '5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      <SEO
        title="Menu"
        description="Browse the complete culinary menu of Amberleaf Restaurant in Srinagar. Explore our Kashmiri Wazwan, Tandoor & Grills, Starters, and Artisanal Beverages."
      />

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Amberleaf Kitchen &middot; Balgarden
        </span>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            marginTop: '0.5rem',
            color: 'var(--text-primary)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
          }}
        >
          Our Culinary Menu
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

      {/* Search and Category Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
        className="animate-fade-in"
      >
        {/* Search Input Box */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1.1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--accent-gold)',
            }}
          />
          <input
            type="text"
            placeholder="Search our fine wazwan, starters, grills, and beverages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1.25rem 0.8rem 2.9rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </div>

        {/* Categories Pills Carousel */}
        <div
          className="menu-categories-container"
          style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isSelected ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                  color: isSelected ? '#121008' : 'var(--text-primary)',
                  borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-color)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '9999px',
                  padding: '0.45rem 1.15rem',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 2px 10px rgba(197, 160, 89, 0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items Grid: 2-column horizontal card layout matching Reference Design */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem' }}>No dishes match your active search filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '0.5rem',
              fontWeight: 600,
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '1.5rem',
            gridAutoRows: '192px',
          }}
          className="menu-horizontal-grid"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel menu-item-card"
              style={{
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'var(--card-bg)',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                position: 'relative',
                height: '192px',
                minHeight: '192px',
                maxHeight: '192px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(197, 160, 89, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Left Column: SQUARE Dish Image (192px x 192px, 1:1 Aspect Ratio) */}
              <div
                style={{
                  width: '192px',
                  minWidth: '192px',
                  maxWidth: '192px',
                  height: '192px',
                  aspectRatio: '1 / 1',
                  flexShrink: 0,
                  position: 'relative',
                  backgroundColor: '#1a1815',
                  overflow: 'hidden',
                }}
                className="menu-card-image-wrapper"
              >
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600';
                  }}
                />

                {/* Indian Veg / Non-Veg Square Indicator in Top-Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '18px',
                    height: '18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: item.isVegetarian ? '2px solid #16a34a' : '2px solid #dc2626',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    zIndex: 2,
                  }}
                  title={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: item.isVegetarian ? '#16a34a' : '#dc2626',
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Title, Gold Price, Popular Badge, Description & Bottom Action */}
              <div
                style={{
                  padding: '1.1rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  height: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Top Row: Name and Gold Price */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.16rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                        lineHeight: 1.25,
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--accent-gold)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Popular Badge (if applicable) */}
                  {item.isPopular && (
                    <div style={{ marginTop: '0.25rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          padding: '0.12rem 0.5rem',
                          borderRadius: '9999px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        &#9733; POPULAR
                      </span>
                    </div>
                  )}

                  {/* Description (2 lines clamped) */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      lineHeight: '1.45',
                      margin: '0.35rem 0 0 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Footer Row: Dine-In · Takeaway · Delivery + ORDER NOW → */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.45rem',
                    paddingTop: '0.45rem',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.02em',
                      fontWeight: 500,
                    }}
                  >
                    Dine-In &middot; Takeaway &middot; Delivery
                  </span>

                  <button
                    onClick={() => handleOrder(item.name, item.price)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-gold)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: 0,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-gold-light)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--accent-gold)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    ORDER NOW &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});