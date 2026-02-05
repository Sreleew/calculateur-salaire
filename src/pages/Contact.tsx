import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contactez-Nous</h1>
        <p className="text-slate-400 text-lg mb-12">
          Vous avez une question ou une suggestion ? N'hésitez pas à nous contacter.
        </p>

        <ContactForm />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-2">Questions Générales</h3>
            <p className="text-slate-400 text-sm">
              Pour toute question sur nos calculateurs et outils, utilisez le formulaire de contact.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-2">Signaler un Problème</h3>
            <p className="text-slate-400 text-sm">
              Vous avez trouvé une erreur ou un bug ? Dites-le nous pour que nous puissions corriger.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-2">Partenariats</h3>
            <p className="text-slate-400 text-sm">
              Intéressé par un partenariat ? Contactez-nous pour discuter des opportunités.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
