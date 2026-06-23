import React, { Component, useState, useEffect } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Spline from '@splinetool/react-spline';

// Error Boundary Class for catching Spline rendering errors
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Spline rendering error captured:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main SplineHero Component with Loading Indicator, Timeout, and Fallback Layout
export const SplineHero: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Fallback View Layout
  const FallbackView = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundImage: 'url("./images/amberleaf-vibe.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '2rem',
        boxShadow: '0 8px 32px 0 var(--shadow-color)',
      }}
    >
      {/* Muted overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 9, 7, 0.45)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
        <span
          style={{
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            fontWeight: 700,
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Welcome to
        </span>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            color: '#fff',
            marginBottom: '0.25rem',
          }}
        >
          Amberleaf Fine Dine
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
          310, Balgarden, Srinagar
        </p>
      </div>
    </div>
  );

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports to prevent loading heavy 3D canvas on phones
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timeout handler: if spline hasn't loaded in 6 seconds, assume timeout and show fallback
  useEffect(() => {
    if (isMobile) return;
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Spline loading timed out, switching to storefront image fallback.");
        setLoadError(true);
        setLoading(false);
      }
    }, 6000);

    return () => clearTimeout(timeout);
  }, [loading, isMobile]);

  const handleSplineLoad = () => {
    setLoading(false);
  };

  const handleSplineError = () => {
    console.error("Failed to load Spline scene file.");
    setLoadError(true);
    setLoading(false);
  };

  if (isMobile || loadError) {
    return <FallbackView />;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        minHeight: '400px',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Loading Spinner inside Spline Frame */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(10, 9, 7, 0.95)',
            zIndex: 10,
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '2.5px solid rgba(212, 175, 55, 0.1)',
              borderTop: '2.5px solid var(--accent-gold)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem',
            }}
          />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            Rendering 3D Space...
          </span>
        </div>
      )}

      {/* 3D Spline Canvas wrapped in Error Boundary */}
      <SplineErrorBoundary fallback={<FallbackView />}>
        <div style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }}>
          <Spline
            scene="https://prod.spline.design/OT-uL9xXG4kM6JNz/scene.splinecode" // Floating luxury particles and geometric shapes
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        </div>
      </SplineErrorBoundary>
    </div>
  );
};
