import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurAutoEntrepreneur() {
  const [chiffreAffaires, setChiffreAffaires] = useState('3000');
  const [activite, setActivite] = useState('liberal');
  const [accre, setAccre] = useState(false);
  const [revenuNet, setRevenuNet] = useState(0);
  const [cotisations, setCotisations] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  const tauxCotisations: Record<string, number> = {
    'liberal': 21.2,
    'commercial': 12.3,
    'artisan': 21.1,
    'location': 6.0
  };

  const tauxAccre: Record<string, number> = {
    'liberal': 10.6,
    'commercial': 6.15,
    'artisan': 10.55,
    'location': 3.0
  };

  useEffect(() => {
    const ca = parseFloat(chiffreAffaires) || 0;
    const taux = accre ? tauxAccre[activite] : tauxCotisations[activite];
    const cotis = ca * (taux / 100);
    const revenu = ca - cotis;

    setCotisations(cotis);
    setRevenuNet(revenu);
  }, [chiffreAffaires, activite, accre]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Auto-Entrepreneur 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez vos cotisations et votre revenu net selon votre activité. Taux micro-social 2026.
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
            Type d'activité
          </label>
          <select
            value={activite}
            onChange={(e) => setActivite(e.target.value)}
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
            <option value="liberal">Libéral (consulting, services) - 21.2%</option>
            <option value="commercial">Activité commerciale - 12.3%</option>
            <option value="artisan">Activité artisanale - 21.1%</option>
            <option value="location">Location meublée - 6%</option>
          </select>
        </div>

        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <label style={{ fontWeight: 500, fontSize: '1rem' }}>
            Bénéficiaire de l'ACRE (Aide à la Création d'Entreprise)
          </label>
          <label style={{ position: 'relative', width: '56px', height: '30px' }}>
            <input
              type="checkbox"
              checked={accre}
              onChange={(e) => setAccre(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: accre ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--border-color)',
              transition: '0.3s',
              borderRadius: '30px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '22px',
                width: '22px',
                left: accre ? '30px' : '4px',
                bottom: '4px',
                background: 'white',
                transition: '0.3s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>

        <div style={{ marginBottom: '2rem' }}>
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
              Chiffre d'Affaires
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(parseFloat(chiffreAffaires) || 0)}
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
              {formatter.format(cotisations)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Taux: {accre ? tauxAccre[activite] : tauxCotisations[activite]}%
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Revenu Net
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(revenuNet)}
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
            Plafonds de chiffre d'affaires 2026
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Activité</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Plafond annuel</th>
                <th style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Taux</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Achat/revente, restauration</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>188 700€</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>12.3%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Prestations de services (BIC)</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>77 700€</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>21.1%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>Professions libérales (BNC)</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>77 700€</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>21.2%</td>
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
            ACRE : Aide à la Création d'Entreprise
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Réduction de 50% des cotisations pendant 1 an</li>
            <li>Valable pour les créations/reprises d'entreprises</li>
            <li>Pour les demandeurs d'emploi, jeunes de 18-25 ans, bénéficiaires RSA/ASS</li>
            <li>Dégressivité progressive sur 3 ans possible selon profil</li>
            <li>Automatique depuis 2019, pas de demande à faire</li>
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
            Important à savoir
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Ces chiffres excluent l'impôt sur le revenu (à ajouter)</li>
            <li>Option versement libératoire : 1% à 2.2% du CA en plus</li>
            <li>Pas de récupération de TVA en micro-entreprise</li>
            <li>Abattement forfaitaire pour frais : 34% à 71% selon activité</li>
            <li>Franchise de TVA tant que sous les seuils</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
