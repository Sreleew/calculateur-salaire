import SalaryIncreaseSimulator from '../components/SalaryIncreaseSimulator';
import { TrendingUp } from 'lucide-react';

export default function SimulateurAugmentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="text-blue-400" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Simulateur d'Augmentation
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Calculez l'impact réel d'une augmentation sur votre salaire net
          </p>
        </div>

        <SalaryIncreaseSimulator />

        <div className="mt-12 bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            Comment négocier une augmentation ?
          </h2>

          <div className="space-y-6 text-slate-300">
            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3 text-blue-300">1. Préparez votre dossier</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Listez vos réalisations et résultats concrets des 12 derniers mois</li>
                <li>Documentez vos nouvelles responsabilités et compétences acquises</li>
                <li>Recherchez les salaires du marché pour votre poste (utilisez notre quiz !)</li>
                <li>Préparez des chiffres précis : évitez le flou</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3 text-green-300">2. Choisissez le bon moment</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Idéal :</strong> Entretien annuel d'évaluation</li>
                <li><strong>Bon :</strong> Après un succès majeur ou nouveau projet</li>
                <li><strong>À éviter :</strong> Période de difficultés de l'entreprise</li>
                <li>Prenez rendez-vous à l'avance, ne le demandez pas à l'improviste</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-lg mb-3 text-purple-300">3. Quelle augmentation demander ?</h3>
              <div className="space-y-3">
                <div>
                  <strong>3-5% :</strong> Augmentation normale en période stable, suit l'inflation
                </div>
                <div>
                  <strong>7-10% :</strong> Bonnes performances, nouvelles responsabilités
                </div>
                <div>
                  <strong>10-15% :</strong> Performances exceptionnelles ou rattrapage salarial important
                </div>
                <div>
                  <strong>+15% :</strong> Promotion ou changement significatif de poste
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-bold text-lg mb-3 text-orange-300">4. Pendant l'entretien</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Commencez par présenter vos réalisations factuelles</li>
                <li>Exprimez votre engagement et motivation pour l'entreprise</li>
                <li>Annoncez le montant précis souhaité en <strong>brut annuel</strong></li>
                <li>Soyez prêt à négocier : avantages, primes, télétravail</li>
                <li>Si refus : demandez un plan d'évolution avec date de révision</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-lg mb-3 text-red-300">5. Si la réponse est négative</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Demandez les raisons précises du refus</li>
                <li>Négociez des objectifs clairs pour obtenir l'augmentation dans 6 mois</li>
                <li>Obtenez un engagement écrit avec date de révision</li>
                <li>Si refus persistant malgré le marché : explorez les opportunités externes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border border-slate-700">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-lg mb-2 text-white">Astuce</h3>
            <p className="text-slate-400 text-sm">
              Demandez toujours 10-20% de plus que votre objectif réel. La négociation vous ramènera au bon montant.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border border-slate-700">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2 text-white">Données</h3>
            <p className="text-slate-400 text-sm">
              En moyenne, les augmentations accordées sont de 3-4% en France. Avec une bonne préparation, visez 5-7%.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-center border border-slate-700">
            <div className="text-4xl mb-3">⏰</div>
            <h3 className="font-bold text-lg mb-2 text-white">Fréquence</h3>
            <p className="text-slate-400 text-sm">
              Une augmentation annuelle est normale. Sans augmentation 2 ans d'affilée, cherchez ailleurs.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            Calculer mon salaire net
          </a>
        </div>
      </div>
    </div>
  );
}
