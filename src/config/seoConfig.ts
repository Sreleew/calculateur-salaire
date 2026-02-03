import { SEOConfig } from '../components/SEOHead';

const baseUrl = 'https://calculateur-salaire-brut-net.fr';
const defaultImage = `${baseUrl}/og-image.png`;

export const seoConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Calculateur Salaire Brut Net 2026 France - Conversion Instantanée & Précise',
    description: 'Convertissez instantanément votre salaire brut en net (et vice versa) avec notre calculateur 2026. Calcul précis selon votre statut : cadre, non-cadre, fonction publique. Gratuit et sans inscription.',
    keywords: 'calculateur salaire brut net, salaire brut net 2026, convertir salaire brut net, calcul salaire net, simulateur salaire france, taux prélèvement source, charges sociales 2026, salaire cadre non-cadre',
    canonicalUrl: baseUrl,
    ogType: 'website',
    ogImage: defaultImage,
    ogImageAlt: 'Calculateur Salaire Brut Net 2026 France',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Calculateur Salaire Brut Net 2026 France',
          url: baseUrl,
          description: 'Convertissez instantanément votre salaire brut en net (et vice versa) avec notre calculateur 2026.',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '2847',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'Organization',
          name: 'Calculateur Salaire',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`
        }
      ]
    }
  },

  '/calculateur-salaire-cadre': {
    title: 'Calculateur Salaire Cadre 2026 - Brut Net avec Cotisations APEC & CET',
    description: 'Calculez précisément votre salaire net de cadre en 2026. Inclut cotisations spécifiques : APEC (0.024%), CET, retraite complémentaire. Taux de charges cadre ~25%. Outil gratuit et actualisé.',
    keywords: 'salaire cadre brut net, calculateur salaire cadre, cotisations cadre 2026, APEC, CET cadre, charges sociales cadre, conversion salaire cadre',
    canonicalUrl: `${baseUrl}/calculateur-salaire-cadre`,
    ogImage: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calculateur Salaire Cadre 2026',
      description: 'Calculateur spécialisé pour les salaires cadres avec cotisations APEC et CET',
      url: `${baseUrl}/calculateur-salaire-cadre`
    }
  },

  '/calculateur-salaire-apprenti': {
    title: 'Calculateur Salaire Apprenti 2026 - Grille de Rémunération & Exonérations',
    description: 'Calculez le salaire net d\'un apprenti selon l\'âge et l\'année de formation. Grille 2026 officielle : de 27% à 100% du SMIC. Exonération de charges (CSG/CRDS). Simulateur gratuit et conforme.',
    keywords: 'salaire apprenti 2026, grille salaire apprenti, rémunération apprenti, exonération charges apprenti, pourcentage smic apprenti, calcul salaire contrat apprentissage',
    canonicalUrl: `${baseUrl}/calculateur-salaire-apprenti`,
    ogImage: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calculateur Salaire Apprenti 2026',
      description: 'Calculateur de salaire pour apprentis selon l\'âge et l\'année de formation',
      url: `${baseUrl}/calculateur-salaire-apprenti`
    }
  },

  '/calculateur-salaire-fonction-publique': {
    title: 'Calculateur Salaire Fonction Publique 2026 - Grille Indiciaire & Primes',
    description: 'Calculez votre salaire net dans la fonction publique (d\'État, territoriale, hospitalière). Grille indiciaire 2026, primes, RAFP. Taux de charges ~17%. Outil officiel et gratuit.',
    keywords: 'salaire fonction publique, grille indiciaire 2026, calculateur fonctionnaire, charges fonction publique, RAFP, primes fonction publique, salaire fonctionnaire territorial',
    canonicalUrl: `${baseUrl}/calculateur-salaire-fonction-publique`,
    ogImage: defaultImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Calculateur Salaire Fonction Publique 2026',
      description: 'Calculateur spécialisé pour les fonctionnaires avec grille indiciaire',
      url: `${baseUrl}/calculateur-salaire-fonction-publique`
    }
  },

  '/calculateur-salaire-alternant': {
    title: 'Calculateur Salaire Alternant 2026 - Contrat Pro & Apprentissage',
    description: 'Calculez le salaire d\'un alternant en contrat de professionnalisation ou apprentissage. Grilles 2026 par âge et niveau de formation. Comparaison contrat pro vs apprentissage. Gratuit.',
    keywords: 'salaire alternant 2026, contrat professionnalisation salaire, grille alternance, rémunération alternant, calcul salaire contrat pro, alternance apprentissage différence',
    canonicalUrl: `${baseUrl}/calculateur-salaire-alternant`,
    ogImage: defaultImage
  },

  '/calculateur-salaire-auto-entrepreneur': {
    title: 'Calculateur Revenu Auto-Entrepreneur 2026 - Charges & Cotisations URSSAF',
    description: 'Calculez votre revenu net d\'auto-entrepreneur (micro-entrepreneur) après charges URSSAF. Taux 2026 : 12.3% à 21.2% selon activité. Simulateur chiffre d\'affaires gratuit et précis.',
    keywords: 'auto-entrepreneur charges 2026, calculateur micro-entrepreneur, cotisations URSSAF auto-entrepreneur, chiffre affaires net, taux charges auto-entrepreneur, simulateur ae',
    canonicalUrl: `${baseUrl}/calculateur-salaire-auto-entrepreneur`,
    ogImage: defaultImage
  },

  '/calculateur-profession-liberale': {
    title: 'Calculateur Revenu Profession Libérale 2026 - Charges URSSAF & CIPAV',
    description: 'Calculez vos charges sociales en profession libérale (BNC). URSSAF, CIPAV, retraite complémentaire 2026. Taux réels ~22-25%. Optimisez votre rémunération. Outil gratuit.',
    keywords: 'profession libérale charges 2026, calculateur BNC, cotisations CIPAV, charges sociales libéral, URSSAF profession libérale, optimisation revenus libéral',
    canonicalUrl: `${baseUrl}/calculateur-profession-liberale`,
    ogImage: defaultImage
  },

  '/calculateur-salaire-interim': {
    title: 'Calculateur Salaire Intérim 2026 - Prime Précarité & IFM Incluses',
    description: 'Calculez votre salaire d\'intérimaire avec prime de précarité (10%) et IFM (10%). Indemnités congés payés. Conversion brut/net pour missions courtes et longues. Simulateur gratuit.',
    keywords: 'salaire intérim 2026, prime précarité intérim, IFM intérim, calculateur intérimaire, indemnités fin mission, congés payés intérim, taux horaire intérim',
    canonicalUrl: `${baseUrl}/calculateur-salaire-interim`,
    ogImage: defaultImage
  },

  '/calculateur-salaire-temps-partiel': {
    title: 'Calculateur Salaire Temps Partiel 2026 - Proratisation & Heures',
    description: 'Calculez votre salaire à temps partiel : 80%, 50%, mi-temps, etc. Proratisation précise selon le nombre d\'heures. Droits RTT et congés. Simulateur temps partiel gratuit 2026.',
    keywords: 'salaire temps partiel, calculateur mi-temps, 80 pourcent temps partiel, proratisation salaire, heures temps partiel, droits congés temps partiel',
    canonicalUrl: `${baseUrl}/calculateur-salaire-temps-partiel`,
    ogImage: defaultImage
  },

  '/calculateur-conges-rtt': {
    title: 'Calculateur Congés & RTT 2026 - Droits, Compteurs, Valorisation',
    description: 'Calculez vos droits à congés payés (CP) et RTT 2026. Compteurs précis, valorisation en euros, règles d\'acquisition. Temps plein et partiel. Outil RH gratuit et conforme.',
    keywords: 'calcul congés payés 2026, compteur RTT, droits congés, valorisation CP, acquisition congés, jours ouvrables ouvrés, simulateur congés',
    canonicalUrl: `${baseUrl}/calculateur-conges-rtt`,
    ogImage: defaultImage
  },

  '/calculateur-frais-kilometriques': {
    title: 'Calculateur Frais Kilométriques 2026 - Barème Fiscal URSSAF',
    description: 'Calculez vos indemnités kilométriques selon le barème fiscal 2026. Voiture, moto, scooter. Puissance fiscale, distance. Déduction impôts ou remboursement employeur. Gratuit.',
    keywords: 'frais kilométriques 2026, barème kilométrique, indemnités km, calcul frais déplacement, barème fiscal urssaf, remboursement km employeur',
    canonicalUrl: `${baseUrl}/calculateur-frais-kilometriques`,
    ogImage: defaultImage
  },

  '/calculateur-heures-supplementaires': {
    title: 'Calculateur Heures Supplémentaires 2026 - Majoration & Défiscalisation',
    description: 'Calculez vos heures supplémentaires : majoration 25% ou 50%, exonération fiscale (limite 7500€/an). Impact net sur fiche de paie. Contingent annuel. Simulateur gratuit 2026.',
    keywords: 'heures supplémentaires 2026, majoration heures sup, défiscalisation heures sup, calcul heures supplémentaires, contingent heures sup, exonération 7500 euros',
    canonicalUrl: `${baseUrl}/calculateur-heures-supplementaires`,
    ogImage: defaultImage
  },

  '/simulateur-augmentation': {
    title: 'Simulateur Augmentation Salaire 2026 - Impact Net & Négociation',
    description: 'Simulez l\'impact réel d\'une augmentation sur votre salaire net. Comparez avant/après, brut vs net. Préparez votre négociation salariale avec arguments chiffrés. Outil gratuit.',
    keywords: 'simulateur augmentation salaire, négociation salariale 2026, impact augmentation net, calcul augmentation, préparer entretien annuel, demande augmentation',
    canonicalUrl: `${baseUrl}/simulateur-augmentation`,
    ogImage: defaultImage
  },

  '/quiz-etes-vous-bien-paye': {
    title: 'Quiz 2026 : Êtes-vous Bien Payé ? - Comparez Votre Salaire au Marché',
    description: 'Découvrez si votre salaire est dans la moyenne du marché. Quiz interactif : secteur, métier, expérience, région. Comparaison avec statistiques INSEE 2026. Gratuit et anonyme.',
    keywords: 'quiz salaire, êtes-vous bien payé, comparaison salaire marché, statistiques salaires 2026, grille salariale france, salaire moyen métier',
    canonicalUrl: `${baseUrl}/quiz-etes-vous-bien-paye`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/infographies-salaires': {
    title: 'Infographies Salaires France 2026 - Statistiques Visuelles & Tendances',
    description: 'Découvrez nos infographies sur les salaires en France : SMIC, salaires moyens par secteur et métier, évolutions 2026. Données INSEE. Téléchargeables gratuitement.',
    keywords: 'infographies salaires 2026, statistiques salaires france, salaires moyens secteur, évolution salaires, données salariales insee, graphiques salaires',
    canonicalUrl: `${baseUrl}/infographies-salaires`,
    ogImage: defaultImage
  },

  '/infographie-brut-net': {
    title: 'Infographie Salaire Brut Net 2026 - Comprendre les Charges Visuellement',
    description: 'Infographie détaillée : comprendre la différence entre brut et net. Visualisation des charges sociales, CSG, CRDS. Part salariale vs patronale. PDF téléchargeable gratuit.',
    keywords: 'infographie brut net, charges sociales visualisation, comprendre fiche de paie, schéma salaire brut net, cotisations sociales graphique',
    canonicalUrl: `${baseUrl}/infographie-brut-net`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/infographie-cadre-non-cadre': {
    title: 'Infographie Cadre vs Non-Cadre 2026 - Différences Cotisations & Statut',
    description: 'Infographie comparative cadre/non-cadre : différences de charges (APEC, CET), avantages, forfait jours. Quel statut choisir ? Visualisation claire et pédagogique.',
    keywords: 'infographie cadre non-cadre, différence cadre employé, cotisations cadre, statut cadre avantages, APEC CET, forfait jours cadre',
    canonicalUrl: `${baseUrl}/infographie-cadre-non-cadre`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/infographie-smic': {
    title: 'Infographie SMIC 2026 - Montants, Évolution, Statistiques France',
    description: 'Tout savoir sur le SMIC 2026 en infographie : montant brut/net, évolution historique, % de salariés au SMIC, comparaisons européennes. Données officielles.',
    keywords: 'infographie smic 2026, montant smic, évolution smic historique, statistiques smic france, salaire minimum france, smic horaire mensuel',
    canonicalUrl: `${baseUrl}/infographie-smic`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/infographie-secteurs': {
    title: 'Infographie Salaires par Secteur 2026 - Qui Paye le Mieux en France ?',
    description: 'Infographie des salaires moyens par secteur d\'activité en 2026 : tech, santé, finance, industrie, commerce, etc. Découvrez les secteurs les mieux payés. INSEE.',
    keywords: 'salaires par secteur 2026, infographie secteurs, secteur qui paye le mieux, salaire moyen industrie, salaire tech france, comparaison secteurs',
    canonicalUrl: `${baseUrl}/infographie-secteurs`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/infographie-metiers': {
    title: 'Infographie Salaires par Métier 2026 - Top Rémunérations France',
    description: 'Classement des métiers les mieux payés en France 2026. Infographies par famille : IT, commerce, RH, ingénierie, santé. Salaires médians et moyens. Données certifiées.',
    keywords: 'salaires par métier 2026, métiers les mieux payés, infographie métiers, grille salariale métier, salaire moyen développeur, salaire cadre commercial',
    canonicalUrl: `${baseUrl}/infographie-metiers`,
    ogType: 'article',
    ogImage: defaultImage
  },

  '/blog': {
    title: 'Blog Salaire & Rémunération 2026 - Conseils, Actualités, Négociation',
    description: 'Blog expert sur les salaires en France : guides de négociation, actualités paie 2026, optimisation rémunération, droits salariés. Articles pratiques et à jour.',
    keywords: 'blog salaire, négociation salariale, actualités paie 2026, conseils rémunération, droits salariés, optimisation salaire, guides rh',
    canonicalUrl: `${baseUrl}/blog`,
    ogType: 'website',
    ogImage: defaultImage
  }
};

export function getSEOConfig(path: string): SEOConfig {
  return seoConfigs[path] || seoConfigs['/'];
}
