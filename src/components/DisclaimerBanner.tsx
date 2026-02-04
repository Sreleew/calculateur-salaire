export default function DisclaimerBanner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
      borderLeft: '4px solid #f59e0b',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      border: '1px solid rgba(245, 158, 11, 0.3)'
    }}>
      <div style={{
        fontSize: '1.5rem',
        lineHeight: 1
      }}>
        ⚖️
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontWeight: 600,
          marginBottom: '0.5rem',
          fontSize: '0.95rem',
          color: '#f59e0b'
        }}>
          Estimation indicative non contractuelle
        </h4>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          margin: 0
        }}>
          Les calculs présentés sont des estimations basées sur les taux officiels 2026 (URSSAF, DGFiP).
          Ils ne peuvent se substituer à un bulletin de paie officiel. Pour un calcul personnalisé et contractuel,
          consultez votre service des ressources humaines ou{' '}
          <a
            href="https://www.urssaf.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#f59e0b',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            l'URSSAF
          </a>.
        </p>
      </div>
    </div>
  );
}
