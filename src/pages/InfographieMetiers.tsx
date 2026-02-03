import SocialShare from '../components/SocialShare';
import { Award, TrendingUp } from 'lucide-react';

export default function InfographieMetiers() {
  const topJobs = [
    { rank: 1, job: 'Directeur Général', salary: '120 000€', icon: '👔', color: 'from-yellow-400 to-yellow-600' },
    { rank: 2, job: 'Médecin spécialiste', salary: '95 000€', icon: '⚕️', color: 'from-gray-300 to-gray-400' },
    { rank: 3, job: 'Architecte IT', salary: '75 000€', icon: '💻', color: 'from-orange-400 to-orange-600' },
    { rank: 4, job: 'Avocat d\'affaires', salary: '70 000€', icon: '⚖️', color: 'from-blue-400 to-blue-600' },
    { rank: 5, job: 'Directeur Marketing', salary: '68 000€', icon: '📊', color: 'from-purple-400 to-purple-600' },
    { rank: 6, job: 'Data Scientist', salary: '65 000€', icon: '📈', color: 'from-green-400 to-green-600' },
    { rank: 7, job: 'Ingénieur DevOps', salary: '58 000€', icon: '⚙️', color: 'from-red-400 to-red-600' },
    { rank: 8, job: 'Chef de projet IT', salary: '55 000€', icon: '🎯', color: 'from-indigo-400 to-indigo-600' },
    { rank: 9, job: 'Directeur Commercial', salary: '52 000€', icon: '💼', color: 'from-teal-400 to-teal-600' },
    { rank: 10, job: 'Expert-comptable', salary: '50 000€', icon: '🧮', color: 'from-pink-400 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="text-yellow-600" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Top 10 Métiers les Mieux Payés 2026
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Classement des professions avec les plus hauts salaires en France
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-2xl mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <TrendingUp size={32} />
              </div>
              <div>
                <div className="text-sm opacity-90">Salaire moyen Top 10</div>
                <div className="text-3xl font-bold">70 900 €</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Soit en net mensuel</div>
              <div className="text-2xl font-bold">≈ 4 420 €</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="space-y-4">
              {topJobs.map((item) => (
                <div
                  key={item.rank}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-yellow-400 group relative overflow-hidden"
                >
                  {item.rank <= 3 && (
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`}></div>
                  )}

                  <div className="flex items-center gap-6 relative">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                      #{item.rank}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{item.icon}</span>
                        <h3 className="font-bold text-xl text-gray-800">{item.job}</h3>
                      </div>
                      <div className="text-sm text-gray-500">Salaire moyen annuel brut</div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">{item.salary}</div>
                      <div className="text-sm text-gray-500">
                        ≈ {(parseInt(item.salary.replace(/[^0-9]/g, '')) * 0.75 / 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} € net/mois
                      </div>
                    </div>
                  </div>

                  {item.rank === 1 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <span className="text-sm text-yellow-800">
                        🏆 <strong>Métier le mieux rémunéré</strong> - Responsabilité maximale et vision stratégique
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🥇</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">Top 3</h3>
            </div>
            <div className="text-center text-gray-600">
              <div className="text-3xl font-bold text-yellow-600 mb-1">95 000 €</div>
              <div className="text-sm">Salaire moyen</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">Tech dominante</h3>
            </div>
            <div className="text-center text-gray-600">
              <div className="text-3xl font-bold text-blue-600 mb-1">4/10</div>
              <div className="text-sm">Métiers IT dans le Top 10</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">Progression</h3>
            </div>
            <div className="text-center text-gray-600">
              <div className="text-3xl font-bold text-green-600 mb-1">+15%</div>
              <div className="text-sm">Hausse moyenne depuis 2020</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyse détaillée</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3 text-blue-900">Pourquoi ces métiers paient-ils autant ?</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Niveau de responsabilité élevé</strong> - Décisions stratégiques impactant toute l'entreprise</li>
                <li><strong>Formation longue et coûteuse</strong> - Bac+5 à Bac+8 minimum requis</li>
                <li><strong>Compétences rares</strong> - Expertise technique ou managériale difficile à trouver</li>
                <li><strong>Pression et stress importants</strong> - Horaires étendus et forte charge mentale</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-lg mb-3 text-purple-900">La Tech omniprésente</h3>
              <p>
                <strong>4 métiers sur 10</strong> sont liés à l'informatique (Architecte IT, Data Scientist, DevOps, Chef de projet IT).
                La transformation numérique des entreprises crée une demande explosive pour ces profils,
                tirant les salaires vers le haut.
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-bold text-lg mb-3 text-amber-900">Comment accéder à ces métiers ?</h3>
              <div className="space-y-3">
                <div>
                  <strong>Directeur Général / Marketing / Commercial :</strong> Grande école de commerce + 10-15 ans d'expérience
                </div>
                <div>
                  <strong>Médecin spécialiste :</strong> 10-12 ans d'études médicales + spécialisation
                </div>
                <div>
                  <strong>Métiers Tech :</strong> École d'ingénieur ou Master + 5-10 ans d'expérience
                </div>
                <div>
                  <strong>Avocat d'affaires :</strong> Master 2 Droit + CAPA + 5-8 ans d'expérience
                </div>
                <div>
                  <strong>Expert-comptable :</strong> DSCG + 3 ans de stage + DEC
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3 text-green-900">Réalité vs Moyenne</h3>
              <p>
                Ces chiffres sont des <strong>moyennes nationales</strong>. À Paris, ajoutez 20-30% minimum.
                En début de carrière, divisez par 2. Avec 15 ans d'expérience en région parisienne
                et dans une grande entreprise, ces salaires peuvent être multipliés par 2.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SocialShare
            title="Top 10 Métiers les Mieux Payés 2026"
            text="Découvrez le classement des professions avec les plus hauts salaires en France"
          />
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all shadow-lg text-lg"
          >
            Calculer mon salaire net
          </a>
        </div>
      </div>
    </div>
  );
}
