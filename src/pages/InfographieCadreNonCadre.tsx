import SocialShare from '../components/SocialShare';

export default function InfographieCadreNonCadre() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cadre vs Non-Cadre : le vrai coût
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comparaison complète des cotisations et avantages entre statut cadre et non-cadre en 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Non-Cadre</h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Cotisations sociales</div>
                    <div className="text-4xl font-bold text-gray-900">≈ 22%</div>
                    <div className="mt-2 text-sm text-gray-600">Du salaire brut</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Salaire net</div>
                    <div className="text-4xl font-bold text-green-600">≈ 78%</div>
                    <div className="mt-2 text-sm text-gray-600">Du salaire brut</div>
                  </div>

                  <div className="pt-6 border-t-2 border-blue-200">
                    <h3 className="font-bold text-lg mb-4 text-blue-900">Avantages</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">35 heures par semaine</div>
                          <div className="text-sm text-gray-600">Horaires fixes et contrôlés</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Heures supplémentaires payées</div>
                          <div className="text-sm text-gray-600">Majorées à +25% ou +50%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">5 semaines de congés payés</div>
                          <div className="text-sm text-gray-600">25 jours ouvrés minimum</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Protection maximale</div>
                          <div className="text-sm text-gray-600">Cadre légal strict</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
                <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Cadre</h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Cotisations sociales</div>
                    <div className="text-4xl font-bold text-gray-900">≈ 25%</div>
                    <div className="mt-2 text-sm text-gray-600">Du salaire brut</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Salaire net</div>
                    <div className="text-4xl font-bold text-green-600">≈ 75%</div>
                    <div className="mt-2 text-sm text-gray-600">Du salaire brut</div>
                  </div>

                  <div className="pt-6 border-t-2 border-purple-200">
                    <h3 className="font-bold text-lg mb-4 text-purple-900">Avantages</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Forfait jours</div>
                          <div className="text-sm text-gray-600">218 jours par an maximum</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">RTT supplémentaires</div>
                          <div className="text-sm text-gray-600">8 à 12 jours par an en moyenne</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Meilleure retraite</div>
                          <div className="text-sm text-gray-600">Cotisation AGIRC renforcée</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Prévoyance renforcée</div>
                          <div className="text-sm text-gray-600">Meilleure couverture santé</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <div className="font-semibold">Statut social valorisé</div>
                          <div className="text-sm text-gray-600">Reconnaissance professionnelle</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse détaillée</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Le statut de cadre implique des <strong>cotisations supplémentaires d'environ 3%</strong>,
              principalement pour la retraite complémentaire AGIRC et la prévoyance cadre (APEC).
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg mb-3 text-blue-900">Exemple Non-Cadre</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Salaire brut :</span>
                    <strong>2 500 €</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cotisations (22%) :</span>
                    <strong className="text-red-600">-550 €</strong>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Salaire net :</span>
                    <strong className="text-green-600">1 950 €</strong>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-lg mb-3 text-purple-900">Exemple Cadre</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Salaire brut :</span>
                    <strong>2 500 €</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cotisations (25%) :</span>
                    <strong className="text-red-600">-625 €</strong>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Salaire net :</span>
                    <strong className="text-green-600">1 875 €</strong>
                  </div>
                </div>
              </div>
            </div>
            <p className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <strong>Verdict :</strong> Malgré des cotisations plus élevées, le statut cadre offre de meilleurs
              avantages à long terme : retraite supérieure, prévoyance renforcée, et généralement des salaires
              bruts plus élevés compensant largement la différence.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SocialShare
            title="Cadre vs Non-Cadre : le vrai coût"
            text="Comparaison complète des cotisations et avantages entre les deux statuts"
          />
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-lg"
          >
            Calculer mon salaire selon mon statut
          </a>
        </div>
      </div>
    </div>
  );
}
