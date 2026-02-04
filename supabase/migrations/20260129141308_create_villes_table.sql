/*
  # Création de la table villes pour le SEO local

  1. Nouvelle Table
    - `villes`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL slug pour la page (ex: "paris", "lyon")
      - `nom` (text) - Nom complet de la ville (ex: "Paris", "Lyon")
      - `region` (text) - Région administrative (ex: "Île-de-France", "Auvergne-Rhône-Alpes")
      - `salaire_moyen_brut` (numeric) - Salaire brut moyen mensuel
      - `loyer_moyen` (numeric) - Loyer moyen mensuel
      - `transport_mensuel` (numeric) - Coût transport mensuel
      - `alimentation_mensuelle` (numeric) - Budget alimentation mensuel
      - `secteurs_principaux` (jsonb) - Array des secteurs d'activité principaux
      - `entreprises_top` (jsonb) - Array des entreprises majeures
      - `taux_chomage` (numeric) - Taux de chômage en %
      - `nb_offres_emploi` (integer) - Nombre d'offres d'emploi disponibles
      - `population` (integer) - Population de la ville
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur la table `villes`
    - Politique SELECT pour tous (lecture publique)
*/

CREATE TABLE IF NOT EXISTS villes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  nom text NOT NULL,
  region text NOT NULL,
  salaire_moyen_brut numeric NOT NULL DEFAULT 0,
  loyer_moyen numeric NOT NULL DEFAULT 0,
  transport_mensuel numeric NOT NULL DEFAULT 0,
  alimentation_mensuelle numeric NOT NULL DEFAULT 0,
  secteurs_principaux jsonb DEFAULT '[]'::jsonb,
  entreprises_top jsonb DEFAULT '[]'::jsonb,
  taux_chomage numeric NOT NULL DEFAULT 0,
  nb_offres_emploi integer NOT NULL DEFAULT 0,
  population integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE villes ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour tous
CREATE POLICY "Villes accessibles en lecture publique"
  ON villes
  FOR SELECT
  TO public
  USING (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_villes_slug ON villes(slug);
CREATE INDEX IF NOT EXISTS idx_villes_region ON villes(region);