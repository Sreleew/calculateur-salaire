import { useState } from 'react';
import { TrendingUp, Share2 } from 'lucide-react';
import { trackIncreaseSimulated, trackShareClicked } from '../utils/analytics';

export default function SalaryIncreaseSimulator() {
  const [currentSalary, setCurrentSalary] = useState('2500');
  const [increasePercent, setIncreasePercent] = useState(5);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  const salary = parseFloat(currentSalary) || 0;
  const increaseAmount = salary * (increasePercent / 100);
  const newSalary = salary + increaseAmount;
  const netIncrease = increaseAmount * 0.77;
  const yearlyIncrease = netIncrease * 12;

  const handleShare = () => {
    const text = `Une augmentation de ${increasePercent}% = +${formatter.format(netIncrease)} net par mois soit ${formatter.format(yearlyIncrease)} par an !`;

    trackShareClicked('salary_increase_simulator');
    trackIncreaseSimulated(salary, increasePercent);

    if (navigator.share) {
      navigator.share({
        title: 'Simulateur d\'augmentation',
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Copié dans le presse-papiers !');
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <TrendingUp className="text-white" size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Impact d'une augmentation</h3>
          <p className="text-gray-600">Calculez votre gain net mensuel et annuel</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre salaire actuel (brut mensuel)
          </label>
          <div className="relative">
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-green-300 rounded-xl text-lg font-semibold text-gray-900 focus:border-green-500 focus:outline-none"
              placeholder="2500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              € brut
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              Augmentation demandée
            </label>
            <div className="text-3xl font-bold text-green-600">
              +{increasePercent}%
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={increasePercent}
            onChange={(e) => setIncreasePercent(parseFloat(e.target.value))}
            className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            style={{
              background: `linear-gradient(to right, rgb(34 197 94) 0%, rgb(34 197 94) ${(increasePercent / 15) * 100}%, rgb(187 247 208) ${(increasePercent / 15) * 100}%, rgb(187 247 208) 100%)`
            }}
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-green-300 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Nouveau salaire brut</span>
              <span className="text-xl font-bold text-blue-600">
                {formatter.format(newSalary)}
              </span>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Gain net mensuel</div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  +{formatter.format(netIncrease)}
                </div>
                <div className="text-sm text-gray-600">
                  soit <span className="font-bold text-green-700">{formatter.format(yearlyIncrease)}</span> de plus par an
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Augmentation brute</div>
                <div className="text-lg font-bold text-blue-600">
                  +{formatter.format(increaseAmount)}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Augmentation nette</div>
                <div className="text-lg font-bold text-green-600">
                  +{formatter.format(netIncrease)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Partager
          </button>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="text-sm text-gray-700">
              <strong>Conseil :</strong> Une augmentation de 3-5% est considérée comme normale en période stable.
              Une augmentation de 7-10% récompense de bonnes performances. Au-delà de 10%, c'est exceptionnel
              ou lié à une promotion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
