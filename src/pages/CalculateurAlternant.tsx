import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurAlternant() {
  const [salaire, setSalaire] = useState('1200');
  const [typeContrat, setTypeContrat] = useState('apprentissage');
  const [brut, setBrut] = useState(0);
  const [net, setNet] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    const val = parseFloat(salaire) || 0;
    const tauxNet = typeContrat === 'apprentissage' ? 0.91 : 0.78;
    const netVal = val * tauxNet;
    setBrut(val);
    setNet(netVal);
  }, [salaire, typeContrat]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Salaire Alternant 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Apprentissage ou professionnalisation : calculez votre rémunération selon votre âge
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
            Type de contrat
          </label>
          <select
            value={typeContrat}
            onChange={(e) => setTypeContrat(e.target.value)}
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
            <option value="apprentissage">Contrat d'apprentissage</option>
            <option value="professionnalisation">Contrat de professionnalisation</option>
          </select>
        </div>

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
              Net (Taux: {typeContrat === 'apprentissage' ? '91%' : '78%'})
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
            {typeContrat === 'apprentissage' ? 'Grille apprentissage 2026' : 'Grille professionnalisation 2026'}
          </h3>

          {typeContrat === 'apprentissage' ? (
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
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>27% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>43% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>53% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>100% SMIC</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>2ème année</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>39% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>51% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>61% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>100% SMIC</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem' }}>3ème année</td>
                  <td style={{ padding: '0.75rem' }}>55% SMIC</td>
                  <td style={{ padding: '0.75rem' }}>67% SMIC</td>
                  <td style={{ padding: '0.75rem' }}>78% SMIC</td>
                  <td style={{ padding: '0.75rem' }}>100% SMIC</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Niveau</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'<21 ans'}</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>21-25 ans</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>≥26 ans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'<Bac'}</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>55% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>70% SMIC</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>100% SMIC</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem' }}>≥Bac</td>
                  <td style={{ padding: '0.75rem' }}>65% SMIC</td>
                  <td style={{ padding: '0.75rem' }}>80% SMIC</td>
                  <td style={{ padding: '0.75rem' }}>100% SMIC</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Avantages alternance
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Exonération de cotisations sociales (apprentissage)</li>
            <li>Pas d'impôt jusqu'à 19 744€/an (2026)</li>
            <li>Frais de scolarité pris en charge par l'entreprise</li>
            <li>Carte d'étudiant avec tous les avantages</li>
            <li>Expérience professionnelle valorisante</li>
            <li>Aide de 500€ pour le permis de conduire</li>
            <li>APL et aides au logement maintenues</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
