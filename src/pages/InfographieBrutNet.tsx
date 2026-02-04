import SocialShare from '../components/SocialShare';

export default function InfographieBrutNet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Où va votre salaire brut ?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualisez la répartition exacte de vos cotisations sociales en France 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700 text-lg">Salaire brut</span>
                  <span className="text-3xl font-bold text-gray-900">100%</span>
                </div>
                <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 shadow-md border-2 border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium">Sécurité sociale</span>
                    <span className="font-bold text-red-600 text-xl">-15%</span>
                  </div>
                  <div className="h-10 bg-red-400 rounded-lg"></div>
                  <p className="text-sm text-gray-600 mt-2">Maladie, maternité, invalidité</p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-md border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium">Retraite complémentaire</span>
                    <span className="font-bold text-orange-600 text-xl">-7%</span>
                  </div>
                  <div className="h-10 bg-orange-400 rounded-lg"></div>
                  <p className="text-sm text-gray-600 mt-2">ARRCO, AGIRC pour les cadres</p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-md border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium">CSG/CRDS</span>
                    <span className="font-bold text-yellow-600 text-xl">-9.7%</span>
                  </div>
                  <div className="h-10 bg-yellow-400 rounded-lg"></div>
                  <p className="text-sm text-gray-600 mt-2">Contribution à la dette sociale</p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-md border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-800 font-medium">Autres cotisations</span>
                    <span className="font-bold text-purple-600 text-xl">-3%</span>
                  </div>
                  <div className="h-10 bg-purple-400 rounded-lg"></div>
                  <p className="text-sm text-gray-600 mt-2">Chômage, formation, transport</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 shadow-lg mt-8">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-2xl">Salaire net</span>
                  <span className="text-5xl font-bold text-white">≈ 77%</span>
                </div>
                <p className="text-green-100 mt-3 text-lg">Ce qui arrive réellement sur votre compte</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explication détaillée</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              En France, environ <strong>23% de votre salaire brut</strong> est prélevé sous forme de cotisations sociales
              salariales. Ces prélèvements financent votre protection sociale : assurance maladie, retraite, chômage.
            </p>
            <p>
              <strong>Les principales cotisations :</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Sécurité sociale (15%)</strong> : Couvre vos frais de santé, arrêts maladie, maternité</li>
              <li><strong>Retraite complémentaire (7%)</strong> : Vient s'ajouter à votre retraite de base</li>
              <li><strong>CSG/CRDS (9.7%)</strong> : Contribution généralisée pour financer la protection sociale</li>
              <li><strong>Autres (3%)</strong> : Assurance chômage, formation professionnelle, prévoyance</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <strong>Bon à savoir :</strong> Votre employeur paie également des charges patronales représentant
              environ 42% de votre salaire brut en plus. Le coût total pour l'entreprise est donc bien supérieur
              à ce que vous recevez.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SocialShare
            title="Où va votre salaire brut ?"
            text="Découvrez la répartition exacte des cotisations sociales en France 2026"
          />
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-lg"
          >
            Calculer mon salaire net
          </a>
        </div>
      </div>
    </div>
  );
}
