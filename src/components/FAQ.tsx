import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Comment calculer son salaire net à partir du brut en 2026 ?',
    answer: 'Pour calculer votre salaire net à partir du brut en 2026, il faut déduire les cotisations sociales (environ 22% à 25% selon votre statut) et le prélèvement à la source. Notre calculateur effectue ce calcul automatiquement en tenant compte de votre statut professionnel (cadre, non-cadre, fonction publique, etc.) et de votre situation fiscale. Le taux de cotisations varie selon votre statut : 22% pour les non-cadres, 25% pour les cadres, 17% pour la fonction publique.'
  },
  {
    question: 'Quelle est la différence entre un salaire brut et un salaire net ?',
    answer: 'Le salaire brut est le montant total avant toute déduction. Il inclut votre rémunération de base plus les éventuelles primes. Le salaire net avant impôt est ce qui reste après déduction des cotisations sociales (sécurité sociale, retraite, chômage, etc.). Le salaire net après impôt est le montant final que vous recevez sur votre compte bancaire, après le prélèvement à la source. En moyenne, le salaire net représente environ 75% à 80% du salaire brut en France.'
  },
  {
    question: 'Comment est calculé le taux de prélèvement à la source en 2026 ?',
    answer: 'Le taux de prélèvement à la source est calculé par l\'administration fiscale en fonction de vos revenus de l\'année N-1 et de votre situation familiale (nombre de parts fiscales). Il varie de 0% à 43% selon les tranches d\'imposition du barème progressif. Notre calculateur applique automatiquement le taux correspondant à votre niveau de revenu mensuel net avant impôt. Le barème 2026 comporte 19 tranches progressives, avec un seuil de non-imposition à 1 591€ mensuel.'
  },
  {
    question: 'Pourquoi le taux de charges diffère entre cadre et non-cadre ?',
    answer: 'Les cadres paient environ 3% de cotisations supplémentaires par rapport aux non-cadres. Ces cotisations additionnelles financent : l\'APEC (Association Pour l\'Emploi des Cadres) à 0.06%, la CET (Contribution Exceptionnelle Temporaire) à 0.35%, et une retraite complémentaire majorée. En contrepartie, les cadres bénéficient de meilleurs droits à la retraite, d\'une prévoyance renforcée, et de l\'accompagnement de l\'APEC pour la recherche d\'emploi et les formations.'
  },
  {
    question: 'Est-ce que le calculateur prend en compte les spécificités régionales ?',
    answer: 'Oui, notre calculateur intègre les particularités régionales françaises. L\'Alsace-Moselle a un taux de cotisations maladie majoré de 1.30% en raison du régime local spécifique. Les DOM-TOM bénéficient d\'un barème fiscal distinct avec des tranches différentes. La France métropolitaine applique le barème standard. Ces différences sont automatiquement prises en compte dans vos calculs pour une précision maximale.'
  },
  {
    question: 'Puis-je sauvegarder mes calculs de salaire ?',
    answer: 'Absolument ! Notre calculateur permet de sauvegarder jusqu\'à 10 calculs dans votre historique. Ces données sont stockées localement dans votre navigateur, garantissant la confidentialité totale de vos informations salariales. Vous pouvez également partager un calcul via un lien URL, utile pour comparer différentes offres d\'emploi ou discuter avec un recruteur. L\'historique vous permet de suivre l\'évolution de vos simulations dans le temps.'
  },
  {
    question: 'Quels statuts professionnels sont supportés par le calculateur ?',
    answer: 'Notre calculateur supporte tous les statuts professionnels français : CDI non-cadre (-22%), CDI cadre (-25%), CDI cadre supérieur (-27%), fonction publique (-17%), agent contractuel (-20%), profession libérale (-22%), auto-entrepreneur (-22%), apprenti (-9%), et stagiaire (-10%). Chaque statut a ses propres taux de cotisations sociales et fiscales, calculés avec précision selon les barèmes 2026 officiels.'
  },
  {
    question: 'Comment optimiser mon salaire net en 2026 ?',
    answer: 'Plusieurs leviers permettent d\'optimiser votre salaire net : 1) Négociez des avantages en nature (tickets restaurant, mutuelle, transport) qui sont fiscalement avantageux. 2) Profitez de l\'exonération fiscale sur les heures supplémentaires (jusqu\'à 7 500€/an). 3) Épargnez sur un PER pour réduire votre revenu imposable. 4) Optez pour les frais réels si vos dépenses professionnelles dépassent 10% de votre salaire. 5) Vérifiez votre taux de prélèvement à la source et ajustez-le si nécessaire.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      background: 'var(--bg-card)',
      borderRadius: '24px',
      padding: '2.5rem',
      border: '1px solid var(--border-color)',
      marginBottom: '2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          background: 'rgba(59, 130, 246, 0.15)',
          borderRadius: '16px',
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          ❓
        </div>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 800,
          marginBottom: '0.75rem'
        }}>
          Questions Fréquentes
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Tout ce que vous devez savoir sur le calcul du salaire brut/net en France
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: '1rem',
              background: openIndex === index ? 'var(--bg-secondary)' : 'transparent',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '1.05rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{item.question}</span>
              <span style={{
                fontSize: '1.5rem',
                color: '#3b82f6',
                transition: 'transform 0.3s ease',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                flexShrink: 0
              }}>
                +
              </span>
            </button>

            {openIndex === index && (
              <div
                style={{
                  padding: '0 1.5rem 1.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  animation: 'fadeIn 0.3s ease'
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2.5rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
        borderRadius: '16px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Vous avez d'autres questions ? Testez notre calculateur gratuit et obtenez des résultats instantanés !
        </p>
      </div>
    </section>
  );
}
