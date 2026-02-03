import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

interface SearchBarProps {
  setCurrentPath: (path: string) => void;
}

interface SearchResult {
  type: 'calculator' | 'blog';
  title: string;
  path: string;
  description?: string;
}

const calculators: SearchResult[] = [
  { type: 'calculator', title: 'Calculateur Standard', path: '/', description: 'Convertir salaire brut en net' },
  { type: 'calculator', title: 'Calculateur Cadre', path: '/calculateur-salaire-cadre', description: 'Salaire cadre avec cotisations spécifiques' },
  { type: 'calculator', title: 'Calculateur Apprenti', path: '/calculateur-salaire-apprenti', description: 'Rémunération apprenti selon âge et année' },
  { type: 'calculator', title: 'Fonction Publique', path: '/calculateur-salaire-fonction-publique', description: 'Grille indiciaire fonction publique' },
  { type: 'calculator', title: 'Calculateur Alternant', path: '/calculateur-salaire-alternant', description: 'Salaire alternance pro et apprentissage' },
  { type: 'calculator', title: 'Auto-Entrepreneur', path: '/calculateur-salaire-auto-entrepreneur', description: 'Revenu net auto-entrepreneur' },
  { type: 'calculator', title: 'Temps Partiel', path: '/calculateur-salaire-temps-partiel', description: 'Conversion temps plein / temps partiel' },
  { type: 'calculator', title: 'Congés & RTT', path: '/calculateur-conges-rtt', description: 'Calcul congés payés et RTT' },
  { type: 'calculator', title: 'Frais Kilométriques', path: '/calculateur-frais-kilometriques', description: 'Barème frais km professionnels' },
  { type: 'calculator', title: 'Heures Supplémentaires', path: '/calculateur-heures-supplementaires', description: 'Majoration heures sup et complémentaires' },
  { type: 'calculator', title: 'Intérim', path: '/calculateur-salaire-interim', description: 'Salaire intérimaire avec primes' },
  { type: 'calculator', title: 'Profession Libérale', path: '/calculateur-profession-liberale', description: 'Revenus profession libérale' },
  { type: 'calculator', title: 'Quiz Salaire', path: '/quiz-etes-vous-bien-paye', description: 'Êtes-vous bien payé ?' },
  { type: 'calculator', title: 'Infographies', path: '/infographies-salaires', description: 'Infographies salaires 2026' }
];

export default function SearchBar({ setCurrentPath }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const blogResults: SearchResult[] = blogPosts.map(post => ({
      type: 'blog' as const,
      title: post.title,
      path: '/blog',
      description: post.excerpt
    }));

    const allResults = [...calculators, ...blogResults].filter(result =>
      result.title.toLowerCase().includes(searchQuery) ||
      result.description?.toLowerCase().includes(searchQuery)
    );

    setResults(allResults.slice(0, 8));
    setIsOpen(true);
  }, [query]);

  const handleSelect = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'relative' }}>
        <Search
          size={20}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)',
            pointerEvents: 'none'
          }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => {
            if (query.length >= 2) setIsOpen(true);
            e.currentTarget.style.borderColor = 'var(--primary-color)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
          placeholder="Rechercher un calculateur ou article..."
          style={{
            width: '100%',
            padding: '0.75rem 3rem 0.75rem 3rem',
            borderRadius: '10px',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            background: 'var(--bg-primary)',
            border: '2px solid var(--border-color)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result.path)}
              style={{
                width: '100%',
                padding: '1rem',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderBottom: index < results.length - 1 ? '1px solid var(--border-color)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: result.type === 'calculator' ? '#dbeafe' : '#fef3c7',
                    color: result.type === 'calculator' ? '#1e40af' : '#92400e'
                  }}
                >
                  {result.type === 'calculator' ? 'Calculateur' : 'Blog'}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                {result.title}
              </div>
              {result.description && (
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {result.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
