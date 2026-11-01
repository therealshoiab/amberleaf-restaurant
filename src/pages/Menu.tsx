import React, { useState, useMemo, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Search, Flame, Award, ShoppingBag, ExternalLink } from 'lucide-react';
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

  return (
    <div className="page-container">
      <SEO
        title="Menu"
        description="Browse the complete menu of Amberleaf Restaurant in Srinagar. Explore our Kashmiri Wazwan, Tandoori starters, main courses, and mocktails."
      />

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Amberleaf Kitchen
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Our Culinary Menu</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </div>

      {/* Search and Category Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
        className="animate-fade-in"
      >
        {/* Search Input Box */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
            }}
          />
          <input
            type="text"
            placeholder="Search our fine wazwan and beverages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </div>

        {/* Categories Carousel */}
        <div className="menu-categories-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="gallery-tab-btn"
              style={{
                background: selectedCategory === cat ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCategory === cat ? '#000' : 'var(--text-primary)',
                borderColor: selectedCategory === cat ? 'var(--accent-gold)' : 'var(--border-light)',
                borderRadius: '8px',
                padding: '0.5rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.background = 'rgba(var(--accent-gold-rgb), 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Online Order Quick CTA Links */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 'var(--section-margin)',
        }}
      >
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Prefer delivery? Order via:</span>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <a
            href="#/order"
            className="btn-swiggy"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            <ShoppingBag size={14} />
            Swiggy Order
            <ExternalLink size={12} />
          </a>
          <a
            href="#/order"
            className="btn-zomato"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
            }}
          >
            <ShoppingBag size={14} />
            Zomato Order
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Menu Items Grid */}
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
          className="grid-container grid-2"
          style={{
            animation: 'fadeIn 0.8s ease forwards',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel shimmer-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Optional Photo Thumbnail */}
              {item.image && (
                <div style={{ width: '100%', height: '180px', position: 'relative', backgroundColor: 'rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50px',
                      background: 'linear-gradient(to top, var(--glass-bg), transparent)',
                    }}
                  />
                </div>
              )}

              <div style={{ padding: 'var(--item-padding, 1.75rem)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Badge Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.category}
                  </span>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {item.isChefsPick && (
                      <span
                        style={{
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        ✦ Chef's Pick
                      </span>
                    )}

                    {item.isSignature && (
                      <span
                        style={{
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid var(--accent-gold)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <Award size={10} />
                        Signature
                      </span>
                    )}

                    {item.isPopular && (
                      <span
                        style={{
                          backgroundColor: 'rgba(217, 119, 6, 0.1)',
                          border: '1px solid var(--accent-amber)',
                          color: 'var(--accent-amber)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <Flame size={10} />
                        Popular
                      </span>
                    )}

                    <span
                      style={{
                        border: item.isVegetarian ? '1px solid #16a34a' : '1px solid #dc2626',
                        color: item.isVegetarian ? '#16a34a' : '#dc2626',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.4rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                </div>

                {/* Name and Price */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{item.name}</h3>
                  <span className="menu-price" style={{ fontSize: '1.15rem', whiteSpace: 'nowrap' }}>
                    ₹{item.price}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
