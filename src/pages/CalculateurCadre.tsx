import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';
import AdSenseBlock from '../components/AdSenseBlock';

export default function CalculateurCadre() {
  const [salaire, setSalaire] = useState('3500');
  const [brut, setBrut] = useState(0);
  const [net, setNet] = useState(0);
  const [netApresImpot, setNetApresImpot] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    const val = parseFloat(salaire) || 0;
    const netVal = val * 0.75;
    const netApresImpotVal = val * 0.70;
    setBrut(val);
    setNet(netVal);
    setNetApresImpot(netApresImpotVal);
  }, [salaire]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Salaire Cadre 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez votre salaire net de cadre avec précision. Taux de charges cadre 2026 : 25%
        </p>
      </header>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Salaire brut mensuel (€)
          </label>
          <input
            type="number"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.25rem',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Brut Mensuel
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(brut)}
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Net Avant Impôt
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(net)}
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Net Après Impôt
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
              {formatter.format(netApresImpot)}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Spécificités du statut cadre
          </h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Cotisations APEC : 0.06% (aide à l'emploi des cadres)</li>
            <li>CET : 0.35% (contribution exceptionnelle temporaire)</li>
            <li>Retraite complémentaire majorée (AGIRC-ARRCO)</li>
            <li>Taux de charges total : environ 25%</li>
            <li>Droits à la retraite supérieurs aux non-cadres</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <AdSenseBlock adSlot="1234567890" adFormat="auto" />
      </div>

      <FAQ />
    </div>
  );
}
