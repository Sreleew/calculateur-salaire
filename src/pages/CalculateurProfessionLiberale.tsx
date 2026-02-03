import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurProfessionLiberale() {
  const [chiffreAffaires, setChiffreAffaires] = useState('8000');
  const [charges, setCharges] = useState('2000');
  const [typeActivite, setTypeActivite] = useState('reglementee');
  const [revenuNet, setRevenuNet] = useState(0);
  const [cotisationsSociales, setCotisationsSociales] = useState(0);
  const [beneficeNet, setBeneficeNet] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  const tauxCotisations: Record<string, number> = {
    'reglementee': 23,
    'non-reglementee': 22,
    'artiste': 16.2
  };

  useEffect(() => {
    const ca = parseFloat(chiffreAffaires) || 0;
    const chargesVal = parseFloat(charges) || 0;
    const revenu = ca - chargesVal;
    const taux = tauxCotisations[typeActivite];
    const cotisations = revenu * (taux / 100);
    const benefice = revenu - cotisations;

    setRevenuNet(revenu);
    setCotisationsSociales(cotisations);
    setBeneficeNet(benefice);
  }, [chiffreAffaires, charges, typeActivite]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Profession Libérale 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Médecins, avocats, architectes : calculez vos cotisations URSSAF et votre revenu net.
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
            Type d'activité libérale
          </label>
          <select
            value={typeActivite}
            onChange={(e) => setTypeActivite(e.target.value)}
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
            <option value="reglementee">Réglementée (médecin, avocat, architecte...) - 23%</option>
            <option value="non-reglementee">Non réglementée (consultant, formateur...) - 22%</option>
            <option value="artiste">Artiste-auteur - 16.2%</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Chiffre d'affaires mensuel (€)
          </label>
          <input
            type="number"
            value={chiffreAffaires}
            onChange={(e) => setChiffreAffaires(e.target.value)}
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
            Charges professionnelles mensuelles (€)
          </label>
          <input
            type="number"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
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
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Loyer, fournitures, assurances, formations, etc.
          </div>
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
              Revenu (CA - Charges)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(revenuNet)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Base cotisations
            </div>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Cotisations Sociales
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444' }}>
              {formatter.format(cotisationsSociales)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              URSSAF {tauxCotisations[typeActivite]}%
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Bénéfice Net
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(beneficeNet)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Avant impôt sur le revenu
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
            Composition des cotisations
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Cotisation</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Taux indicatif</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Maladie-maternité</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>6.50%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Retraite de base</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>10.10%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Retraite complémentaire</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>7.00%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Invalidité-décès</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1.30%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Allocations familiales</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>3.10%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>CSG/CRDS</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>9.70%</td>
              </tr>
              <tr style={{ fontWeight: 600 }}>
                <td style={{ padding: '0.75rem' }}>Total approximatif</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>~23%</td>
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
            Spécificités professions libérales
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Régime BNC (Bénéfices Non Commerciaux)</li>
            <li>Cotisations calculées sur le revenu net (CA - charges)</li>
            <li>Possibilité de déduire toutes les charges professionnelles</li>
            <li>Pas de plafond de revenus (contrairement à l'auto-entrepreneur)</li>
            <li>Assujettissement à la TVA au-delà de 37 500€</li>
            <li>Déclaration contrôlée obligatoire (2035)</li>
            <li>Adhésion à une association de gestion agréée recommandée</li>
          </ul>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Charges déductibles
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Loyer du local professionnel et charges</li>
            <li>Fournitures et matériel (bureau, informatique...)</li>
            <li>Frais de véhicule (barème kilométrique ou frais réels)</li>
            <li>Assurances professionnelles (RC Pro, protection juridique)</li>
            <li>Formations professionnelles et documentation</li>
            <li>Cotisations Madelin (retraite, prévoyance)</li>
            <li>Frais de comptabilité et d'expert-comptable</li>
            <li>Communications (téléphone, internet)</li>
            <li>Publicité et communication</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
