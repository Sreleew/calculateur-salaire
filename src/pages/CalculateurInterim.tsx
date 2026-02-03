import { useState, useEffect } from 'react';
import FAQ from '../components/FAQ';

export default function CalculateurInterim() {
  const [tauxHoraire, setTauxHoraire] = useState('12');
  const [heuresHebdo, setHeuresHebdo] = useState('35');
  const [primeFin, setPrimeFin] = useState(true);
  const [primePrecarity, setPrimePrecarity] = useState(true);
  const [brutMensuel, setBrutMensuel] = useState(0);
  const [netMensuel, setNetMensuel] = useState(0);
  const [primes, setPrimes] = useState(0);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    const taux = parseFloat(tauxHoraire) || 0;
    const heures = parseFloat(heuresHebdo) || 0;
    const heuresMensuelles = (heures * 52) / 12;
    let brut = taux * heuresMensuelles;

    let totalPrimes = 0;
    if (primeFin) totalPrimes += brut * 0.10;
    if (primePrecarity) totalPrimes += brut * 0.10;

    const brutTotal = brut + totalPrimes;
    const net = brutTotal * 0.78;

    setBrutMensuel(brutTotal);
    setNetMensuel(net);
    setPrimes(totalPrimes);
  }, [tauxHoraire, heuresHebdo, primeFin, primePrecarity]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem'
        }}>
          Calculateur Salaire Intérim 2026
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculez votre rémunération d'intérimaire avec primes de fin de mission et précarité.
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
            step="0.10"
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
            value={heuresHebdo}
            onChange={(e) => setHeuresHebdo(e.target.value)}
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
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: '1rem' }}>Prime de fin de mission (10%)</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Versée en fin de contrat</div>
          </div>
          <label style={{ position: 'relative', width: '56px', height: '30px' }}>
            <input
              type="checkbox"
              checked={primeFin}
              onChange={(e) => setPrimeFin(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: primeFin ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--border-color)',
              transition: '0.3s',
              borderRadius: '30px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '22px',
                width: '22px',
                left: primeFin ? '30px' : '4px',
                bottom: '4px',
                background: 'white',
                transition: '0.3s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>

        <div style={{
          marginBottom: '2rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: '1rem' }}>Indemnité de précarité (10%)</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Compensation de l'instabilité</div>
          </div>
          <label style={{ position: 'relative', width: '56px', height: '30px' }}>
            <input
              type="checkbox"
              checked={primePrecarity}
              onChange={(e) => setPrimePrecarity(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: primePrecarity ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--border-color)',
              transition: '0.3s',
              borderRadius: '30px'
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '22px',
                width: '22px',
                left: primePrecarity ? '30px' : '4px',
                bottom: '4px',
                background: 'white',
                transition: '0.3s',
                borderRadius: '50%'
              }} />
            </span>
          </label>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Primes Cumulées
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>
              {formatter.format(primes)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              +{((primes / (brutMensuel - primes)) * 100).toFixed(0)}% du salaire
            </div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Brut Total Mensuel
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
              {formatter.format(brutMensuel)}
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Net Estimé
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>
              {formatter.format(netMensuel)}
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
            Avantages du travail temporaire
          </h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Prime de fin de mission : 10% du salaire brut total</li>
            <li>Indemnité compensatrice de congés payés : 10%</li>
            <li>Indemnité de précarité : 10% (missions {'<'} 6 mois)</li>
            <li>Total des primes : jusqu'à 20% de bonus</li>
            <li>Accès rapide à l'emploi et diversité des expériences</li>
            <li>Flexibilité et choix des missions</li>
            <li>Possibilité de CDI-Intérimaire</li>
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
            Droits des intérimaires 2026
          </h4>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Égalité de traitement avec les CDI (salaire, primes, avantages)</li>
            <li>Accès à la formation professionnelle</li>
            <li>Mutuelle obligatoire prise en charge par l'agence</li>
            <li>Visite médicale d'embauche gratuite</li>
            <li>Droit au compte épargne-temps (CET)</li>
            <li>Protection sociale complète (Pôle emploi, retraite...)</li>
            <li>Possibilité d'embauche directe après la mission</li>
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
