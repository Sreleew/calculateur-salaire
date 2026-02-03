import { Download } from 'lucide-react';
import SocialShare from '../components/SocialShare';

interface InfographicCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  id: string;
}

function InfographicCard({ title, description, children, id }: InfographicCardProps) {
  const handleDownload = () => {
    alert('Fonctionnalité de téléchargement à venir (nécessite génération d\'image côté serveur)');
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700">
      <div className="p-6 border-b border-slate-600">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400">{description}</p>
      </div>

      <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800">
        {children}
      </div>

      <div className="p-6 bg-slate-900 space-y-4">
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Télécharger l'infographie
        </button>

        <SocialShare
          title={title}
          text={`Découvrez : ${title} - ${description}`}
        />
      </div>
    </div>
  );
}

export default function Infographies() {
  const infographics = [
    {
      id: 'brut-net',
      url: '/infographie-brut-net',
      title: 'Où va votre salaire brut ?',
      description: 'Visualisez la répartition exacte de vos cotisations sociales',
      icon: '📊',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'cadre-non-cadre',
      url: '/infographie-cadre-non-cadre',
      title: 'Cadre vs Non-Cadre',
      description: 'Comparaison des cotisations et avantages',
      icon: '💼',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'smic',
      url: '/infographie-smic',
      title: 'Évolution du SMIC 2020-2026',
      description: 'Suivez la progression du salaire minimum',
      icon: '📈',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'secteurs',
      url: '/infographie-secteurs',
      title: 'Salaire moyen par secteur',
      description: 'Comparez les rémunérations par industrie',
      icon: '🏢',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'metiers',
      url: '/infographie-metiers',
      title: 'Top 10 métiers les mieux payés',
      description: 'Classement des professions avec les plus hauts salaires',
      icon: '🏆',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Infographies Salaires 2026
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Découvrez les données clés sur les salaires en France. Partagez-les sur vos réseaux sociaux !
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {infographics.map((info) => (
            <a
              key={info.id}
              href={info.url}
              className="bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-slate-700 hover:border-blue-500"
            >
              <div className={`bg-gradient-to-r ${info.color} p-6 text-white`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
              </div>
              <div className="p-6 bg-slate-900">
                <p className="text-slate-400 mb-4">{info.description}</p>
                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Voir l'infographie
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-12 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Pourquoi ces infographies ?</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Comprendre votre salaire, comparer avec les moyennes du marché et prendre des décisions éclairées.
              Toutes nos données sont basées sur les barèmes officiels 2026 et les études de marché récentes.
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
