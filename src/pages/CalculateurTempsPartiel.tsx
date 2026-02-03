import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurTempsPartiel() {
  const [salaireTempsPlein, setSalaireTempsPlein] = useState('2500');
  const [heuresSemaine, setHeuresSemaine] = useState('24.5');
  const [statut, setStatut] = useState('non-cadre');
  const [brut, setBrut] = useState(0);
  const [net, setNet] = useState(0);
  const [pourcentageTempsPlein, setPourcentageTempsPlein] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  const tauxNet: Record<string, number> = {
    'non-cadre': 0.78,
    'cadre': 0.75,
    'fonction-publique': 0.83
  };

  useEffect(() => {
    const salaireComplet = parseFloat(salaireTempsPlein) || 0;
    const heures = parseFloat(heuresSemaine) || 0;
    const ratio = heures / 35;
    const brutPartiel = salaireComplet * ratio;
    const netPartiel = brutPartiel * tauxNet[statut];

    setBrut(brutPartiel);
    setNet(netPartiel);
    setPourcentageTempsPlein(ratio * 100);
  }, [salaireTempsPlein, heuresSemaine, statut]);

  const exemples = [
    { heures: 17.5, nom: '50% (mi-temps)' },
    { heures: 24.5, nom: '70% (temps partiel)' },
    { heures: 28, nom: '80% (4/5e)' },
    { heures: 31.5, nom: '90%' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Salaire Temps Partiel 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez votre salaire à temps partiel selon vos heures travaillées. 50%, 70%, 80%, ou autre.
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
            Salaire temps plein (35h) - Brut mensuel (€)
          </label>
          <input
            type="number"
            value={salaireTempsPlein}
            onChange={(e) => setSalaireTempsPlein(e.target.value)}
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
            Heures travaillées par semaine
          </label>
          <input
            type="number"
            value={heuresSemaine}
            onChange={(e) => setHeuresSemaine(e.target.value)}
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
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {exemples.map((ex) => (
              <button
                key={ex.heures}
                onClick={() => setHeuresSemaine(ex.heures.toString())}
                style={{
                  padding: '0.5rem 1rem',
                  background: heuresSemaine === ex.heures.toString() ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: heuresSemaine === ex.heures.toString() ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
              >
                {ex.nom}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Statut
          </label>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
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
            <option value="non-cadre">Non-cadre</option>
            <option value="cadre">Cadre</option>
            <option value="fonction-publique">Fonction publique</option>
          </select>
        </div>

        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '16px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Temps de travail
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#3b82f6' }}>
            {pourcentageTempsPlein.toFixed(1)}%
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            d'un temps plein (35h)
          </div>
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
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {formatter.format(brut * 12)} / an
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Net Mensuel
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(net)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {formatter.format(net * 12)} / an
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
            Droits du temps partiel en 2026
          </h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Durée minimale : 24h par semaine (sauf dérogation)</li>
            <li>Mêmes droits aux congés payés qu'un temps plein (proratisés)</li>
            <li>Protection sociale identique</li>
            <li>Heures complémentaires limitées à 1/3 du temps contractuel</li>
            <li>Priorité pour passer à temps plein</li>
            <li>Cotisations retraite maintenues si demandé</li>
            <li>Possibilité de cumuler avec ARE (chômage)</li>
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
            Temps partiels courants
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Format</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Heures/semaine</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>% du temps plein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Mi-temps</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>17.5h</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>50%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>70%</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>24.5h</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>70%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>4/5e (4 jours)</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>28h</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>80%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>90%</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>31.5h</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
