import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurFraisKm() {
  const [kmAnnuels, setKmAnnuels] = useState('10000');
  const [puissanceFiscale, setPuissanceFiscale] = useState('5');
  const [remboursement, setRemboursement] = useState(0);
  const [economieImpot, setEconomieImpot] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2
  });

  const baremesKm2026: Record<string, { tranche1: number; tranche2: number; tranche3: number }> = {
    '3': { tranche1: 0.529, tranche2: 0.316, tranche3: 0.370 },
    '4': { tranche1: 0.606, tranche2: 0.340, tranche3: 0.407 },
    '5': { tranche1: 0.636, tranche2: 0.357, tranche3: 0.427 },
    '6': { tranche1: 0.665, tranche2: 0.374, tranche3: 0.447 },
    '7': { tranche1: 0.697, tranche2: 0.394, tranche3: 0.470 }
  };

  useEffect(() => {
    const km = parseFloat(kmAnnuels) || 0;
    const bareme = baremesKm2026[puissanceFiscale];

    let montant = 0;

    if (km <= 5000) {
      montant = km * bareme.tranche1;
    } else if (km <= 20000) {
      montant = (km * bareme.tranche2) + 1065;
    } else {
      montant = (km * bareme.tranche3) + 370;
    }

    setRemboursement(montant);
    setEconomieImpot(montant * 0.30);
  }, [kmAnnuels, puissanceFiscale]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Frais Kilométriques 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez vos indemnités kilométriques selon le barème fiscal 2026 des impôts.
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
            Puissance fiscale du véhicule (CV)
          </label>
          <select
            value={puissanceFiscale}
            onChange={(e) => setPuissanceFiscale(e.target.value)}
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
            <option value="3">3 CV et moins</option>
            <option value="4">4 CV</option>
            <option value="5">5 CV</option>
            <option value="6">6 CV</option>
            <option value="7">7 CV et plus</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Kilomètres parcourus par an (usage professionnel)
          </label>
          <input
            type="number"
            value={kmAnnuels}
            onChange={(e) => setKmAnnuels(e.target.value)}
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
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {['5000', '10000', '15000', '20000'].map((val) => (
              <button
                key={val}
                onClick={() => setKmAnnuels(val)}
                style={{
                  padding: '0.5rem 1rem',
                  background: kmAnnuels === val ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: kmAnnuels === val ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
              >
                {parseInt(val).toLocaleString('fr-FR')} km
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Indemnités kilométriques
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(remboursement)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Montant déductible
            </div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Économie d'impôt estimée
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(economieImpot)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              TMI 30% appliqué
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Indemnité par km
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
              {formatter.format(remboursement / (parseFloat(kmAnnuels) || 1))}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Taux moyen
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
            Barème fiscal 2026 - Voitures
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Puissance</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>0-5000 km</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>5001-20000 km</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'>20000 km'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>3 CV et moins</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>d × 0.529</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.316) + 1065</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.370) + 370</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>4 CV</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>d × 0.606</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.340) + 1330</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.407) + 820</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>5 CV</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>d × 0.636</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.357) + 1395</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.427) + 1255</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>6 CV</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>d × 0.665</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.374) + 1457</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.447) + 1693</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>7 CV et plus</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>d × 0.697</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>(d × 0.394) + 1515</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>(d × 0.470) + 2188</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            d = distance parcourue en km
          </p>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Conditions d'application
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Déplacements domicile-travail : limités à 40 km (80 km AR)</li>
            <li>Au-delà de 40 km, justification nécessaire</li>
            <li>Alternative : frais réels détaillés (carburant, assurance, entretien...)</li>
            <li>Justificatifs à conserver : carte grise, factures, carnet de route</li>
            <li>Inclut : carburant, assurance, entretien, dépréciation, pneumatiques</li>
            <li>Non cumulable avec déduction forfaitaire de 10%</li>
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
            Deux-roues motorisés
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Puissance</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>0-3000 km</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>3001-6000 km</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'>6000 km'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>{'<50cc'}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>d × 0.315</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.079) + 711</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>(d × 0.198) + 237</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>{'>50cc'}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>d × 0.395</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>(d × 0.099) + 891</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>(d × 0.248) + 297</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
