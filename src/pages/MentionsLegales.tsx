export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Mentions Légales</h1>

        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Identification du site</h2>
            <p>
              <strong className="text-white">Nom du site :</strong> Calculateur Salaire Brut/Net France<br />
              <strong className="text-white">URL :</strong> www.calculateur-salaire.fr<br />
              <strong className="text-white">Type de site :</strong> Outil de calcul et information sur les salaires en France<br />
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Responsable du site</h2>
            <p>
              <strong className="text-white">Responsable éditorial :</strong> Calculateur Salaire Brut/Net France<br />
              <strong className="text-white">Contact :</strong> Formulaire de contact disponible sur le site<br />
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Hébergement</h2>
            <p>
              Le site est hébergé sur les serveurs de Supabase, une plateforme cloud d'hébergement et de base de données.<br />
              <strong className="text-white">Hébergeur :</strong> Supabase
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur le site (textes, images, graphiques, logos, calculateurs, etc.) sont la propriété exclusive du site ou sont utilisés avec autorisation. Toute reproduction totale ou partielle sans autorisation est interdite.
            </p>
            <p className="mt-3">
              Les données de calcul et les algorithmes utilisés sont basés sur les barèmes officiels en vigueur en France pour l'année 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Informations légales sur les salaires</h2>
            <p>
              Les calculs présentés sur ce site sont <strong className="text-white">indicatifs et informatifs</strong>. Ils ne constituent pas un conseil juridique ou fiscal. Pour un calcul officiel et personnalisé, consultez :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Votre service RH ou département paie</li>
              <li>L'URSSAF (www.urssaf.fr)</li>
              <li>Un professionnel du conseil fiscal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation de responsabilité</h2>
            <p>
              Le site et ses contenus sont fournis « tels quels » sans garantie expresse ou implicite. L'éditeur du site ne peut être tenu responsable de :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Erreurs ou inexactitudes dans les calculs</li>
              <li>Pertes financières résultant de l'utilisation du site</li>
              <li>Interruptions ou indisponibilités du service</li>
              <li>Dommages directs ou indirects liés à l'accès au site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Conditions d'utilisation</h2>
            <p>
              L'accès et l'utilisation du site impliquent l'acceptation de ces conditions. L'utilisateur s'engage à :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Utiliser le site à titre personnel et informatif</li>
              <li>Ne pas reproduire ou distribuer les contenus sans autorisation</li>
              <li>Ne pas tenter d'accéder à des données ou fonctionnalités non autorisées</li>
              <li>Respecter les lois en vigueur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Données personnelles</h2>
            <p>
              Pour plus d'informations sur la collecte et l'utilisation de vos données personnelles, consultez notre <a href="/politique-confidentialite" className="text-blue-400 hover:text-blue-300 underline">Politique de Confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Liens externes</h2>
            <p>
              Le site peut contenir des liens vers des sites externes. L'éditeur n'est pas responsable du contenu de ces sites tiers. Leur inclusion ne constitue pas une approbation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Modification des mentions légales</h2>
            <p>
              L'éditeur se réserve le droit de modifier ces mentions légales à tout moment. Les modifications prennent effet immédiatement après leur publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Droit applicable et juridiction</h2>
            <p>
              Ces mentions légales sont régies par la loi française. En cas de litige, les tribunaux français seront compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact</h2>
            <p>
              Pour toute question concernant ce site ou ces mentions légales, utilisez le formulaire de contact disponible sur le site.
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
