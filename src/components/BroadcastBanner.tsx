import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import type { BroadcastBannerData } from '../data/defaultMenu';
import { Megaphone, X, ArrowRight } from 'lucide-react';

interface BroadcastBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ onVisibilityChange }) => {
  const [banner, setBanner] = useState<BroadcastBannerData>(() => menuService.getBroadcastBanner());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const latest = menuService.getBroadcastBanner();
      setBanner(latest);
      setDismissed(false); // Re-show on new updates
    };

    window.addEventListener('amberleaf:broadcast_updated', handleUpdate);
    return () => window.removeEventListener('amberleaf:broadcast_updated', handleUpdate);
  }, []);

  const isVisible = banner.enabled && Boolean(banner.message?.trim()) && !dismissed;

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  if (!isVisible) return null;

  const getBackground = () => {
    switch (banner.variant) {
      case 'green':
        return 'linear-gradient(90deg, #06150e 0%, #113122 50%, #06150e 100%)';
      case 'dark':
        return 'linear-gradient(90deg, #050505 0%, #16181b 50%, #050505 100%)';
      case 'gold':
      default:
        return 'linear-gradient(90deg, #9e7938 0%, #e2be6c 50%, #9e7938 100%)';
    }
  };

  const getTextColor = () => {
    if (banner.variant === 'gold') return '#070e0a';
    return '#f3f8f5';
  };

  const handleLinkClick = () => {
    if (!banner.linkUrl) return;
    if (banner.linkUrl.startsWith('#/')) {
      window.location.hash = banner.linkUrl;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.open(banner.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="broadcast-banner-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10002,
        width: '100%',
        background: getBackground(),
        color: getTextColor(),
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.4rem 1rem',
        fontSize: '0.84rem',
        fontWeight: 600,
        overflow: 'hidden',
        borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
      }}
    >
      {/* Left Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.2rem 0.65rem',
          backgroundColor: banner.variant === 'gold' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(197, 160, 89, 0.18)',
          color: banner.variant === 'gold' ? '#070e0a' : 'var(--accent-gold)',
          border: banner.variant === 'gold' ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '20px',
          fontSize: '0.72rem',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          fontWeight: 800,
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <Megaphone size={12} />
        <span>Announcement</span>
      </div>

      {/* Marquee Scrolling Ticker in Center */}
      <div
        className="broadcast-marquee-container"
        style={{
          flexGrow: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: '0 1rem',
          position: 'relative',
        }}
        title="Hover to pause announcement"
      >
        <div
          className="broadcast-marquee-track"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'marqueeScrollRightToLeft 28s linear infinite',
            width: 'max-content',
          }}
        >
          <span style={{ paddingRight: '3.5rem' }}>{banner.message}</span>
          <span style={{ paddingRight: '3.5rem' }}>✦ &nbsp;&nbsp;&nbsp; {banner.message}</span>
          <span style={{ paddingRight: '3.5rem' }}>✦ &nbsp;&nbsp;&nbsp; {banner.message}</span>
        </div>
      </div>

      {/* Right Action & Dismiss */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, zIndex: 2 }}>
        {banner.linkText && banner.linkUrl && (
          <button
            onClick={handleLinkClick}
            style={{
              background: banner.variant === 'gold' ? '#070e0a' : 'var(--accent-gold)',
              color: banner.variant === 'gold' ? '#c5a059' : '#040906',
              border: 'none',
              borderRadius: '20px',
              padding: '0.25rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {banner.linkText}
            <ArrowRight size={11} />
          </button>
        )}

        <button
          onClick={() => setDismissed(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: getTextColor(),
            cursor: 'pointer',
            padding: '0.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
          }}
          title="Dismiss notification"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        @keyframes marqueeScrollRightToLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .broadcast-marquee-container:hover .broadcast-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
