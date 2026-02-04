import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  onClose: () => void;
}

function MenuLink({ href, children, currentPath, setCurrentPath, onClose }: MenuLinkProps) {
  const isActive = currentPath === href;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
      }}
      style={{
        padding: '1rem',
        display: 'block',
        textDecoration: 'none',
        color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
        background: isActive ? 'var(--bg-tertiary)' : 'transparent',
        borderRadius: '10px',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--bg-secondary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {children}
    </a>
  );
}

export default function MobileMenu({ isOpen, onClose, currentPath, setCurrentPath }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 998,
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '80%',
          maxWidth: '400px',
          background: 'var(--bg-primary)',
          zIndex: 999,
          padding: '1.5rem',
          overflowY: 'auto',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.2)',
          animation: 'slideInRight 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Menu</h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              borderRadius: '10px',
              border: '2px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
            Calculateurs Salaire
          </h3>
          <MenuLink href="/" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Calculateur Standard
          </MenuLink>
          <MenuLink href="/calculateur-salaire-alternant" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Alternant
          </MenuLink>
          <MenuLink href="/calculateur-salaire-apprenti" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Apprenti
          </MenuLink>
          <MenuLink href="/calculateur-salaire-cadre" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Cadre
          </MenuLink>
          <MenuLink href="/calculateur-salaire-interim" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Intérim
          </MenuLink>
          <MenuLink href="/calculateur-salaire-fonction-publique" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Fonction Publique
          </MenuLink>
          <MenuLink href="/calculateur-salaire-auto-entrepreneur" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Auto-Entrepreneur
          </MenuLink>
          <MenuLink href="/calculateur-salaire-temps-partiel" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Temps Partiel
          </MenuLink>
          <MenuLink href="/calculateur-profession-liberale" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Profession Libérale
          </MenuLink>

          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Autres Calculateurs
          </h3>
          <MenuLink href="/calculateur-conges-rtt" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Congés & RTT
          </MenuLink>
          <MenuLink href="/calculateur-frais-kilometriques" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Frais Kilométriques
          </MenuLink>
          <MenuLink href="/calculateur-heures-supplementaires" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Heures Supplémentaires
          </MenuLink>

          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Ressources
          </h3>
          <MenuLink href="/blog" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Blog
          </MenuLink>
          <MenuLink href="/quiz-etes-vous-bien-paye" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Quiz : Êtes-vous bien payé ?
          </MenuLink>
          <MenuLink href="/infographies-salaires" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Infographies Salaires 2026
          </MenuLink>
          <MenuLink href="/simulateur-augmentation" currentPath={currentPath} setCurrentPath={setCurrentPath} onClose={onClose}>
            Simulateur d'augmentation
          </MenuLink>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
