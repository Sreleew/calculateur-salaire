# Guide de Publication - Calculateur Salaire Brut Net 2026

## Ce qui a été implémenté

Votre site est maintenant complètement préparé pour la publication et le référencement SEO. Voici tout ce qui a été ajouté :

### 1. SEO & Référencement ✅

- **Meta tags complets** (title, description, keywords, author, robots)
- **Open Graph** pour Facebook (partage social optimisé)
- **Twitter Cards** (apparence optimisée sur Twitter)
- **Schema.org JSON-LD** (WebApplication, FAQPage, BreadcrumbList, Organization)
- **Canonical URL** et tags géographiques (France)
- **robots.txt** configuré
- **sitemap.xml** prêt à l'emploi
- **FAQ visible** avec structured data pour rich snippets Google

### 2. Fichiers Essentiels ✅

- `robots.txt` - Instructions pour les crawlers
- `sitemap.xml` - Plan du site pour Google
- `manifest.json` - Configuration PWA
- `favicon.svg` - Icône optimisée

### 3. Blog & Contenu ✅

- Structure de blog complète avec 3 articles SEO-optimisés :
  - "Comment négocier son salaire en 2026"
  - "Cadre vs Non-Cadre : différences sur le salaire"
  - "Prélèvement à la source 2026"
- Navigation fluide entre calculateur et blog
- Design moderne et responsive

### 4. Monétisation & Analytics ✅

- Composant AdSense prêt à l'emploi (emplacements stratégiques)
- Google Analytics placeholder (commenté dans index.html)
- Cookie Consent RGPD complet (3 niveaux de consentement)
- Respect de la vie privée des utilisateurs

### 5. Performance & Accessibilité ✅

- Animations CSS optimisées
- Mode "prefers-reduced-motion" pour l'accessibilité
- Font smoothing
- Structure sémantique HTML5
- Responsive design

---

## Étapes pour Publier le Site

### Étape 1 : Configuration Google Analytics

1. Créez un compte Google Analytics : https://analytics.google.com
2. Créez une propriété pour votre site
3. Obtenez votre ID de mesure (format : G-XXXXXXXXXX)
4. Dans `index.html`, décommentez et remplacez :

```html
<!-- Remplacez G-XXXXXXXXXX par votre vrai ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Étape 2 : Configuration Google AdSense

1. Créez un compte AdSense : https://www.google.com/adsense
2. Soumettez votre site pour approbation
3. Une fois approuvé, obtenez :
   - Votre ID Publisher (ca-pub-XXXXXXXXXXXXXXXX)
   - Vos slots publicitaires

4. Mettez à jour les emplacements AdSense :
   - Dans `src/components/AdSenseBlock.tsx` : ligne 48
   - Dans `src/components/BlogPost.tsx` : ligne 95
   - Dans `src/App.tsx` : ligne 949

Remplacez les valeurs par défaut :
```tsx
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Votre ID
data-ad-slot="1234567890"  // Votre slot ID
```

5. Ajoutez le script AdSense dans `index.html` (après `</head>`) :
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### Étape 3 : Mettre à Jour les URLs

Dans plusieurs fichiers, remplacez les URLs de placeholder :

1. **index.html** (lignes 14, 23, 27, 35, 38) :
   - `https://calculateur-salaire-brut-net.fr/` → Votre vraie URL

2. **public/sitemap.xml** (toutes les balises `<loc>`) :
   - Même chose

3. **public/robots.txt** (ligne 6) :
   - Mettre à jour l'URL du sitemap

### Étape 4 : Créer les Images Manquantes

Créez ces images pour optimiser le SEO :

1. **og-image.png** (1200x630px) - Pour Open Graph
2. **twitter-card.png** (1200x628px) - Pour Twitter
3. **logo.png** - Logo de votre site
4. **icon-192.png** et **icon-512.png** - Pour PWA
5. **apple-touch-icon.png** (180x180px) - Pour iOS
6. **favicon-32x32.png** et **favicon-16x16.png**

Placez-les dans le dossier `public/`

### Étape 5 : Hébergement et Déploiement

#### Option A : Netlify (Recommandé - Gratuit)

1. Créez un compte sur https://netlify.com
2. Connectez votre repository GitHub
3. Configuration build :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Configurez votre domaine personnalisé
5. Activez HTTPS automatique

#### Option B : Vercel (Gratuit aussi)

1. Créez un compte sur https://vercel.com
2. Importez votre projet
3. Configuration automatique pour Vite
4. Ajoutez votre domaine

#### Option C : Hébergement traditionnel

1. Exécutez `npm run build`
2. Uploadez le contenu du dossier `dist/` sur votre serveur
3. Configurez votre serveur web (Apache/Nginx)

### Étape 6 : Configuration DNS & Domaine

