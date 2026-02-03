import SocialShare from '../components/SocialShare';
import { TrendingUp, Briefcase } from 'lucide-react';

export default function InfographieSecteurs() {
  const sectors = [
    { sector: 'Tech / IT', salary: '45 000€', percentage: 100, color: 'from-blue-500 to-blue-600', icon: '💻' },
    { sector: 'Finance / Banque', salary: '42 000€', percentage: 93, color: 'from-green-500 to-green-600', icon: '💰' },
    { sector: 'Conseil', salary: '40 000€', percentage: 89, color: 'from-purple-500 to-purple-600', icon: '📊' },
    { sector: 'Santé', salary: '38 000€', percentage: 84, color: 'from-red-500 to-red-600', icon: '⚕️' },
    { sector: 'Industrie', salary: '35 000€', percentage: 78, color: 'from-gray-500 to-gray-600', icon: '⚙️' },
    { sector: 'Commerce', salary: '32 000€', percentage: 71, color: 'from-orange-500 to-orange-600', icon: '🛒' },
    { sector: 'Hôtellerie / Restauration', salary: '28 000€', percentage: 62, color: 'from-amber-500 to-amber-600', icon: '🍽️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Salaire Moyen par Secteur 2026
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comparez les rémunérations selon les secteurs d'activité en France
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={32} />
                <div>
                  <div className="text-sm opacity-90">Salaire annuel brut moyen</div>
                  <div className="text-3xl font-bold">37 500 €</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Écart max</div>
                <div className="text-2xl font-bold">17 000 €</div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="space-y-4">
              {sectors.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-300 group"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl text-gray-800">{item.sector}</h3>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">{item.salary}</div>
                          <div className="text-xs text-gray-500">brut/an</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-4 rounded-full transition-all duration-1000 ease-out relative group-hover:scale-x-105`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {index === 0 && '🥇 Secteur le mieux payé'}
                      {index === Math.floor(sectors.length / 2) && '📊 Moyenne nationale'}
                      {index === sectors.length - 1 && '⚠️ Secteur le moins rémunéré'}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {(parseInt(item.salary.replace(/[^0-9]/g, '')) / 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €/mois
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Top 3 Secteurs</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold">💻 Tech / IT</span>
                <span className="text-blue-600 font-bold">45 000 €</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-semibold">💰 Finance / Banque</span>
                <span className="text-green-600 font-bold">42 000 €</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-semibold">📊 Conseil</span>
                <span className="text-purple-600 font-bold">40 000 €</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Points clés</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📈</span>
                <div>
                  <strong>Écart significatif</strong> - 61% d'écart entre le secteur le mieux et le moins payé
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">💼</span>
                <div>
                  <strong>Tech en tête</strong> - Le secteur IT offre les meilleurs salaires d'entrée
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🎓</span>
                <div>
                  <strong>Formation = Salaire</strong> - Les secteurs très qualifiés paient mieux
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyse détaillée</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les écarts de salaire entre secteurs s'expliquent par plusieurs facteurs :
              <strong> niveau de qualification requis, rentabilité du secteur, tension sur le marché de l'emploi</strong>,
              et complexité des missions.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3 text-blue-900">Pourquoi la Tech paie-t-elle mieux ?</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Forte demande et pénurie de talents qualifiés</li>
                <li>Secteur à forte valeur ajoutée et rentabilité élevée</li>
                <li>Innovation constante nécessitant des compétences pointues</li>
                <li>Compétition internationale pour attirer les meilleurs profils</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-bold text-lg mb-3 text-amber-900">Attention aux moyennes</h3>
              <p>
                Ces chiffres sont des <strong>moyennes nationales</strong>. Votre salaire peut varier
                considérablement selon : votre expérience, votre localisation (Paris vs Province),
                la taille de l'entreprise, et votre niveau de responsabilité.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SocialShare
            title="Salaire Moyen par Secteur 2026"
            text="Comparez les rémunérations selon les secteurs d'activité en France"
          />
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
          >
            Calculer mon salaire net
          </a>
        </div>
      </div>
    </div>
  );
}
