import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurHeuresSup() {
  const [tauxHoraire, setTauxHoraire] = useState('15');
  const [heuresSup, setHeuresSup] = useState('10');
  const [typeHeures, setTypeHeures] = useState('125');
  const [montantBrut, setMontantBrut] = useState(0);
  const [montantNet, setMontantNet] = useState(0);
  const [exoneration, setExoneration] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2
  });

  const majorations: Record<string, { taux: number; label: string }> = {
    '125': { taux: 1.25, label: '+25% (8 premières heures)' },
    '150': { taux: 1.50, label: '+50% (au-delà de 8h)' }
  };

  useEffect(() => {
    const taux = parseFloat(tauxHoraire) || 0;
    const heures = parseFloat(heuresSup) || 0;
    const majoration = majorations[typeHeures].taux;

    const brut = taux * heures * majoration;
    const net = brut * 0.78;
    const exo = Math.min(brut * 0.115, 7500 / 12);

    setMontantBrut(brut);
    setMontantNet(net + exo);
    setExoneration(exo);
  }, [tauxHoraire, heuresSup, typeHeures]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Heures Supplémentaires 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez vos heures sup avec majorations et exonérations fiscales. Plafond 2026 : 7 500€/an.
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
            Taux horaire brut (€)
          </label>
          <input
            type="number"
            value={tauxHoraire}
            onChange={(e) => setTauxHoraire(e.target.value)}
            step="0.01"
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

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Type d'heures supplémentaires
          </label>
          <select
            value={typeHeures}
            onChange={(e) => setTypeHeures(e.target.value)}
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
            <option value="125">8 premières heures (+25%)</option>
            <option value="150">Au-delà de 8 heures (+50%)</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Nombre d'heures supplémentaires mensuelles
          </label>
          <input
            type="number"
            value={heuresSup}
            onChange={(e) => setHeuresSup(e.target.value)}
            step="0.5"
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
              Montant Brut
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(montantBrut)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Majoration {majorations[typeHeures].label}
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Exonération Fiscale
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(exoneration)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Économie d'impôt
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Net Après Exonération
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
              {formatter.format(montantNet)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Dans votre poche
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Cumul annuel estimé
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
            {formatter.format(montantBrut * 12)}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {montantBrut * 12 > 7500 && (
              <div style={{ color: '#ef4444', marginTop: '0.5rem' }}>
                Attention : dépassement du plafond d'exonération (7 500€/an)
              </div>
            )}
            {montantBrut * 12 <= 7500 && 'Sous le plafond d\'exonération'}
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Taux de majoration légaux 2026
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Type d'heures</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Taux légal</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Exemple 15€/h</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>35e à 43e heure</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>+25%</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>18.75€</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>Au-delà de la 43e heure</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>+50%</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>22.50€</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Les conventions collectives peuvent prévoir des taux plus avantageux
          </p>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Exonération fiscale et sociale 2026
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>Plafond annuel : 7 500€</strong> de rémunération brute</li>
            <li>Exonération d'impôt sur le revenu totale</li>
            <li>Réduction des cotisations salariales (11.31%)</li>
            <li>Applicable aux heures effectuées au-delà de 35h</li>
            <li>Concerne les salariés à temps plein uniquement</li>
            <li>Automatique, pas de démarche particulière</li>
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
            Limites et conditions
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Durée maximale : 48h par semaine (moyenne de 44h sur 12 semaines)</li>
            <li>Contingent annuel : 220 heures (variable selon convention)</li>
            <li>Repos compensateur obligatoire au-delà du contingent</li>
            <li>Délai de prévenance : 7 jours pour modification planning</li>
            <li>Refus possible si motif légitime (contrainte familiale...)</li>
            <li>Majoration de 100% pour les dimanches/jours fériés (selon accord)</li>
          </ul>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
            Avantages des heures supplémentaires
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Augmentation du revenu net significative grâce aux exonérations</li>
            <li>Majoration minimale de 25% du taux horaire</li>
            <li>Comptabilisées pour le calcul de la retraite</li>
            <li>Peuvent être converties en repos compensateur (1h25 ou 1h50)</li>
            <li>Particulièrement intéressant pour les bas et moyens salaires</li>
            <li>Possibilité de monétiser son temps libre</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
