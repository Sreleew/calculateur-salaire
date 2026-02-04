export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Politique de Confidentialité</h1>

        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Objet de cette politique</h2>
            <p>
              Cette Politique de Confidentialité explique comment le site Calculateur Salaire Brut/Net France (« nous », « le site ») collecte, utilise, stocke et protège vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Données collectées</h2>
            <p className="mb-3">Nous collectons les types de données suivants :</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite, source du trafic</li>
              <li><strong className="text-white">Données techniques :</strong> cookies et technologies similaires pour améliorer votre expérience</li>
              <li><strong className="text-white">Données volontaires :</strong> informations saisies dans les formulaires de contact ou newsletters (nom, email, messages)</li>
              <li><strong className="text-white">Données de calcul :</strong> salaire brut, statut professionnel et autres paramètres saisis dans les calculateurs (non stockés sans consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Utilisation des données</h2>
            <p className="mb-3">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Vous fournir un accès et une meilleure expérience du site</li>
              <li>Analyser l'utilisation du site et les performances</li>
              <li>Vous envoyer des communications (newsletters, mises à jour) si vous avez donné votre consentement</li>
              <li>Répondre à vos demandes via les formulaires de contact</li>
              <li>Améliorer nos outils et services</li>
              <li>Se conformer à nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données personnelles est basé sur :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-white">Votre consentement :</strong> pour les newsletters et communications marketing</li>
              <li><strong className="text-white">Nos intérêts légitimes :</strong> pour l'analyse de performance et l'amélioration du site</li>
              <li><strong className="text-white">Vos demandes :</strong> pour répondre aux formulaires de contact</li>
              <li><strong className="text-white">Obligations légales :</strong> si requises par la loi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies et traceurs</h2>
            <p className="mb-3">
              Le site utilise des cookies pour :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
              <li><strong className="text-white">Cookies d'analyse :</strong> pour comprendre comment vous utilisez le site (Google Analytics)</li>
              <li><strong className="text-white">Cookies publicitaires :</strong> pour la personnalisation des annonces (Google AdSense)</li>
            </ul>
            <p className="mt-3">
              Vous pouvez contrôler les cookies via les paramètres de votre navigateur ou via notre bandeau de consentement aux cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Partage de données</h2>
            <p>
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-white">Supabase :</strong> notre hébergeur pour le stockage et la gestion des données</li>
              <li><strong className="text-white">Google Analytics :</strong> pour l'analyse du trafic</li>
              <li><strong className="text-white">Google AdSense :</strong> pour l'affichage des annonces</li>
              <li><strong className="text-white">Autorités légales :</strong> si requises par la loi</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Durée de conservation</h2>
            <p>
              Les données sont conservées selon la durée suivante :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-white">Cookies :</strong> généralement 13 mois</li>
              <li><strong className="text-white">Données de contact :</strong> tant que nécessaire pour répondre ou jusqu'à révocation du consentement</li>
              <li><strong className="text-white">Logs d'accès :</strong> généralement 90 jours</li>
              <li><strong className="text-white">Données de calcul :</strong> non stockées par défaut</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Vos droits</h2>
            <p>
              Conformément à la RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-white">Accès :</strong> demander l'accès à vos données</li>
              <li><strong className="text-white">Rectification :</strong> corriger vos données inexactes</li>
              <li><strong className="text-white">Suppression :</strong> demander la suppression de vos données</li>
              <li><strong className="text-white">Portabilité :</strong> recevoir vos données dans un format exploitable</li>
              <li><strong className="text-white">Opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong className="text-white">Retrait du consentement :</strong> retirer votre consentement à tout moment</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous via le formulaire de contact du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Sécurité des données</h2>
            <p>
              Nous prenons des mesures appropriées pour protéger vos données :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Chiffrement des données en transit (HTTPS)</li>
              <li>Sécurisation de notre hébergeur (Supabase)</li>
              <li>Accès restreint aux données</li>
              <li>Mises à jour de sécurité régulières</li>
            </ul>
            <p className="mt-3">
              Cependant, aucune transmission sur internet n'est 100% sécurisée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Données sensibles</h2>
            <p>
              Le site ne collecte pas intentionnellement de données sensibles (origine raciale, opinions politiques, données de santé, etc.). Si cela se produit, nous appliquerons les protections supplémentaires requises par la loi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Modification de cette politique</h2>
            <p>
              Cette politique peut être modifiée à tout moment. Les modifications seront notifiées sur cette page. L'utilisation continue du site après les modifications implique votre acceptation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact et recours</h2>
            <p>
              Pour toute question concernant cette politique ou pour exercer vos droits, utilisez le formulaire de contact du site.
            </p>
            <p className="mt-3">
              Vous avez également le droit de déposer une plainte auprès de la <strong className="text-white">CNIL (Commission Nationale de l'Informatique et des Libertés)</strong> :
            </p>
            <p className="mt-2">
              www.cnil.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Données de tiers</h2>
            <p>
              Si vous nous transmettez des données personnelles de tiers (ex : données de famille), vous garantissez avoir leur consentement et que la transmission est légale.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-600">
            <p className="text-sm text-slate-400">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
