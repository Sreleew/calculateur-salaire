import { BlogPostData } from '../components/BlogPost';

export const blogPosts: BlogPostData[] = [
  {
    id: '1',
    title: 'Comment négocier son salaire en 2026 : Guide complet',
    slug: 'comment-negocier-salaire-2026',
    excerpt: 'Découvrez les meilleures stratégies pour négocier votre salaire brut et maximiser votre rémunération nette. Techniques éprouvées et erreurs à éviter.',
    content: `
      <h2>Pourquoi bien négocier son salaire est crucial</h2>
      <p>La négociation salariale est un moment décisif dans votre carrière. Une différence de 10% de salaire brut initial peut représenter plus de 100 000€ sur 20 ans de carrière.</p>

      <h3>1. Préparez-vous en amont</h3>
      <p>Avant toute négociation, utilisez notre calculateur pour connaître précisément votre salaire net selon différents montants brut. Connaître les chiffres exacts vous donne un avantage considérable.</p>

      <ul>
        <li><strong>Recherchez les salaires du marché</strong> : Consultez les grilles salariales de votre secteur</li>
        <li><strong>Calculez votre valeur</strong> : Additionnez vos compétences, expériences et certifications</li>
        <li><strong>Anticipez les contre-propositions</strong> : Préparez 3 scénarios (minimum acceptable, cible, idéal)</li>
      </ul>

      <h3>2. Négociez toujours en brut annuel</h3>
      <p>C'est la règle d'or. Pourquoi ? Parce que les employeurs pensent en brut annuel, et que cela facilite les comparaisons. Un salaire mensuel de 3 000€ brut représente 36 000€ annuel - mais pensez aussi aux primes et avantages.</p>

      <h3>3. N'oubliez pas les avantages en nature</h3>
      <p>Parfois, une augmentation de salaire n'est pas possible immédiatement. Négociez alors :</p>
      <ul>
        <li>Tickets restaurant (avantage fiscal important)</li>
        <li>Mutuelle premium</li>
        <li>Télétravail (économie de transport)</li>
        <li>Formation professionnelle</li>
        <li>Jours de congés supplémentaires</li>
      </ul>

      <h3>4. Le bon moment pour négocier</h3>
      <p>Le timing est essentiel. Les meilleurs moments sont :</p>
      <ul>
        <li>Lors de l'embauche (avant de signer)</li>
        <li>Entretien annuel d'évaluation</li>
        <li>Après un succès majeur dans votre travail</li>
        <li>Lors d'un changement de poste en interne</li>
      </ul>

      <h3>5. Les erreurs fatales à éviter</h3>
      <p><strong>Ne mentez jamais</strong> sur votre salaire actuel. Les entreprises vérifient de plus en plus. Restez honnête mais stratégique.</p>
      <p><strong>Ne vous justifiez pas</strong> par vos besoins personnels (crédit, famille). Argumentez sur votre valeur professionnelle.</p>
      <p><strong>Ne dites jamais "oui" immédiatement</strong> à une première offre. Prenez 24-48h pour réfléchir, même si l'offre vous convient.</p>

      <h3>Calculez votre salaire net immédiatement</h3>
      <p>Utilisez notre calculateur pour simuler différents scénarios avant votre négociation. Vous saurez exactement ce que chaque proposition représente en net après impôts.</p>
    `,
    author: 'Sophie Martin',
    publishDate: '15 janvier 2026',
    readTime: '8 min',
    category: 'Négociation',
    tags: ['négociation', 'salaire', 'carrière', 'augmentation', 'stratégie']
  },
  {
    id: '2',
    title: 'Cadre vs Non-Cadre : Quelle différence sur votre salaire net ?',
    slug: 'cadre-non-cadre-difference-salaire',
    excerpt: 'Analyse détaillée des différences de cotisations entre statut cadre et non-cadre. Découvrez quel statut est le plus avantageux selon votre situation.',
    content: `
      <h2>Comprendre les statuts professionnels en France</h2>
      <p>Le choix entre statut cadre et non-cadre a un impact significatif sur votre salaire net. Décortiquons les différences concrètes.</p>

      <h3>Les cotisations supplémentaires des cadres</h3>
      <p>Un cadre paie en moyenne <strong>3% de cotisations supplémentaires</strong> par rapport à un non-cadre :</p>
      <ul>
        <li><strong>APEC</strong> : 0.06% (employeur + salarié)</li>
        <li><strong>CET</strong> : 0.35% (Contribution Exceptionnelle Temporaire)</li>
        <li><strong>Retraite complémentaire majorée</strong> sur les tranches supérieures</li>
      </ul>

      <h3>Exemple concret avec 3000€ brut mensuel</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
        <thead>
          <tr style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-color);">
            <th style="padding: 1rem; text-align: left;">Statut</th>
            <th style="padding: 1rem; text-align: right;">Cotisations</th>
            <th style="padding: 1rem; text-align: right;">Net avant impôt</th>
            <th style="padding: 1rem; text-align: right;">Net après impôt</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 1rem;">Non-cadre</td>
            <td style="padding: 1rem; text-align: right;">22%</td>
            <td style="padding: 1rem; text-align: right;">2 340€</td>
            <td style="padding: 1rem; text-align: right;">2 106€</td>
          </tr>
          <tr>
            <td style="padding: 1rem;">Cadre</td>
            <td style="padding: 1rem; text-align: right;">25%</td>
            <td style="padding: 1rem; text-align: right;">2 250€</td>
            <td style="padding: 1rem; text-align: right;">2 025€</td>
          </tr>
        </tbody>
      </table>
      <p><em>Différence mensuelle : environ 80€ net sur 3000€ brut</em></p>

      <h3>Les avantages du statut cadre</h3>
      <p>Malgré les cotisations plus élevées, le statut cadre offre des avantages significatifs :</p>
      <ul>
        <li><strong>Meilleure retraite</strong> : Les cotisations supplémentaires améliorent votre pension</li>
        <li><strong>Prestations sociales supérieures</strong> : Prévoyance, garantie décès</li>
        <li><strong>Accompagnement APEC</strong> : Aide à la recherche d'emploi, formations</li>
        <li><strong>Statut social</strong> : Reconnaissance et évolutions de carrière</li>
        <li><strong>Forfait jours</strong> : Plus de flexibilité (selon les accords)</li>
      </ul>

      <h3>Quand le statut cadre devient rentable ?</h3>
      <p>Le statut cadre devient particulièrement intéressant au-delà de <strong>40 000€ brut annuel</strong>, car les avantages (retraite, prévoyance, APEC) compensent largement les cotisations supplémentaires.</p>

      <h3>Utilisez notre calculateur pour comparer</h3>
      <p>Simulez les deux statuts avec votre salaire actuel pour voir la différence exacte sur votre situation personnelle.</p>
    `,
    author: 'Thomas Dubois',
    publishDate: '12 janvier 2026',
    readTime: '6 min',
    category: 'Statuts',
    tags: ['cadre', 'non-cadre', 'statut', 'cotisations', 'comparaison']
  },
  {
    id: '3',
    title: 'Prélèvement à la source 2026 : Tout ce qui change',
    slug: 'prelevement-source-2026-changements',
    excerpt: 'Les nouvelles tranches d\'imposition 2026 et leur impact sur votre salaire net. Guide complet avec exemples concrets et stratégies d\'optimisation.',
    content: `
      <h2>Les nouveautés fiscales 2026</h2>
      <p>Le barème du prélèvement à la source évolue chaque année. Voici ce qui change en 2026 et comment optimiser votre situation.</p>

      <h3>Le nouveau barème 2026</h3>
      <p>Les tranches d'imposition sont revalorisées pour suivre l'inflation :</p>
      <ul>
        <li><strong>0% jusqu'à 1 591€</strong> de revenu mensuel net</li>
        <li><strong>0.5% à 43%</strong> selon 19 tranches progressives</li>
        <li>Seuil maximal inchangé à 43%</li>
      </ul>

      <h3>Impact sur votre salaire net</h3>
      <p>Pour un salaire de 2500€ net avant impôt :</p>
      <ul>
        <li>Taux applicable : <strong>5.3%</strong></li>
        <li>Prélèvement mensuel : <strong>132.50€</strong></li>
        <li>Net après impôt : <strong>2 367.50€</strong></li>
      </ul>

      <h3>Comment réduire votre taux de prélèvement</h3>
      <p>Plusieurs leviers existent pour optimiser votre imposition :</p>

      <h4>1. Les frais réels</h4>
      <p>Si vos frais professionnels dépassent l'abattement de 10%, optez pour les frais réels : transport, repas, matériel, formation...</p>

      <h4>2. L'épargne retraite</h4>
      <p>Les versements sur un PER (Plan Épargne Retraite) sont déductibles du revenu imposable, réduisant ainsi votre taux de prélèvement.</p>

      <h4>3. Les heures supplémentaires</h4>
      <p>Exonérées d'impôt jusqu'à 7 500€ par an ! Un levier puissant pour augmenter votre net.</p>

      <h3>Le taux personnalisé : faut-il l'activer ?</h3>
      <p>Vous pouvez modifier votre taux si :</p>
      <ul>
        <li>Vos revenus ont significativement changé</li>
        <li>Votre situation familiale a évolué</li>
        <li>Vous souhaitez éviter un remboursement important</li>
      </ul>

      <h3>Simulez votre prélèvement à la source</h3>
      <p>Notre calculateur intègre automatiquement le barème 2026. Testez différents scénarios pour optimiser votre rémunération nette.</p>
    `,
    author: 'Marie Lefevre',
    publishDate: '8 janvier 2026',
    readTime: '7 min',
    category: 'Fiscalité',
    tags: ['impôts', 'prélèvement source', '2026', 'fiscalité', 'optimisation']
  }
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPostData[] {
  return blogPosts.filter(post => post.category === category);
}
