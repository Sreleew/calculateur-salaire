import { useState } from 'react';

export default function MethodologyBlock() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      marginBottom: '2rem',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'inherit',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1))',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            🔬
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '0.25rem'
            }}>
              Méthodologie de Calcul
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              Comprendre comment nous calculons votre salaire
            </p>
          </div>
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          background: 'var(--bg-secondary)',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </div>
      </button>

      {isOpen && (
        <div style={{
          padding: '0 1.5rem 1.5rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          animation: 'slideDown 0.3s ease'
        }}>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#3b82f6' }}>1.</span> Calcul Salaire Brut → Net
            </h4>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <pre style={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                margin: 0,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap'
              }}>
{`Salaire Net Avant Impôt = Salaire Brut - Cotisations Salariales

Cotisations Salariales incluent :
• Assurance maladie (0% salarié)
• Assurance vieillesse (6.90% + 0.40%)
• Retraite complémentaire (3.15% à 8.64%)
• CSG déductible (6.80% sur 98.25% du brut)
• CSG non déductible (2.40%)
• CRDS (0.50%)
• Spécifiques cadres : APEC (0.024%), CET (0.14%)

Salaire Net Après Impôt = Net Avant Impôt - Prélèvement à la Source

Prélèvement à la Source :
• Calculé selon barème fiscal 2026 (DGFiP)
• Taux progressif de 0% à 43%
• Basé sur le revenu net imposable`}
              </pre>
            </div>

            <h4 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#3b82f6' }}>2.</span> Calcul Salaire Net → Brut
            </h4>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <pre style={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                margin: 0,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap'
              }}>
{`Méthode itérative par dichotomie :
1. Estimation initiale : Brut = Net × 1.30
2. Calcul du net théorique avec ce brut
3. Comparaison avec net souhaité
4. Ajustement itératif (max 50 itérations)
5. Convergence à ±0.01€`}
              </pre>
            </div>

            <h4 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#3b82f6' }}>3.</span> Taux de Charges par Statut
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {[
                { statut: 'Non-cadre', taux: '22%', color: '#10b981' },
                { statut: 'Cadre', taux: '25%', color: '#3b82f6' },
                { statut: 'Cadre supérieur', taux: '27%', color: '#8b5cf6' },
                { statut: 'Fonction publique', taux: '17%', color: '#f59e0b' },
                { statut: 'Apprenti', taux: '9%', color: '#ec4899' },
                { statut: 'Auto-entrepreneur', taux: '22%', color: '#14b8a6' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}40`,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {item.statut}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: item.color }}>
                    {item.taux}
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#3b82f6' }}>4.</span> Sources Officielles
            </h4>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <SourceLink
                  emoji="🏛️"
                  title="URSSAF"
                  description="Taux de cotisations sociales 2026"
                  url="https://www.urssaf.fr"
                />
                <SourceLink
                  emoji="📊"
                  title="DGFiP"
                  description="Barème prélèvement à la source 2026"
                  url="https://www.impots.gouv.fr"
                />
                <SourceLink
                  emoji="📜"
                  title="Légifrance"
                  description="Code du travail - Articles L3242-1 et suivants"
                  url="https://www.legifrance.gouv.fr"
                />
                <SourceLink
                  emoji="📈"
                  title="INSEE"
                  description="Statistiques salaires France"
                  url="https://www.insee.fr"
                />
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔄</span>
                <strong style={{ fontSize: '0.95rem' }}>Dernière mise à jour</strong>
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                margin: 0
              }}>
                Taux et barèmes mis à jour le <strong>29 janvier 2026</strong> selon les derniers textes officiels publiés.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SourceLink({ emoji, title, description, url }: { emoji: string; title: string; description: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem',
        background: 'var(--bg-card)',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3b82f6';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: '0.125rem', fontSize: '0.95rem' }}>
          {title}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {description}
        </div>
      </div>
      <span style={{ color: 'var(--text-muted)' }}>→</span>
    </a>
  );
}
