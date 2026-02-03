import { useState } from 'react';
import DisclaimerBanner from '../components/DisclaimerBanner';
import AdSenseBlock from '../components/AdSenseBlock';
import FAQ from '../components/FAQ';
import MethodologyBlock from '../components/MethodologyBlock';

const DEPARTMENTS = [
  { code: '971', name: 'Guadeloupe', icon: '🏝️' },
  { code: '972', name: 'Martinique', icon: '🌴' },
  { code: '973', name: 'Guyane', icon: '🦜' },
  { code: '974', name: 'La Réunion', icon: '🌋' },
  { code: '976', name: 'Mayotte', icon: '🐬' },
];

export default function CalculateurDOMTOM() {
  const [salary, setSalary] = useState<number>(0);
  const [department, setDepartment] = useState<string>('971');
  const [result, setResult] = useState<any>(null);

  const calculateSalary = (brut: number) => {
    const chargeRateDOMTOM = 0.18;
    const chargeRateMetropole = 0.22;

    const net = brut * (1 - chargeRateDOMTOM);
    const taxRate = calculateTaxRateDOMTOM(net);
    const netApresImpot = net * (1 - taxRate);

    const netMetropole = brut * (1 - chargeRateMetropole);
    const difference = net - netMetropole;

    setResult({
      brut,
      net,
      netApresImpot,
      netMetropole,
      difference,
      chargeRateDOMTOM: (chargeRateDOMTOM * 100).toFixed(1),
      taxRate: (taxRate * 100).toFixed(1),
    });
  };

  const calculateTaxRateDOMTOM = (net: number) => {
    const annual = net * 12;
    if (annual <= 12084) return 0;
    if (annual <= 27478) return 0.08;
    if (annual <= 78570) return 0.26;
    if (annual <= 168994) return 0.37;
    return 0.42;
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

  const selectedDept = DEPARTMENTS.find(d => d.code === department);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(34, 197, 94, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(14, 165, 233, 0.3)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🌊</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
            Territoires d'Outre-Mer
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.75rem'
        }}>
          Calculateur DOM-TOM
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Calculateur spécifique pour les départements et territoires d'outre-mer avec régime fiscal avantageux.
          Pas de CSG/CRDS et barème d'impôt réduit.
        </p>
      </header>

      <DisclaimerBanner />

      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(34, 197, 94, 0.05))',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(14, 165, 233, 0.2)',
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
          Spécificités Fiscales DOM-TOM
        </h3>
        <ul style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Pas de CSG/CRDS :</strong> Économie de 9,7% sur le salaire brut</li>
          <li><strong>Cotisations réduites :</strong> Environ 18% au lieu de 22% en métropole</li>
          <li><strong>Barème fiscal réduit :</strong> Taux d'imposition plus bas qu'en métropole</li>
          <li><strong>Abattements fiscaux :</strong> Jusqu'à 40% d'abattement sur l'impôt sur le revenu</li>
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
              Territoire
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.icon} {dept.name} ({dept.code})
                </option>
              ))}
            </select>
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
                    Taux de charge : {result.chargeRateDOMTOM}% (sans CSG/CRDS)
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
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Gain vs métropole (avant impôt)
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e' }}>
                  +{formatter.format(result.difference)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Soit {((result.difference / result.netMetropole) * 100).toFixed(1)}% de plus qu'en métropole
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
            {selectedDept?.icon} {selectedDept?.name}
          </h3>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>
              💰 Avantages Fiscaux
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AdvantageItem
                icon="❌"
                title="Pas de CSG/CRDS"
                value="-9,7%"
                description="Économie directe sur les cotisations sociales"
              />
              <AdvantageItem
                icon="📊"
                title="Barème réduit"
                value="-3 à -5%"
                description="Taux d'imposition plus avantageux"
              />
              <AdvantageItem
                icon="📉"
                title="Abattements"
                value="Jusqu'à 40%"
                description="Abattement sur l'impôt sur le revenu"
              />
              <AdvantageItem
                icon="🏠"
                title="Exonérations"
                value="Variable"
                description="Selon le territoire et le secteur d'activité"
              />
            </div>
          </div>

          <div style={{
            padding: '1rem',
            background: 'rgba(14, 165, 233, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <strong>💡 Bon à savoir :</strong> Les salaires nets en DOM-TOM sont généralement 10 à 15% plus élevés
            qu'en métropole à salaire brut équivalent, grâce aux avantages fiscaux.
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
          <span style={{ fontSize: '1.5rem' }}>🌴</span>
          Comparatif des Territoires
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.code}
              onClick={() => setDepartment(dept.code)}
              style={{
                padding: '1.5rem',
                background: department === dept.code
                  ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(34, 197, 94, 0.1))'
                  : 'var(--bg-secondary)',
                borderRadius: '12px',
                border: department === dept.code
                  ? '2px solid rgba(14, 165, 233, 0.5)'
                  : '1px solid var(--border-color)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{dept.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{dept.name}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{dept.code}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <AdSenseBlock adSlot="domtom" adFormat="horizontal" />
      </div>

      <FAQ />
      <div style={{ marginTop: '3rem' }}>
        <MethodologyBlock />
      </div>
    </div>
  );
}

function AdvantageItem({ icon, title, value, description }: { icon: string; title: string; value: string; description: string }) {
  return (
    <div style={{
      padding: '1rem',
      background: 'var(--bg-secondary)',
      borderRadius: '10px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>{icon}</span>
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        <span style={{
          fontWeight: 700,
          color: '#22c55e',
          fontSize: '1.1rem'
        }}>
          {value}
        </span>
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '1.75rem' }}>
        {description}
      </div>
    </div>
  );
}
