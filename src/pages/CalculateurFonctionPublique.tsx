import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurFonctionPublique() {
  const [salaire, setSalaire] = useState('2500');
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
    const netVal = val * 0.83;
    const netApresImpotVal = val * 0.77;
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
          Calculateur Salaire Fonction Publique 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez votre salaire net de fonctionnaire. Taux de charges : 17% (le plus bas de France)
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
              Traitement Brut
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
            Avantages fonction publique
          </h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Taux de cotisations le plus bas : 17% contre 22-25% privé</li>
            <li>Sécurité de l'emploi et stabilité professionnelle</li>
            <li>Grille indiciaire transparente avec évolution garantie</li>
            <li>Primes spécifiques (IFSE, prime de fin d'année...)</li>
            <li>Retraite à taux plein possible dès 62 ans</li>
            <li>Temps partiel facilité avec maintien de droits</li>
            <li>Mutuelle avec participation employeur élevée</li>
          </ul>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Types de cotisations
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Pension civile : 11.10% (retraite)</li>
            <li>CSG/CRDS : 9.70% (protection sociale)</li>
            <li>RAFP : 5% sur les primes (retraite additionnelle)</li>
            <li>Complémentaire santé : variable selon employeur</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
