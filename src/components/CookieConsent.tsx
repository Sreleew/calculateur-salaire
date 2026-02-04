import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '0.5rem 1rem',
      zIndex: 9999,
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '250px' }}>
            <span style={{ fontSize: '0.9rem' }}>🍪</span>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: '1.3'
            }}>
              Nous utilisons des cookies pour améliorer votre expérience.
              <button
                onClick={() => setShowDetails(!showDetails)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: '0 0.25rem',
                  marginLeft: '0.25rem',
                  textDecoration: 'underline',
                  fontFamily: 'inherit',
                  display: 'inline'
                }}
              >
                {showDetails ? 'Masquer' : 'Infos'}
              </button>
            </p>
            {showDetails && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '1rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                maxWidth: '300px',
                zIndex: 10000,
                lineHeight: 1.5
              }}>
                <strong>Nécessaires :</strong> Fonctionnement du site<br />
                <strong>Analytiques :</strong> Google Analytics<br />
                <strong>Publicitaires :</strong> Google AdSense
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <button
              onClick={acceptAll}
              style={{
                padding: '0.4rem 1rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Tout accepter
            </button>
            <button
              onClick={rejectAll}
              style={{
                padding: '0.4rem 0.75rem',
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
