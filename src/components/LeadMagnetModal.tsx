import { useState } from 'react';
import { X, Download, CheckCircle, Gift } from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email collecté:', email);
    localStorage.setItem('lead_email', email);

    setSubmitted(true);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggMTAwCj4+CnN0cmVhbQpCVAovRjEgMjQgVGYKMTAwIDcwMCBUZApHdWlkZSBOw6lnb2NpYXRpb24gU2FsYWlyZQpFVApCVAovRjEgMTIgVGYKMTAwIDY1MCBUZAooVm90cmUgZ3VpZGUgZXN0IHByw6p0ICEpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAwNzQgMDAwMDAgbg0KMDAwMDAwMDE3OSAwMDAwMCBuDQowMDAwMDAwMzEwIDAwMDAwIG4NCjAwMDAwMDAzOTggMDAwMDAgbg0KdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1NDUKJSVFT0Y=';
      link.download = 'guide-negociation-salaire.pdf';
      link.click();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Cadeau Bonus</h2>
          </div>
          <p className="text-blue-100">Téléchargez votre guide gratuit</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Guide "Comment négocier une augmentation"
              </h3>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>15 pages de conseils pratiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Scripts de négociation prêts à l'emploi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Exemples concrets et témoignages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Checklist avant votre entretien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Erreurs à éviter absolument</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 font-medium">
                  🎁 Offre limitée : accès immédiat et gratuit
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre email pour recevoir le guide
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger le guide gratuitement
              </button>

              <p className="text-xs text-gray-500 text-center">
                Nous respectons votre vie privée. Pas de spam, désinscription à tout moment.
              </p>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Merci !
            </h3>

            <p className="text-gray-600 mb-6">
              Le téléchargement de votre guide va commencer dans un instant...
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Prochaines étapes :</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Consultez votre boîte mail ({email})</li>
                <li>✓ Vérifiez aussi les spams</li>
                <li>✓ Lisez le guide avant votre entretien</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
