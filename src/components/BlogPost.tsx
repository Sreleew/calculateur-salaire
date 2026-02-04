import { useState } from 'react';
import AdSenseBlock from './AdSenseBlock';

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
}

interface BlogPostProps {
  post: BlogPostData;
  onBack: () => void;
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <article style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          fontWeight: 500,
          fontFamily: 'inherit',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease'
        }}
      >
        ← Retour aux articles
      </button>

      <header style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{
            padding: '0.5rem 1rem',
            background: 'rgba(59, 130, 246, 0.15)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#3b82f6'
          }}>
            {post.category}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {post.readTime} de lecture
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {post.publishDate}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          {post.title}
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.5rem'
        }}>
          {post.excerpt}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            ✍️
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{post.author}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Expert en rémunération
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            borderRadius: '16px',
            marginBottom: '2rem',
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
      )}

      <div
        style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: 'var(--text-primary)'
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div style={{ margin: '3rem 0' }}>
        <AdSenseBlock adSlot="1234567890" adFormat="horizontal" />
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Tags associés
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
