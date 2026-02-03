import { useState } from 'react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import AdSenseBlock from '../components/AdSenseBlock';
import FAQ from '../components/FAQ';
import MethodologyBlock from '../components/MethodologyBlock';

export default function CalculateurCorse() {
  const [salary, setSalary] = useState<number>(0);
  const [benefitsZFU, setBenefitsZFU] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const calculateSalary = (brut: number) => {
    let chargeRate = 0.22;

    if (benefitsZFU) {
      chargeRate = 0.18;
    }

    const net = brut * (1 - chargeRate);
    const taxRate = calculateTaxRate(net);
    const netApresImpot = net * (1 - taxRate);

    const netStandard = brut * (1 - 0.22);
    const difference = net - netStandard;

    setResult({
      brut,
      net,
      netApresImpot,
      netStandard,
      difference,
      chargeRate: (chargeRate * 100).toFixed(1),
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

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefitsZFU(e.target.checked);
    if (salary > 0) {
      calculateSalary(salary);
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
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(249, 115, 22, 0.3)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🏝️</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
            Collectivité de Corse
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.75rem'
        }}>
          Calculateur Salaire Corse
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculateur de salaire pour la Corse avec prise en compte des spécificités fiscales
          et des zones franches urbaines (ZFU).
        </p>
      </header>

      <DisclaimerBanner />

      <div style={{
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(234, 88, 12, 0.05))',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(249, 115, 22, 0.2)',
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
          Spécificités Fiscales Corse
        </h3>
        <ul style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Zones Franches Urbaines (ZFU) :</strong> Exonérations de cotisations patronales dans certaines zones</li>
          <li><strong>Crédit d'impôt :</strong> Crédit d'impôt pour investissement en Corse (entreprises)</li>
          <li><strong>Statut fiscal spécial :</strong> Avantages fiscaux pour certains secteurs d'activité</li>
          <li><strong>Aides régionales :</strong> Dispositifs d'aides spécifiques à la Collectivité de Corse</li>
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '2px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={benefitsZFU}
                onChange={handleBenefitsChange}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                  Bénéficiaire ZFU
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Exonération partielle des cotisations
                </div>
              </div>
            </label>
          </div>

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
              placeholder="Ex: 2800"
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
                    Taux de charge : {result.chargeRate}%
                    {benefitsZFU && ' (ZFU appliquée)'}
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

              {benefitsZFU && parseFloat(result.difference.toFixed(2)) > 0 && (
                <div style={{
                  background: 'rgba(249, 115, 22, 0.1)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Gain ZFU vs régime standard
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f97316' }}>
                    +{formatter.format(result.difference)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Économie mensuelle grâce aux exonérations
                  </div>
                </div>
              )}
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
            🏝️ Avantages en Corse
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AdvantageItem
              icon="🏢"
              title="Zones Franches (ZFU)"
              description="Exonérations de cotisations patronales jusqu'à 50% dans certaines zones d'Ajaccio et Bastia"
            />
            <AdvantageItem
              icon="💼"
              title="Crédit d'impôt entreprises"
              description="20% de crédit d'impôt pour investissement en Corse (soumis à conditions)"
            />
            <AdvantageItem
              icon="🏗️"
              title="Aides à l'implantation"
              description="Subventions et aides régionales pour création d'entreprise ou installation"
            />
            <AdvantageItem
              icon="📊"
              title="Défiscalisation"
              description="Dispositifs de défiscalisation immobilière (Pinel, Malraux adaptés)"
            />
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(249, 115, 22, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <strong>💡 Bon à savoir :</strong> La Corse bénéficie d'un statut fiscal particulier
            avec de nombreuses aides pour les entreprises et les salariés. Les zones franches offrent
            des avantages significatifs aux employeurs, ce qui peut se traduire par des salaires plus compétitifs.
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          Secteurs Porteurs en Corse
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <SectorCard icon="🏖️" title="Tourisme" salary="2400€" />
          <SectorCard icon="🍇" title="Agriculture" salary="2200€" />
          <SectorCard icon="🏗️" title="BTP" salary="2600€" />
          <SectorCard icon="💼" title="Services" salary="2500€" />
          <SectorCard icon="🏥" title="Santé" salary="2800€" />
          <SectorCard icon="🎓" title="Éducation" salary="2400€" />
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          textAlign: 'center'
        }}>
          Salaires moyens bruts mensuels indicatifs - Source : INSEE 2025
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <AdSenseBlock adSlot="corse" adFormat="horizontal" />
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

function SectorCard({ icon, title, salary }: { icon: string; title: string; salary: string }) {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{title}</div>
      <div style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#f97316'
      }}>
        {salary}
      </div>
    </div>
  );
}
