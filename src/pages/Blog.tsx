import { useState } from 'react';
import BlogList from '../components/BlogList';
import BlogPost, { BlogPostData } from '../components/BlogPost';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh',
      background: 'var(--bg-primary)'
    }}>
      {selectedPost ? (
        <BlogPost
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <BlogList
          posts={blogPosts}
          onSelectPost={setSelectedPost}
        />
      )}
    </div>
  );
}
