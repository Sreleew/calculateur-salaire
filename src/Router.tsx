import { useState, useEffect, lazy, Suspense } from 'react';
import { Menu } from 'lucide-react';
import App from './App';
import MobileMenu from './components/MobileMenu';
import Breadcrumb from './components/Breadcrumb';
import SearchBar from './components/SearchBar';
import SEOHead from './components/SEOHead';
import { getSEOConfig } from './config/seoConfig';

const CalculateurCadre = lazy(() => import('./pages/CalculateurCadre'));
const CalculateurApprenti = lazy(() => import('./pages/CalculateurApprenti'));
const CalculateurFonctionPublique = lazy(() => import('./pages/CalculateurFonctionPublique'));
const CalculateurAlternant = lazy(() => import('./pages/CalculateurAlternant'));
const CalculateurAutoEntrepreneur = lazy(() => import('./pages/CalculateurAutoEntrepreneur'));
const CalculateurTempsPartiel = lazy(() => import('./pages/CalculateurTempsPartiel'));
const CalculateurCongesRTT = lazy(() => import('./pages/CalculateurCongesRTT'));
const CalculateurFraisKm = lazy(() => import('./pages/CalculateurFraisKm'));
const CalculateurHeuresSup = lazy(() => import('./pages/CalculateurHeuresSup'));
const CalculateurInterim = lazy(() => import('./pages/CalculateurInterim'));
const CalculateurProfessionLiberale = lazy(() => import('./pages/CalculateurProfessionLiberale'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Infographies = lazy(() => import('./pages/Infographies'));
const InfographieBrutNet = lazy(() => import('./pages/InfographieBrutNet'));
const InfographieCadreNonCadre = lazy(() => import('./pages/InfographieCadreNonCadre'));
const InfographieSMIC = lazy(() => import('./pages/InfographieSMIC'));
const InfographieSecteurs = lazy(() => import('./pages/InfographieSecteurs'));
const InfographieMetiers = lazy(() => import('./pages/InfographieMetiers'));
const SimulateurAugmentation = lazy(() => import('./pages/SimulateurAugmentation'));
const Blog = lazy(() => import('./pages/Blog'));
const PageVille = lazy(() => import('./pages/PageVille'));
const ComparateurCoutVie = lazy(() => import('./pages/ComparateurCoutVie'));
const CalculateurAlsaceMoselle = lazy(() => import('./pages/CalculateurAlsaceMoselle'));
const CalculateurDOMTOM = lazy(() => import('./pages/CalculateurDOMTOM'));
const CalculateurCorse = lazy(() => import('./pages/CalculateurCorse'));

const VILLE_SLUGS = [
  'paris', 'lyon', 'marseille', 'toulouse', 'bordeaux',
  'nantes', 'lille', 'strasbourg', 'rennes', 'nice',
  'montpellier', 'grenoble', 'toulon', 'angers', 'dijon',
  'reims', 'le-havre', 'brest', 'clermont-ferrand', 'tours'
];

const routes: Record<string, () => JSX.Element> = {
  '/': App,
  '/calculateur-salaire-cadre': CalculateurCadre,
  '/calculateur-salaire-apprenti': CalculateurApprenti,
  '/calculateur-salaire-fonction-publique': CalculateurFonctionPublique,
  '/calculateur-salaire-alternant': CalculateurAlternant,
  '/calculateur-salaire-auto-entrepreneur': CalculateurAutoEntrepreneur,
  '/calculateur-salaire-temps-partiel': CalculateurTempsPartiel,
  '/calculateur-conges-rtt': CalculateurCongesRTT,
  '/calculateur-frais-kilometriques': CalculateurFraisKm,
  '/calculateur-heures-supplementaires': CalculateurHeuresSup,
  '/calculateur-salaire-interim': CalculateurInterim,
  '/calculateur-profession-liberale': CalculateurProfessionLiberale,
  '/quiz-etes-vous-bien-paye': Quiz,
  '/infographies-salaires': Infographies,
  '/infographie-brut-net': InfographieBrutNet,
  '/infographie-cadre-non-cadre': InfographieCadreNonCadre,
  '/infographie-smic': InfographieSMIC,
  '/infographie-secteurs': InfographieSecteurs,
  '/infographie-metiers': InfographieMetiers,
  '/simulateur-augmentation': SimulateurAugmentation,
  '/blog': Blog,
  '/comparateur-cout-vie': ComparateurCoutVie,
  '/calculateur-alsace-moselle': CalculateurAlsaceMoselle,
  '/calculateur-domtom': CalculateurDOMTOM,
  '/calculateur-corse': CalculateurCorse,
};

VILLE_SLUGS.forEach(slug => {
  routes[`/salaire-${slug}`] = () => <PageVille slug={slug} />;
});

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Component = routes[currentPath] || App;
  const seoConfig = getSEOConfig(currentPath);

  return (
    <div>
      <SEOHead config={seoConfig} />

      <nav style={{
        position: 'sticky',
        top: 0,
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem',
        zIndex: 100,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                💰
              </div>
              <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>Calculateur Salaire</span>
            </a>

            <div style={{ flex: 1 }}>
              <SearchBar setCurrentPath={setCurrentPath} />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                padding: '0.5rem',
                borderRadius: '10px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-primary)',
                cursor: 'pointer',
                display: window.innerWidth < 1024 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} />
            </button>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/blog');
              }}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: window.innerWidth < 1024 ? 'none' : 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: currentPath === '/blog' ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none',
                transform: currentPath === '/blog' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = currentPath === '/blog' ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = currentPath === '/blog' ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Blog
            </a>
          </div>

          <div style={{ display: window.innerWidth < 1024 ? 'none' : 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
            <NavLink href="/calculateur-salaire-alternant" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Alternant
            </NavLink>
            <NavLink href="/calculateur-salaire-apprenti" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Apprenti
            </NavLink>
            <NavLink href="/calculateur-salaire-cadre" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Cadre
            </NavLink>
            <NavLink href="/calculateur-salaire-interim" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Intérim
            </NavLink>
            <NavLink href="/calculateur-salaire-fonction-publique" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Fonction Publique
            </NavLink>
            <NavLink href="/quiz-etes-vous-bien-paye" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Êtes-vous bien payé ?
            </NavLink>
            <NavLink href="/infographies-salaires" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Infographies
            </NavLink>
            <NavLink href="/simulateur-augmentation" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Simulateur d'augmentation
            </NavLink>
            <NavLink href="/comparateur-cout-vie" currentPath={currentPath} setCurrentPath={setCurrentPath}>
              Comparateur Coût de Vie
            </NavLink>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />

      <Breadcrumb currentPath={currentPath} setCurrentPath={setCurrentPath} />

      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          color: 'var(--text-muted)'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid var(--border-color)',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <p>Chargement...</p>
          </div>
        </div>
      }>
        <Component />
      </Suspense>

      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Calculateurs par statut
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/calculateur-salaire-cadre" setCurrentPath={setCurrentPath}>
                    Salaire Cadre
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-salaire-apprenti" setCurrentPath={setCurrentPath}>
                    Salaire Apprenti
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-salaire-fonction-publique" setCurrentPath={setCurrentPath}>
                    Fonction Publique
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-salaire-alternant" setCurrentPath={setCurrentPath}>
                    Salaire Alternant
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-salaire-interim" setCurrentPath={setCurrentPath}>
                    Salaire Intérim
                  </FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Indépendants
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/calculateur-salaire-auto-entrepreneur" setCurrentPath={setCurrentPath}>
                    Auto-entrepreneur
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-profession-liberale" setCurrentPath={setCurrentPath}>
                    Profession Libérale
                  </FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Calculateurs bonus
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/calculateur-salaire-temps-partiel" setCurrentPath={setCurrentPath}>
                    Temps Partiel
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-conges-rtt" setCurrentPath={setCurrentPath}>
                    Congés & RTT
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-frais-kilometriques" setCurrentPath={setCurrentPath}>
                    Frais Kilométriques
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-heures-supplementaires" setCurrentPath={setCurrentPath}>
                    Heures Supplémentaires
                  </FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Outils & Ressources
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/blog" setCurrentPath={setCurrentPath}>
                    Blog Salaire & Rémunération
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/quiz-etes-vous-bien-paye" setCurrentPath={setCurrentPath}>
                    Quiz : Êtes-vous bien payé ?
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/infographies-salaires" setCurrentPath={setCurrentPath}>
                    Infographies Salaires 2026
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/comparateur-cout-vie" setCurrentPath={setCurrentPath}>
                    Comparateur Coût de Vie
                  </FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Régions Spécifiques
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/calculateur-alsace-moselle" setCurrentPath={setCurrentPath}>
                    Alsace-Moselle
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-domtom" setCurrentPath={setCurrentPath}>
                    DOM-TOM
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/calculateur-corse" setCurrentPath={setCurrentPath}>
                    Corse
                  </FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Salaires par Ville
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                <li>
                  <FooterLink href="/salaire-paris" setCurrentPath={setCurrentPath}>
                    Paris
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/salaire-lyon" setCurrentPath={setCurrentPath}>
                    Lyon
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/salaire-marseille" setCurrentPath={setCurrentPath}>
                    Marseille
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/salaire-toulouse" setCurrentPath={setCurrentPath}>
                    Toulouse
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/salaire-bordeaux" setCurrentPath={setCurrentPath}>
                    Bordeaux
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            <p>
              Calculateur Salaire Brut/Net France 2026 — Les calculs sont indicatifs et basés sur les taux en vigueur.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Pour un calcul officiel, consultez votre service RH ou{' '}
              <a href="https://www.urssaf.fr" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                urssaf.fr
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  href,
  currentPath,
  setCurrentPath,
  children
}: {
  href: string;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  children: React.ReactNode;
}) {
  const isActive = currentPath === href;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive ? 'white' : 'var(--text-secondary)',
        background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.3s ease',
        display: 'inline-block'
      }}
    >
      {children}
    </a>
  );
}

function FooterLink({
  href,
  setCurrentPath,
  children
}: {
  href: string;
  setCurrentPath: (path: string) => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      style={{
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.3s ease'
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.color = '#3b82f6';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.color = 'var(--text-secondary)';
      }}
    >
      {children}
    </a>
  );
}
