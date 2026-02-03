import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import DisclaimerBanner from '../components/DisclaimerBanner';
import AdSenseBlock from '../components/AdSenseBlock';
import FAQ from '../components/FAQ';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface VilleData {
  slug: string;
  nom: string;
  region: string;
  salaire_moyen_brut: number;
  loyer_moyen: number;
  transport_mensuel: number;
  alimentation_mensuelle: number;
  secteurs_principaux: string[];
  entreprises_top: string[];
  taux_chomage: number;
  nb_offres_emploi: number;
  population: number;
}

const MOYENNE_NATIONALE_BRUT = 2650;

export default function PageVille({ slug }: { slug: string }) {
  const [ville, setVille] = useState<VilleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [salary, setSalary] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadVilleData();
  }, [slug]);

  useEffect(() => {
    if (ville && salary === 0) {
      setSalary(ville.salaire_moyen_brut);
      calculateSalary(ville.salaire_moyen_brut);
    }
  }, [ville]);

  const loadVilleData = async () => {
    try {
      const { data, error } = await supabase
        .from('villes')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setVille(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement ville:', error);
      setLoading(false);
    }
  };

  const calculateSalary = (brut: number) => {
    const chargeRate = 0.22;
    const net = brut * (1 - chargeRate);
    const taxRate = calculateTaxRate(net);
    const netApresImpot = net * (1 - taxRate);

    setResult({
      brut,
      net,
      netApresImpot,
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
    }
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <div>Chargement des données...</div>
      </div>
    );
  }

  if (!ville) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
        <div>Ville non trouvée</div>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const diffNationale = ((ville.salaire_moyen_brut - MOYENNE_NATIONALE_BRUT) / MOYENNE_NATIONALE_BRUT * 100).toFixed(1);
  const coutVieTotal = ville.loyer_moyen + ville.transport_mensuel + ville.alimentation_mensuelle;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📍</span>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            fontWeight: 600
          }}>
            {ville.region}
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.75rem'
        }}>
          Salaire à {ville.nom}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto 1.5rem'
        }}>
          Calculateur de salaire brut / net pour {ville.nom} avec données actualisées 2026.
          Comparez avec la moyenne nationale et découvrez le coût de la vie.
        </p>

        {/* Key Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Salaire moyen brut
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {formatter.format(ville.salaire_moyen_brut)}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: parseFloat(diffNationale) >= 0 ? '#10b981' : '#ef4444',
              marginTop: '0.25rem',
              fontWeight: 600
            }}>
              {parseFloat(diffNationale) >= 0 ? '+' : ''}{diffNationale}% vs nationale
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Population
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {ville.population.toLocaleString('fr-FR')}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              habitants
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Offres d'emploi
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {ville.nb_offres_emploi.toLocaleString('fr-FR')}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              postes disponibles
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Taux de chômage
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: ville.taux_chomage < 8 ? '#10b981' : ville.taux_chomage < 10 ? '#f59e0b' : '#ef4444'
            }}>
              {ville.taux_chomage}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              au T4 2025
            </div>
          </div>
        </div>
      </header>

      <DisclaimerBanner />

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Calculateur */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '1rem'
            }}>
              💰
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Calculateur Salaire
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Basé sur le salaire moyen à {ville.nom}
            </p>
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
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Salaire net (avant impôt)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
                  {formatter.format(result.net)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Salaire net (après impôt {result.taxRate}%)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>
                  {formatter.format(result.netApresImpot)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coût de la vie */}
        <div style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '1rem'
            }}>
              🏠
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Coût de la Vie
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Budget mensuel moyen estimé
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CostItem
              icon="🏡"
              label="Loyer moyen"
              value={formatter.format(ville.loyer_moyen)}
              color="#3b82f6"
            />
            <CostItem
              icon="🚇"
              label="Transport"
              value={formatter.format(ville.transport_mensuel)}
              color="#8b5cf6"
            />
            <CostItem
              icon="🍽️"
              label="Alimentation"
              value={formatter.format(ville.alimentation_mensuelle)}
              color="#10b981"
            />
            <div style={{
              borderTop: '2px solid var(--border-color)',
              paddingTop: '1rem',
              marginTop: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  Total mensuel
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {formatter.format(coutVieTotal)}
                </div>
              </div>
              {result && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: result.netApresImpot > coutVieTotal
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <strong>Reste à vivre:</strong>{' '}
                  <span style={{
                    fontWeight: 700,
                    color: result.netApresImpot > coutVieTotal ? '#10b981' : '#ef4444'
                  }}>
                    {formatter.format(result.netApresImpot - coutVieTotal)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AdSense */}
      <div style={{ marginBottom: '3rem' }}>
        <AdSenseBlock adSlot="ville-page" adFormat="horizontal" />
      </div>

      {/* Secteurs & Entreprises */}
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
            fontSize: '1.375rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🏢</span>
            Secteurs Principaux
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {ville.secteurs_principaux.map((secteur, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {secteur}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.375rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⭐</span>
            Entreprises Majeures
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {ville.entreprises_top.map((entreprise, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.875rem 1rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  fontWeight: 500,
                  fontSize: '0.95rem'
                }}
              >
                {entreprise}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <FAQ />
    </div>
  );
}

function CostItem({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'var(--bg-secondary)',
      borderRadius: '10px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <span style={{ fontWeight: 500 }}>{label}</span>
      </div>
      <span style={{ fontWeight: 700, fontSize: '1.1rem', color }}>{value}</span>
    </div>
  );
}
