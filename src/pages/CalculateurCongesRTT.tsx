import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurCongesRTT() {
  const [salaireBrut, setSalaireBrut] = useState('3000');
  const [joursConges, setJoursConges] = useState('25');
  const [joursRTT, setJoursRTT] = useState('10');
  const [indemniteVacances, setIndemniteVacances] = useState(0);
  const [joursOuvresAn, setJoursOuvresAn] = useState(218);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2
  });

  useEffect(() => {
    const salaire = parseFloat(salaireBrut) || 0;
    const totalConges = parseFloat(joursConges) || 0;
    const indemnite = (salaire / joursOuvresAn) * totalConges;
    setIndemniteVacances(indemnite);
  }, [salaireBrut, joursConges, joursOuvresAn]);

  const joursTotal = parseFloat(joursConges) + parseFloat(joursRTT);
  const joursTravaillesAn = joursOuvresAn - joursTotal;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Congés & RTT 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez vos droits aux congés payés et RTT. Indemnités de vacances et jours de repos.
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
            value={salaireBrut}
            onChange={(e) => setSalaireBrut(e.target.value)}
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
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontWeight: 600,
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}>
              Jours de congés payés
            </label>
            <input
              type="number"
              value={joursConges}
              onChange={(e) => setJoursConges(e.target.value)}
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

          <div>
            <label style={{
              display: 'block',
              fontWeight: 600,
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}>
              Jours de RTT
            </label>
            <input
              type="number"
              value={joursRTT}
              onChange={(e) => setJoursRTT(e.target.value)}
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
              Total jours de repos
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3b82f6' }}>
              {joursTotal}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {joursConges} CP + {joursRTT} RTT
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Valeur journalière
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format((parseFloat(salaireBrut) || 0) / joursOuvresAn)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              par jour de congé
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Jours travaillés/an
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b' }}>
              {joursTravaillesAn}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              sur 365 jours
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
            Droits aux congés payés 2026
          </h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>Droit légal : 25 jours ouvrés</strong> (5 semaines) ou 30 jours ouvrables</li>
            <li>Acquisition : 2.08 jours par mois travaillé (2.5 jours ouvrables)</li>
            <li>Période d'acquisition : du 1er juin N-1 au 31 mai N</li>
            <li>Possibilité de report selon convention collective</li>
            <li>Indemnité de congés = 10% de la rémunération brute totale</li>
            <li>Méthode du maintien de salaire ou du dixième le plus favorable</li>
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
            RTT : Réduction du Temps de Travail
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Applicable aux salariés dépassant 35h hebdomadaires</li>
            <li>Nombre de RTT varie selon temps de travail effectif (généralement 7 à 12 jours)</li>
            <li>Calcul : (heures travaillées - 35h) × 52 semaines / 7 heures</li>
            <li>Peuvent être imposés par l'employeur (jusqu'à 50%)</li>
            <li>Perdus en fin d'année selon accord d'entreprise</li>
            <li>Non payés en cas de départ (sauf accord collectif)</li>
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
            Jours fériés 2026
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
            La France compte 11 jours fériés légaux par an. Seul le 1er mai est obligatoirement chômé et payé.
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>1er janvier (Jour de l'An)</li>
            <li>Lundi de Pâques (variable)</li>
            <li>1er mai (Fête du Travail) - obligatoire</li>
            <li>8 mai (Victoire 1945)</li>
            <li>Ascension (variable)</li>
            <li>Lundi de Pentecôte (variable)</li>
            <li>14 juillet (Fête Nationale)</li>
            <li>15 août (Assomption)</li>
            <li>1er novembre (Toussaint)</li>
            <li>11 novembre (Armistice 1918)</li>
            <li>25 décembre (Noël)</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
