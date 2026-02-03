import { useEffect } from 'react';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  schema?: Record<string, any>;
  noindex?: boolean;
}

export default function SEOHead({ config }: { config: SEOConfig }) {
  useEffect(() => {
    document.title = config.title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    updateMetaTag('description', config.description);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    if (config.noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonicalUrl;

    updateMetaTag('og:type', config.ogType || 'website', true);
    updateMetaTag('og:url', config.canonicalUrl, true);
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:site_name', 'Calculateur Salaire Brut Net 2026', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
      updateMetaTag('og:image:alt', config.ogImageAlt || config.title, true);
    }

    updateMetaTag('twitter:card', config.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:url', config.canonicalUrl);
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    if (config.ogImage) {
      updateMetaTag('twitter:image', config.ogImage);
      updateMetaTag('twitter:image:alt', config.ogImageAlt || config.title);
    }

    let schemaScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
    if (config.schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-dynamic', 'true');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(config.schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [config]);

  return null;
}
