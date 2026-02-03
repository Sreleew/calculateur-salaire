import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const pathNames: Record<string, string> = {
  '/': 'Accueil',
  '/calculateur-salaire-cadre': 'Calculateur Cadre',
  '/calculateur-salaire-apprenti': 'Calculateur Apprenti',
  '/calculateur-salaire-fonction-publique': 'Fonction Publique',
  '/calculateur-salaire-alternant': 'Calculateur Alternant',
  '/calculateur-salaire-auto-entrepreneur': 'Auto-Entrepreneur',
  '/calculateur-salaire-temps-partiel': 'Temps Partiel',
  '/calculateur-conges-rtt': 'Congés & RTT',
  '/calculateur-frais-kilometriques': 'Frais Kilométriques',
  '/calculateur-heures-supplementaires': 'Heures Supplémentaires',
  '/calculateur-salaire-interim': 'Intérim',
  '/calculateur-profession-liberale': 'Profession Libérale',
  '/quiz-etes-vous-bien-paye': 'Quiz',
  '/infographies-salaires': 'Infographies',
  '/blog': 'Blog'
};

export default function Breadcrumb({ currentPath, setCurrentPath }: BreadcrumbProps) {
  if (currentPath === '/') return null;

  const pathSegments = currentPath.split('/').filter(Boolean);

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        fontSize: '0.875rem'
      }}
      aria-label="Breadcrumb"
    >
      <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              setCurrentPath('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <Home size={16} />
            <span>Accueil</span>
          </a>
          <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
        </li>

        {pathSegments.map((segment, index) => {
          const path = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const name = pathNames[path] || segment;

          return (
            <li key={path} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isLast ? (
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {name}
                </span>
              ) : (
                <>
                  <a
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', path);
                      setCurrentPath(path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {name}
                  </a>
                  <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
