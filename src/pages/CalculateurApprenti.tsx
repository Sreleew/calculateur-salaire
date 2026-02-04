import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurApprenti() {
  const [salaire, setSalaire] = useState('1000');
  const [age, setAge] = useState('18-20');
  const [brut, setBrut] = useState(0);
  const [net, setNet] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    const val = parseFloat(salaire) || 0;
    const netVal = val * 0.91;
    setBrut(val);
    setNet(netVal);
  }, [salaire]);

  const tauxParAge: Record<string, { moins18: string; '18-20': string; '21-25': string; plus26: string }> = {
    '1ere': { moins18: '27%', '18-20': '43%', '21-25': '53%', plus26: '100%' },
    '2eme': { moins18: '39%', '18-20': '51%', '21-25': '61%', plus26: '100%' },
    '3eme': { moins18: '55%', '18-20': '67%', '21-25': '78%', plus26: '100%' }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Salaire Apprenti 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez votre rémunération d'apprenti selon votre âge et année d'études. Exonérations spéciales.
        </p>
      </header>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
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

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Tranche d'âge
          </label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            <option value="moins18">Moins de 18 ans</option>
            <option value="18-20">18 à 20 ans</option>
            <option value="21-25">21 à 25 ans</option>
            <option value="plus26">26 ans et plus</option>
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
              Net (≈91% du brut)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(net)}
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
            Grille de rémunération (% du SMIC)
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Année</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'<18 ans'}</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>18-20 ans</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>21-25 ans</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>≥26 ans</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1ère année</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['1ere'].moins18}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['1ere']['18-20']}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['1ere']['21-25']}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['1ere'].plus26}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>2ème année</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['2eme'].moins18}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['2eme']['18-20']}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['2eme']['21-25']}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{tauxParAge['2eme'].plus26}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>3ème année</td>
                <td style={{ padding: '0.75rem' }}>{tauxParAge['3eme'].moins18}</td>
                <td style={{ padding: '0.75rem' }}>{tauxParAge['3eme']['18-20']}</td>
                <td style={{ padding: '0.75rem' }}>{tauxParAge['3eme']['21-25']}</td>
                <td style={{ padding: '0.75rem' }}>{tauxParAge['3eme'].plus26}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Avantages apprentis
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Exonération totale de cotisations sociales jusqu'à 79% du SMIC</li>
            <li>Pas d'impôt sur le revenu jusqu'à 19 744€/an (2026)</li>
            <li>Aides au logement (APL) maintenues</li>
            <li>Carte d'étudiant des métiers avec réductions</li>
            <li>Aide de 500€ pour le permis de conduire</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
