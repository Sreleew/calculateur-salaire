import { useState } from 'react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import AdSenseBlock from '../components/AdSenseBlock';
import FAQ from '../components/FAQ';
import MethodologyBlock from '../components/MethodologyBlock';

export default function CalculateurAlsaceMoselle() {
  const [salary, setSalary] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const calculateSalary = (brut: number) => {
    const chargeRateBase = 0.22;
    const chargeRateAlsace = chargeRateBase + 0.013;

    const net = brut * (1 - chargeRateAlsace);
    const taxRate = calculateTaxRate(net);
    const netApresImpot = net * (1 - taxRate);

    const netStandard = brut * (1 - chargeRateBase);
    const difference = netStandard - net;

    setResult({
      brut,
      net,
      netApresImpot,
      netStandard,
      difference,
      chargeRateAlsace: (chargeRateAlsace * 100).toFixed(1),
      taxRate: (taxRate * 100).toFixed(1),
    });
  };

  const calculateTaxRate = (net: number) => {
    const annual = net * 12;
    if (annual <= 10777) return 0;
    if (annual <= 27478) return 0.11;
    if (annual <= 78570) return 0.30;
    if (annual <= 168994) return 0.41;
    return 0.45;
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSalary(value);
    if (value > 0) {
      calculateSalary(value);
    } else {
      setResult(null);
    }
  };

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🏛️</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
            Régime Local Alsace-Moselle
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.75rem'
        }}>
          Calculateur Alsace-Moselle
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculateur spécifique pour le régime local d'Alsace-Moselle avec cotisations supplémentaires de +1,3%.
          Départements concernés : Bas-Rhin (67), Haut-Rhin (68), Moselle (57).
        </p>
      </header>

      <DisclaimerBanner />

      <div style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(245, 158, 11, 0.05))',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontWeight: 700,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
          Spécificités du Régime Local
        </h3>
        <ul style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Cotisation supplémentaire :</strong> +1,3% (0,65% salarié + 0,65% employeur)</li>
          <li><strong>Contrepartie :</strong> Meilleure couverture maladie (remboursements complémentaires)</li>
          <li><strong>Jours fériés :</strong> 2 jours supplémentaires (Vendredi Saint, 26 décembre)</li>
          <li><strong>Départements :</strong> Bas-Rhin, Haut-Rhin, Moselle</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            💰 Calculateur
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Salaire brut mensuel
            </label>
            <input
              type="number"
              value={salary || ''}
              onChange={handleSalaryChange}
              placeholder="Ex: 3000"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {result && (
            <>
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                marginBottom: '1rem'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Salaire net (avant impôt)
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10b981' }}>
                    {formatter.format(result.net)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Taux de charge : {result.chargeRateAlsace}% (standard + 1,3%)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Salaire net (après impôt {result.taxRate}%)
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#3b82f6' }}>
                    {formatter.format(result.netApresImpot)}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Différence vs régime standard
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>
                  {formatter.format(result.difference)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Cotisations supplémentaires mensuelles
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            🏥 Avantages du Régime Local
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AdvantageItem
              icon="💊"
              title="Remboursements maladie"
              description="Remboursement à 90% au lieu de 70% sur beaucoup de médicaments et soins"
            />
            <AdvantageItem
              icon="🏥"
              title="Hospitalisation"
              description="Meilleure prise en charge des frais d'hospitalisation"
            />
            <AdvantageItem
              icon="👓"
              title="Optique & dentaire"
              description="Remboursements complémentaires sur lunettes, lentilles et soins dentaires"
            />
            <AdvantageItem
              icon="📅"
              title="Jours fériés"
              description="2 jours fériés supplémentaires : Vendredi Saint et 26 décembre"
            />
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <strong>💡 Bon à savoir :</strong> Les avantages du régime local compensent largement
            la cotisation supplémentaire de 1,3%, surtout en cas de problèmes de santé.
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <AdSenseBlock adSlot="alsace-moselle" adFormat="horizontal" />
      </div>

      <FAQ />
      <div style={{ marginTop: '3rem' }}>
        <MethodologyBlock />
      </div>
    </div>
  );
}

function AdvantageItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div style={{
      padding: '1rem',
      background: 'var(--bg-secondary)',
      borderRadius: '10px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{description}</div>
        </div>
      </div>
    </div>
  );
}
