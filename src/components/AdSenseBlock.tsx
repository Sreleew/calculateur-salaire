import { useEffect } from 'react';

interface AdSenseBlockProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
}

export default function AdSenseBlock({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = ''
}: AdSenseBlockProps) {
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'all' && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  const consent = localStorage.getItem('cookie-consent');

  if (consent === 'rejected' || consent === 'necessary') {
    return (
      <div style={{
        padding: '2rem',
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        ...adStyle
      }} className={className}>
        <p style={{ fontSize: '0.9rem' }}>
          Publicité désactivée - Acceptez les cookies pour soutenir ce site gratuit
        </p>
      </div>
    );
  }

  return (
    <div className={className} style={{ minHeight: '250px', ...adStyle }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...adStyle }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
