import SocialShare from '../components/SocialShare';

export default function InfographieSMIC() {
  const smicData = [
    { year: '2020', brut: '1 539€', net: '1 219€', increase: '', highlight: false },
    { year: '2021', brut: '1 554€', net: '1 231€', increase: '+1.0%', highlight: false },
    { year: '2022', brut: '1 603€', net: '1 269€', increase: '+3.2%', highlight: false },
    { year: '2023', brut: '1 709€', net: '1 353€', increase: '+6.6%', highlight: false },
    { year: '2024', brut: '1 766€', net: '1 398€', increase: '+3.3%', highlight: false },
    { year: '2025', brut: '1 802€', net: '1 427€', increase: '+2.0%', highlight: false },
    { year: '2026', brut: '1 840€', net: '1 457€', increase: '+2.1%', highlight: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Évolution du SMIC 2020-2026
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suivez la progression du salaire minimum en France sur 7 ans
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="space-y-6">
              {smicData.map((item, index) => (
                <div
                  key={index}
                  className={`relative ${item.highlight ? 'ring-4 ring-green-500 rounded-xl' : ''}`}
                >
                  <div className={`flex items-center gap-6 p-6 rounded-xl transition-all ${
                    item.highlight
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="w-24 text-center flex-shrink-0">
                      <div className={`text-3xl font-bold ${item.highlight ? 'text-green-600' : 'text-gray-900'}`}>
                        {item.year}
                      </div>
                      {item.increase && (
                        <div className={`text-sm font-semibold mt-1 ${
                          item.highlight ? 'text-green-700' : 'text-green-600'
                        }`}>
                          {item.increase}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-100 rounded-lg p-5 border-2 border-blue-300">
                        <div className="text-sm text-gray-700 mb-2 uppercase tracking-wide font-medium">
                          Brut mensuel
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-blue-700">
                          {item.brut}
                        </div>
                      </div>

                      <div className="bg-green-100 rounded-lg p-5 border-2 border-green-300">
                        <div className="text-sm text-gray-700 mb-2 uppercase tracking-wide font-medium">
                          Net mensuel
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-green-700">
                          {item.net}
                        </div>
                      </div>
                    </div>

                    {item.highlight && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        2026
                      </div>
                    )}
                  </div>

                  {index < smicData.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-1 h-6 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyse de l'évolution</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3 text-green-900">Hausse totale 2020-2026</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Salaire brut</div>
                  <div className="text-2xl font-bold text-green-700">+301 € (+19.6%)</div>
                  <div className="text-sm text-gray-600 mt-1">De 1 539 € à 1 840 €</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Salaire net</div>
                  <div className="text-2xl font-bold text-green-700">+238 € (+19.5%)</div>
                  <div className="text-sm text-gray-600 mt-1">De 1 219 € à 1 457 €</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3 text-blue-900">Points clés</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📊</span>
                  <div>
                    <strong>2023 : Année record</strong> - La plus forte hausse avec +6.6% pour compenser l'inflation
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">💰</span>
                  <div>
                    <strong>SMIC 2026 : 1 840 € brut</strong> - Soit 1 457 € net mensuel ou 17 484 € net annuel
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📈</span>
                  <div>
                    <strong>Hausse moyenne</strong> - +3.1% par an sur la période 2020-2026
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">⏰</span>
                  <div>
                    <strong>Taux horaire 2026</strong> - 12.40 € brut de l'heure (35h/semaine)
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-bold text-lg mb-3 text-amber-900">Qui est concerné ?</h3>
              <p>
                Le SMIC concerne <strong>environ 2.5 millions de salariés</strong> en France. Il est revalorisé
                automatiquement chaque année en fonction de l'inflation et de la moitié du gain de pouvoir d'achat
                du salaire horaire moyen.
              </p>
              <p className="mt-3">
                Si votre salaire est proche du SMIC, des <strong>revalorisations supplémentaires</strong> peuvent
                intervenir en cours d'année si l'inflation dépasse 2%.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SocialShare
            title="Évolution du SMIC 2020-2026"
            text="Découvrez la progression du salaire minimum en France sur 7 ans"
          />
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg text-lg"
          >
            Calculer mon salaire net
          </a>
        </div>
      </div>
    </div>
  );
}
