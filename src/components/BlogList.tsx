import { BlogPostData } from './BlogPost';

interface BlogListProps {
  posts: BlogPostData[];
  onSelectPost: (post: BlogPostData) => void;
}

export default function BlogList({ posts, onSelectPost }: BlogListProps) {
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Blog Salaire & Rémunération
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Guides, conseils et analyses pour optimiser votre rémunération en France
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {post.image && (
              <div style={{
                width: '100%',
                height: '200px',
                background: `url(${post.image}) center/cover`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(59, 130, 246, 0.9)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'white'
                }}>
                  {post.category}
                </div>
              </div>
            )}

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.publishDate}</span>
              </div>

              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                lineHeight: 1.3,
                fontFamily: "'Fraunces', serif"
              }}>
                {post.title}
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                flex: 1
              }}>
                {post.excerpt}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>✍️</span>
                  <span>{post.author}</span>
                </div>

                <span style={{
                  color: '#3b82f6',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Lire l'article →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Besoin de calculer votre salaire ?
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Utilisez notre calculateur gratuit pour convertir instantanément votre salaire brut en net
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Accéder au calculateur
        </button>
      </div>
    </section>
  );
}
