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
  population: number;
}

export default function ComparateurCoutVie() {
  const [villes, setVilles] = useState<VilleData[]>([]);
  const [villeA, setVilleA] = useState<string>('');
  const [villeB, setVilleB] = useState<string>('');
  const [salaireActuel, setSalaireActuel] = useState<number>(2800);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadVilles();
  }, []);

  useEffect(() => {
    if (villeA && villeB && salaireActuel > 0) {
      calculateComparison();
    }
  }, [villeA, villeB, salaireActuel]);

  const loadVilles = async () => {
    try {
      const { data, error } = await supabase
        .from('villes')
        .select('slug, nom, region, salaire_moyen_brut, loyer_moyen, transport_mensuel, alimentation_mensuelle, population')
        .order('population', { ascending: false });

      if (error) throw error;
      setVilles(data || []);

      if (data && data.length >= 2) {
        setVilleA(data[0].slug);
        setVilleB(data[1].slug);
      }
    } catch (error) {
      console.error('Erreur chargement villes:', error);
    }
  };

  const calculateComparison = () => {
    const dataVilleA = villes.find(v => v.slug === villeA);
    const dataVilleB = villes.find(v => v.slug === villeB);

    if (!dataVilleA || !dataVilleB) return;

    const coutVieA = dataVilleA.loyer_moyen + dataVilleA.transport_mensuel + dataVilleA.alimentation_mensuelle;
    const coutVieB = dataVilleB.loyer_moyen + dataVilleB.transport_mensuel + dataVilleB.alimentation_mensuelle;

    const ratioLoyer = dataVilleB.loyer_moyen / dataVilleA.loyer_moyen;
    const ratioTransport = dataVilleB.transport_mensuel / dataVilleA.transport_mensuel;
    const ratioAlimentation = dataVilleB.alimentation_mensuelle / dataVilleA.alimentation_mensuelle;

    const coefficientGlobal = (ratioLoyer * 0.4) + (ratioTransport * 0.15) + (ratioAlimentation * 0.45);

    const resteAVivreA = salaireActuel * 0.78 - coutVieA;

    const salaireEquivalent = Math.round((coutVieB + resteAVivreA) / 0.78);
    const difference = salaireEquivalent - salaireActuel;
    const pourcentageDiff = ((difference / salaireActuel) * 100).toFixed(1);

    setResult({
      villeA: dataVilleA,
      villeB: dataVilleB,
      coutVieA,
      coutVieB,
      salaireEquivalent,
      difference,
      pourcentageDiff,
      coefficientGlobal,
      resteAVivreA,
      resteAVivreB: salaireEquivalent * 0.78 - coutVieB
    });
  };

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.15)'
          }}>
            ⚖️
          </div>
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
          Comparateur Coût de la Vie
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Comparez le coût de la vie entre deux villes françaises et découvrez le salaire équivalent
          nécessaire pour maintenir le même niveau de vie.
        </p>
      </header>

      <DisclaimerBanner />

      {/* Configuration */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem'
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
          <span style={{ fontSize: '1.5rem' }}>⚙️</span>
          Configuration de la comparaison
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Ville A */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Ville actuelle
            </label>
            <select
              value={villeA}
              onChange={(e) => setVilleA(e.target.value)}
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
              {villes.map((ville) => (
                <option key={ville.slug} value={ville.slug}>
                  {ville.nom} ({ville.region})
                </option>
              ))}
            </select>
          </div>

          {/* Salaire actuel */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Salaire brut actuel (mensuel)
            </label>
            <input
              type="number"
              value={salaireActuel || ''}
              onChange={(e) => setSalaireActuel(parseFloat(e.target.value) || 0)}
              placeholder="Ex: 2800"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Ville B */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Ville de destination
            </label>
            <select
              value={villeB}
              onChange={(e) => setVilleB(e.target.value)}
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
              {villes.map((ville) => (
                <option key={ville.slug} value={ville.slug}>
                  {ville.nom} ({ville.region})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Main Result Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              💡 Salaire Équivalent Nécessaire
            </h2>
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              {formatter.format(result.salaireEquivalent)}
            </div>
            <div style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem'
            }}>
              pour maintenir le même niveau de vie à {result.villeB.nom}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: parseFloat(result.pourcentageDiff) >= 0
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
              borderRadius: '12px',
              border: `1px solid ${parseFloat(result.pourcentageDiff) >= 0 ? '#ef4444' : '#10b981'}`,
              fontSize: '1.25rem',
              fontWeight: 700,
              color: parseFloat(result.pourcentageDiff) >= 0 ? '#ef4444' : '#10b981'
            }}>
              {parseFloat(result.pourcentageDiff) >= 0 ? '+' : ''}{result.pourcentageDiff}%
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                ({parseFloat(result.pourcentageDiff) >= 0 ? '+' : ''}{formatter.format(result.difference)})
              </span>
            </div>
          </div>

          {/* AdSense */}
          <div style={{ marginBottom: '2rem' }}>
            <AdSenseBlock adSlot="comparateur" adFormat="horizontal" />
          </div>

          {/* Detailed Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Ville A */}
            <div style={{
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  {result.villeA.nom}
                </h3>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#3b82f6'
                }}>
                  Actuel
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ComparisonItem
                  label="Salaire brut"
                  value={formatter.format(salaireActuel)}
                  icon="💰"
                />
                <ComparisonItem
                  label="Salaire net (estimé)"
                  value={formatter.format(salaireActuel * 0.78)}
                  icon="💵"
                />
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                    fontWeight: 600
                  }}>
                    Coût de la vie mensuel
                  </div>
                  <ComparisonItem
                    label="Loyer"
                    value={formatter.format(result.villeA.loyer_moyen)}
                    icon="🏡"
                    small
                  />
                  <ComparisonItem
                    label="Transport"
                    value={formatter.format(result.villeA.transport_mensuel)}
                    icon="🚇"
                    small
                  />
                  <ComparisonItem
                    label="Alimentation"
                    value={formatter.format(result.villeA.alimentation_mensuelle)}
                    icon="🍽️"
                    small
                  />
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 700
                    }}>
                      <span>Total</span>
                      <span>{formatter.format(result.coutVieA)}</span>
                    </div>
                  </div>
                </div>
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Reste à vivre
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
                        {formatter.format(result.resteAVivreA)}
                      </div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>💚</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ville B */}
            <div style={{
              background: 'var(--bg-card)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  {result.villeB.nom}
                </h3>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#8b5cf6'
                }}>
                  Destination
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ComparisonItem
                  label="Salaire brut nécessaire"
                  value={formatter.format(result.salaireEquivalent)}
                  icon="💰"
                />
                <ComparisonItem
                  label="Salaire net (estimé)"
                  value={formatter.format(result.salaireEquivalent * 0.78)}
                  icon="💵"
                />
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                    fontWeight: 600
                  }}>
                    Coût de la vie mensuel
                  </div>
                  <ComparisonItem
                    label="Loyer"
                    value={formatter.format(result.villeB.loyer_moyen)}
                    icon="🏡"
                    small
                    diff={((result.villeB.loyer_moyen - result.villeA.loyer_moyen) / result.villeA.loyer_moyen * 100).toFixed(0)}
                  />
                  <ComparisonItem
                    label="Transport"
                    value={formatter.format(result.villeB.transport_mensuel)}
                    icon="🚇"
                    small
                    diff={((result.villeB.transport_mensuel - result.villeA.transport_mensuel) / result.villeA.transport_mensuel * 100).toFixed(0)}
                  />
                  <ComparisonItem
                    label="Alimentation"
                    value={formatter.format(result.villeB.alimentation_mensuelle)}
                    icon="🍽️"
                    small
                    diff={((result.villeB.alimentation_mensuelle - result.villeA.alimentation_mensuelle) / result.villeA.alimentation_mensuelle * 100).toFixed(0)}
                  />
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 700
                    }}>
                      <span>Total</span>
                      <div>
                        <span>{formatter.format(result.coutVieB)}</span>
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.875rem',
                          color: result.coutVieB > result.coutVieA ? '#ef4444' : '#10b981'
                        }}>
                          ({result.coutVieB > result.coutVieA ? '+' : ''}
                          {((result.coutVieB - result.coutVieA) / result.coutVieA * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Reste à vivre
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
                        {formatter.format(result.resteAVivreB)}
                      </div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>💚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <FAQ />
    </div>
  );
}

function ComparisonItem({
  icon,
  label,
  value,
  small = false,
  diff
}: {
  icon: string;
  label: string;
  value: string;
  small?: boolean;
  diff?: string;
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: small ? '0.5rem 0' : '0.75rem',
      ...(small ? {} : {
        background: 'var(--bg-secondary)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)'
      })
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: small ? '1.25rem' : '1.5rem' }}>{icon}</span>
        <span style={{ fontWeight: small ? 400 : 500, fontSize: small ? '0.9rem' : '1rem' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontWeight: 700, fontSize: small ? '0.95rem' : '1.1rem' }}>{value}</span>
        {diff && (
          <span style={{
            fontSize: '0.75rem',
            color: parseFloat(diff) > 0 ? '#ef4444' : '#10b981',
            fontWeight: 600
          }}>
            ({parseFloat(diff) > 0 ? '+' : ''}{diff}%)
          </span>
        )}
      </div>
    </div>
  );
}