1. Achetez un nom de domaine (ex: OVH, Namecheap, GoDaddy)
2. Configurez les DNS selon votre hébergeur
3. Activez HTTPS (Let's Encrypt si hébergement perso)

### Étape 7 : Soumettre aux Moteurs de Recherche

#### Google Search Console

1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété (domaine)
3. Vérifiez la propriété
4. Soumettez votre sitemap : `https://votre-site.fr/sitemap.xml`
5. Demandez l'indexation de vos pages principales

#### Bing Webmaster Tools

1. https://www.bing.com/webmasters
2. Même processus que Google

### Étape 8 : Optimisation SEO Continue

#### Créer du Contenu Régulièrement

Ajoutez de nouveaux articles dans `src/data/blogPosts.ts` :

```typescript
{
  id: '4',
  title: 'Votre nouveau titre',
  slug: 'votre-slug-url',
  excerpt: 'Court résumé...',
  content: `<h2>Votre contenu HTML</h2><p>...</p>`,
  author: 'Votre nom',
  publishDate: 'Date',
  readTime: '5 min',
  category: 'Catégorie',
  tags: ['tag1', 'tag2']
}
```

#### Mots-clés à Cibler

Créez des articles autour de ces requêtes populaires :
- "salaire brut net 2026"
- "calculer salaire net"
- "différence cadre non-cadre"
- "prélèvement source 2026"
- "charges sociales france"
- "optimiser salaire net"
- "négocier salaire"
- "avantages en nature"

#### Backlinks

- Proposez des articles invités sur des blogs RH
- Inscrivez-vous sur des annuaires spécialisés
- Partagez sur les réseaux sociaux professionnels (LinkedIn)
- Participez aux forums (LesArnaques, HFR)

### Étape 9 : Monitoring & Analytics

Une fois publié, surveillez :

1. **Google Analytics** : Trafic, pages vues, durée des sessions
2. **Search Console** : Impressions, clics, position moyenne
3. **AdSense** : Revenus, CTR, RPM
4. **PageSpeed Insights** : Performance (visez 90+)

### Étape 10 : Améliorations Futures

#### Features à ajouter progressivement :

1. **Comparateur de plusieurs offres** (tableau comparatif)
2. **Export PDF** des calculs
3. **Simulateur de négociation** salariale
4. **Newsletter** pour fidéliser
5. **Outil de calcul des heures sup**
6. **Simulateur PER** (Plan Épargne Retraite)
7. **API publique** pour développeurs

#### SEO Avancé :

1. **Internal linking** : Liez les articles entre eux
2. **Featured snippets** : Optimisez pour les positions 0
3. **Local SEO** : Si vous ciblez une région
4. **Video content** : Tutoriels YouTube
5. **Infographies** partageables

---

## Structure du Projet

```
project/
├── public/
│   ├── robots.txt           # Configuration crawlers
│   ├── sitemap.xml          # Plan du site
│   ├── manifest.json        # PWA config
│   └── favicon.svg          # Icône
├── src/
│   ├── components/
│   │   ├── CookieConsent.tsx    # RGPD
│   │   ├── AdSenseBlock.tsx     # Publicités
│   │   ├── FAQ.tsx              # Questions fréquentes
│   │   ├── BlogList.tsx         # Liste articles
│   │   └── BlogPost.tsx         # Article individuel
│   ├── data/
│   │   └── blogPosts.ts         # Contenu blog
│   ├── App.tsx              # Application principale
│   ├── App.css              # Styles
│   └── main.tsx             # Point d'entrée
├── index.html               # HTML avec meta tags SEO
└── package.json
```

---

## Checklist Avant Publication

- [ ] Google Analytics configuré
- [ ] Google AdSense configuré et approuvé
- [ ] Toutes les URLs mises à jour
- [ ] Images OG et favicons créées
- [ ] Domaine acheté et configuré
- [ ] Site hébergé et accessible
- [ ] HTTPS activé
- [ ] Sitemap soumis à Google/Bing
- [ ] Cookie consent testé
- [ ] Site responsive testé (mobile/tablet/desktop)
- [ ] Performance vérifiée (PageSpeed)
- [ ] Premier article publié

---

## Support & Maintenance

### Mise à jour des taux 2027

Quand les nouveaux taux seront publiés :

1. Mettez à jour `src/App.tsx` :
   - Constantes (PLAFOND_SS_MENSUEL, SMIC_MENSUEL, etc.)
   - TAX_BRACKETS pour le nouveau barème
   - COTISATIONS si les taux changent

2. Mettez à jour les meta tags (année 2027)
3. Ajoutez un article de blog "Taux 2027"

### Questions Fréquentes

**Q : Combien de temps avant d'être indexé par Google ?**
R : Entre 1 jour et 2 semaines. Utilisez "Demander une indexation" dans Search Console.

**Q : Combien peut-on gagner avec AdSense ?**
R : Variable selon le trafic. Avec 10 000 visites/mois, comptez 50-200€/mois.

**Q : Comment augmenter le trafic ?**
R : Publiez 2-3 articles SEO par mois, optimisez pour les mots-clés longue traîne, créez des backlinks.

---

## Ressources Utiles

- **Google Search Console** : https://search.google.com/search-console
- **Google Analytics** : https://analytics.google.com
- **Google AdSense** : https://adsense.google.com
- **PageSpeed Insights** : https://pagespeed.web.dev
- **Ubersuggest** (mots-clés) : https://neilpatel.com/ubersuggest
- **Answer The Public** : https://answerthepublic.com
- **URSSAF** (taux officiels) : https://www.urssaf.fr

---

**Bravo ! Votre site est prêt pour le succès. Bon courage pour la publication !** 🚀
