export interface SalaryRange {
  job: string;
  category: string;
  junior: { min: number; max: number; median: number };
  intermediate: { min: number; max: number; median: number };
  senior: { min: number; max: number; median: number };
}

export const salaryDatabase: SalaryRange[] = [
  {
    job: 'Développeur Web',
    category: 'Informatique',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 55000, median: 47500 },
    senior: { min: 55000, max: 80000, median: 67500 }
  },
  {
    job: 'Développeur Full Stack',
    category: 'Informatique',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 60000, median: 52500 },
    senior: { min: 60000, max: 90000, median: 75000 }
  },
  {
    job: 'Data Scientist',
    category: 'Informatique',
    junior: { min: 38000, max: 48000, median: 43000 },
    intermediate: { min: 48000, max: 65000, median: 56500 },
    senior: { min: 65000, max: 95000, median: 80000 }
  },
  {
    job: 'Chef de Projet',
    category: 'Management',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 60000, median: 52500 },
    senior: { min: 60000, max: 85000, median: 72500 }
  },
  {
    job: 'Responsable Marketing',
    category: 'Marketing',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 80000, median: 69000 }
  },
  {
    job: 'Commercial',
    category: 'Commercial',
    junior: { min: 28000, max: 38000, median: 33000 },
    intermediate: { min: 38000, max: 52000, median: 45000 },
    senior: { min: 52000, max: 75000, median: 63500 }
  },
  {
    job: 'Comptable',
    category: 'Finance',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 48000, median: 42000 },
    senior: { min: 48000, max: 65000, median: 56500 }
  },
  {
    job: 'Contrôleur de Gestion',
    category: 'Finance',
    junior: { min: 33000, max: 42000, median: 37500 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 80000, median: 69000 }
  },
  {
    job: 'Responsable RH',
    category: 'RH',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 55000, median: 47500 },
    senior: { min: 55000, max: 75000, median: 65000 }
  },
  {
    job: 'Infirmier(ère)',
    category: 'Santé',
    junior: { min: 24000, max: 30000, median: 27000 },
    intermediate: { min: 30000, max: 38000, median: 34000 },
    senior: { min: 38000, max: 48000, median: 43000 }
  },
  {
    job: 'Professeur',
    category: 'Éducation',
    junior: { min: 26000, max: 32000, median: 29000 },
    intermediate: { min: 32000, max: 40000, median: 36000 },
    senior: { min: 40000, max: 52000, median: 46000 }
  },
  {
    job: 'Ingénieur',
    category: 'Ingénierie',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 62000, median: 53500 },
    senior: { min: 62000, max: 90000, median: 76000 }
  },
  {
    job: 'Designer UX/UI',
    category: 'Design',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 55000, median: 47500 },
    senior: { min: 55000, max: 75000, median: 65000 }
  },
  {
    job: 'Community Manager',
    category: 'Marketing',
    junior: { min: 25000, max: 32000, median: 28500 },
    intermediate: { min: 32000, max: 42000, median: 37000 },
    senior: { min: 42000, max: 55000, median: 48500 }
  },
  {
    job: 'Avocat',
    category: 'Juridique',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 65000, median: 55000 },
    senior: { min: 65000, max: 100000, median: 82500 }
  },
  {
    job: 'Assistant(e) de Direction',
    category: 'Administration',
    junior: { min: 24000, max: 30000, median: 27000 },
    intermediate: { min: 30000, max: 38000, median: 34000 },
    senior: { min: 38000, max: 48000, median: 43000 }
  },
  {
    job: 'Chargé de Communication',
    category: 'Communication',
    junior: { min: 26000, max: 34000, median: 30000 },
    intermediate: { min: 34000, max: 45000, median: 39500 },
    senior: { min: 45000, max: 60000, median: 52500 }
  },
  {
    job: 'Product Owner',
    category: 'Informatique',
    junior: { min: 38000, max: 48000, median: 43000 },
    intermediate: { min: 48000, max: 65000, median: 56500 },
    senior: { min: 65000, max: 90000, median: 77500 }
  },
  {
    job: 'DevOps',
    category: 'Informatique',
    junior: { min: 38000, max: 50000, median: 44000 },
    intermediate: { min: 50000, max: 68000, median: 59000 },
    senior: { min: 68000, max: 95000, median: 81500 }
  },
  {
    job: 'Architecte',
    category: 'Bâtiment',
    junior: { min: 30000, max: 38000, median: 34000 },
    intermediate: { min: 38000, max: 52000, median: 45000 },
    senior: { min: 52000, max: 75000, median: 63500 }
  },
  {
    job: 'Consultant IT',
    category: 'Informatique',
    junior: { min: 35000, max: 48000, median: 41500 },
    intermediate: { min: 48000, max: 68000, median: 58000 },
    senior: { min: 68000, max: 100000, median: 84000 }
  },
  {
    job: 'Consultant Management',
    category: 'Management',
    junior: { min: 35000, max: 48000, median: 41500 },
    intermediate: { min: 48000, max: 72000, median: 60000 },
    senior: { min: 72000, max: 110000, median: 91000 }
  },
  {
    job: 'Directeur Commercial',
    category: 'Commercial',
    junior: { min: 50000, max: 65000, median: 57500 },
    intermediate: { min: 65000, max: 85000, median: 75000 },
    senior: { min: 85000, max: 130000, median: 107500 }
  },
  {
    job: 'Directeur RH',
    category: 'RH',
    junior: { min: 55000, max: 70000, median: 62500 },
    intermediate: { min: 70000, max: 95000, median: 82500 },
    senior: { min: 95000, max: 140000, median: 117500 }
  },
  {
    job: 'Directeur Marketing',
    category: 'Marketing',
    junior: { min: 50000, max: 65000, median: 57500 },
    intermediate: { min: 65000, max: 88000, median: 76500 },
    senior: { min: 88000, max: 135000, median: 111500 }
  },
  {
    job: 'Chief Financial Officer',
    category: 'Finance',
    junior: { min: 60000, max: 80000, median: 70000 },
    intermediate: { min: 80000, max: 110000, median: 95000 },
    senior: { min: 110000, max: 180000, median: 145000 }
  },
  {
    job: 'Business Analyst',
    category: 'Informatique',
    junior: { min: 33000, max: 43000, median: 38000 },
    intermediate: { min: 43000, max: 58000, median: 50500 },
    senior: { min: 58000, max: 80000, median: 69000 }
  },
  {
    job: 'Scrum Master',
    category: 'Informatique',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 60000, median: 52500 },
    senior: { min: 60000, max: 85000, median: 72500 }
  },
  {
    job: 'Développeur Python',
    category: 'Informatique',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 56000, median: 49000 },
    senior: { min: 56000, max: 85000, median: 70500 }
  },
  {
    job: 'Développeur Java',
    category: 'Informatique',
    junior: { min: 33000, max: 43000, median: 38000 },
    intermediate: { min: 43000, max: 58000, median: 50500 },
    senior: { min: 58000, max: 88000, median: 73000 }
  },
  {
    job: 'Développeur React/Angular',
    category: 'Informatique',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 55000, median: 47500 },
    senior: { min: 55000, max: 85000, median: 70000 }
  },
  {
    job: 'Développeur Mobile',
    category: 'Informatique',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 57000, median: 49500 },
    senior: { min: 57000, max: 82000, median: 69500 }
  },
  {
    job: 'QA / Testeur',
    category: 'Informatique',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 48000, median: 42000 },
    senior: { min: 48000, max: 65000, median: 56500 }
  },
  {
    job: 'Lead Developer',
    category: 'Informatique',
    junior: { min: 50000, max: 62000, median: 56000 },
    intermediate: { min: 62000, max: 82000, median: 72000 },
    senior: { min: 82000, max: 120000, median: 101000 }
  },
  {
    job: 'CTO',
    category: 'Informatique',
    junior: { min: 65000, max: 85000, median: 75000 },
    intermediate: { min: 85000, max: 120000, median: 102500 },
    senior: { min: 120000, max: 200000, median: 160000 }
  },
  {
    job: 'Directeur Technique',
    category: 'Informatique',
    junior: { min: 60000, max: 80000, median: 70000 },
    intermediate: { min: 80000, max: 110000, median: 95000 },
    senior: { min: 110000, max: 170000, median: 140000 }
  },
  {
    job: 'Chef de Projet Digital',
    category: 'Management',
    junior: { min: 36000, max: 46000, median: 41000 },
    intermediate: { min: 46000, max: 62000, median: 54000 },
    senior: { min: 62000, max: 88000, median: 75000 }
  },
  {
    job: 'Responsable Qualité',
    category: 'Management',
    junior: { min: 33000, max: 43000, median: 38000 },
    intermediate: { min: 43000, max: 58000, median: 50500 },
    senior: { min: 58000, max: 78000, median: 68000 }
  },
  {
    job: 'Responsable Supply Chain',
    category: 'Logistique',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 62000, median: 53500 },
    senior: { min: 62000, max: 88000, median: 75000 }
  },
  {
    job: 'Responsable Logistique',
    category: 'Logistique',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 56000, median: 49000 },
    senior: { min: 56000, max: 78000, median: 67000 }
  },
  {
    job: 'Responsable Qualité Fournisseurs',
    category: 'Achats',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 54000, median: 47000 },
    senior: { min: 54000, max: 74000, median: 64000 }
  },
  {
    job: 'Acheteur',
    category: 'Achats',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 57000, median: 49500 },
    senior: { min: 57000, max: 78000, median: 67500 }
  },
  {
    job: 'Directeur Achats',
    category: 'Achats',
    junior: { min: 50000, max: 65000, median: 57500 },
    intermediate: { min: 65000, max: 88000, median: 76500 },
    senior: { min: 88000, max: 130000, median: 109000 }
  },
  {
    job: 'Médecin Généraliste',
    category: 'Santé',
    junior: { min: 45000, max: 60000, median: 52500 },
    intermediate: { min: 60000, max: 80000, median: 70000 },
    senior: { min: 80000, max: 120000, median: 100000 }
  },
  {
    job: 'Cardiologue',
    category: 'Santé',
    junior: { min: 55000, max: 75000, median: 65000 },
    intermediate: { min: 75000, max: 110000, median: 92500 },
    senior: { min: 110000, max: 180000, median: 145000 }
  },
  {
    job: 'Chirurgien',
    category: 'Santé',
    junior: { min: 60000, max: 85000, median: 72500 },
    intermediate: { min: 85000, max: 130000, median: 107500 },
    senior: { min: 130000, max: 200000, median: 165000 }
  },
  {
    job: 'Dentiste',
    category: 'Santé',
    junior: { min: 40000, max: 55000, median: 47500 },
    intermediate: { min: 55000, max: 80000, median: 67500 },
    senior: { min: 80000, max: 130000, median: 105000 }
  },
  {
    job: 'Psychologue',
    category: 'Santé',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 50000, median: 43000 },
    senior: { min: 50000, max: 75000, median: 62500 }
  },
  {
    job: 'Pharmacien',
    category: 'Santé',
    junior: { min: 35000, max: 48000, median: 41500 },
    intermediate: { min: 48000, max: 68000, median: 58000 },
    senior: { min: 68000, max: 110000, median: 89000 }
  },
  {
    job: 'Kiné / Physiothérapeute',
    category: 'Santé',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 50000, median: 43000 },
    senior: { min: 50000, max: 75000, median: 62500 }
  },
  {
    job: 'Architecte Logiciel',
    category: 'Informatique',
    junior: { min: 55000, max: 70000, median: 62500 },
    intermediate: { min: 70000, max: 95000, median: 82500 },
    senior: { min: 95000, max: 150000, median: 122500 }
  },
  {
    job: 'Chercheur/Docteur',
    category: 'Recherche',
    junior: { min: 28000, max: 35000, median: 31500 },
    intermediate: { min: 35000, max: 50000, median: 42500 },
    senior: { min: 50000, max: 85000, median: 67500 }
  },
  {
    job: 'Chef d\'entreprise',
    category: 'Management',
    junior: { min: 45000, max: 65000, median: 55000 },
    intermediate: { min: 65000, max: 100000, median: 82500 },
    senior: { min: 100000, max: 200000, median: 150000 }
  },
  {
    job: 'Directeur Général',
    category: 'Management',
    junior: { min: 75000, max: 100000, median: 87500 },
    intermediate: { min: 100000, max: 150000, median: 125000 },
    senior: { min: 150000, max: 300000, median: 225000 }
  },
  {
    job: 'Responsable Paie',
    category: 'RH',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 48000, median: 42000 },
    senior: { min: 48000, max: 65000, median: 56500 }
  },
  {
    job: 'Recruteur',
    category: 'RH',
    junior: { min: 28000, max: 37000, median: 32500 },
    intermediate: { min: 37000, max: 50000, median: 43500 },
    senior: { min: 50000, max: 72000, median: 61000 }
  },
  {
    job: 'Responsable Formation',
    category: 'RH',
    junior: { min: 30000, max: 39000, median: 34500 },
    intermediate: { min: 39000, max: 53000, median: 46000 },
    senior: { min: 53000, max: 75000, median: 64000 }
  },
  {
    job: 'Brand Manager',
    category: 'Marketing',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 85000, median: 71500 }
  },
  {
    job: 'Digital Marketing Manager',
    category: 'Marketing',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 85000, median: 71500 }
  },
  {
    job: 'Social Media Manager',
    category: 'Marketing',
    junior: { min: 26000, max: 33000, median: 29500 },
    intermediate: { min: 33000, max: 44000, median: 38500 },
    senior: { min: 44000, max: 65000, median: 54500 }
  },
  {
    job: 'Event Manager',
    category: 'Marketing',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 48000, median: 42000 },
    senior: { min: 48000, max: 68000, median: 58000 }
  },
  {
    job: 'UX Designer',
    category: 'Design',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 55000, median: 47500 },
    senior: { min: 55000, max: 80000, median: 67500 }
  },
  {
    job: 'Graphic Designer',
    category: 'Design',
    junior: { min: 26000, max: 34000, median: 30000 },
    intermediate: { min: 34000, max: 45000, median: 39500 },
    senior: { min: 45000, max: 65000, median: 55000 }
  },
  {
    job: 'Motion Designer',
    category: 'Design',
    junior: { min: 28000, max: 36000, median: 32000 },
    intermediate: { min: 36000, max: 50000, median: 43000 },
    senior: { min: 50000, max: 75000, median: 62500 }
  },
  {
    job: 'Chef de Ventes',
    category: 'Commercial',
    junior: { min: 40000, max: 52000, median: 46000 },
    intermediate: { min: 52000, max: 70000, median: 61000 },
    senior: { min: 70000, max: 105000, median: 87500 }
  },
  {
    job: 'Responsable Secteur',
    category: 'Commercial',
    junior: { min: 40000, max: 52000, median: 46000 },
    intermediate: { min: 52000, max: 70000, median: 61000 },
    senior: { min: 70000, max: 100000, median: 85000 }
  },
  {
    job: 'Business Developer',
    category: 'Commercial',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 62000, median: 53500 },
    senior: { min: 62000, max: 90000, median: 76000 }
  },
  {
    job: 'Account Manager',
    category: 'Commercial',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 60000, median: 52500 },
    senior: { min: 60000, max: 85000, median: 72500 }
  },
  {
    job: 'Auditeur',
    category: 'Finance',
    junior: { min: 30000, max: 38000, median: 34000 },
    intermediate: { min: 38000, max: 52000, median: 45000 },
    senior: { min: 52000, max: 75000, median: 63500 }
  },
  {
    job: 'Analyste Financier',
    category: 'Finance',
    junior: { min: 35000, max: 45000, median: 40000 },
    intermediate: { min: 45000, max: 62000, median: 53500 },
    senior: { min: 62000, max: 92000, median: 77000 }
  },
  {
    job: 'Trésorier',
    category: 'Finance',
    junior: { min: 40000, max: 52000, median: 46000 },
    intermediate: { min: 52000, max: 70000, median: 61000 },
    senior: { min: 70000, max: 105000, median: 87500 }
  },
  {
    job: 'Chief Compliance Officer',
    category: 'Finance',
    junior: { min: 55000, max: 70000, median: 62500 },
    intermediate: { min: 70000, max: 100000, median: 85000 },
    senior: { min: 100000, max: 170000, median: 135000 }
  },
  {
    job: 'Notaire',
    category: 'Juridique',
    junior: { min: 45000, max: 60000, median: 52500 },
    intermediate: { min: 60000, max: 85000, median: 72500 },
    senior: { min: 85000, max: 140000, median: 112500 }
  },
  {
    job: 'Huissier',
    category: 'Juridique',
    junior: { min: 35000, max: 50000, median: 42500 },
    intermediate: { min: 50000, max: 75000, median: 62500 },
    senior: { min: 75000, max: 125000, median: 100000 }
  },
  {
    job: 'Juriste',
    category: 'Juridique',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 85000, median: 71500 }
  },
  {
    job: 'Pilote',
    category: 'Aviation',
    junior: { min: 50000, max: 70000, median: 60000 },
    intermediate: { min: 70000, max: 100000, median: 85000 },
    senior: { min: 100000, max: 180000, median: 140000 }
  },
  {
    job: 'Hôtesse de l\'air',
    category: 'Aviation',
    junior: { min: 28000, max: 35000, median: 31500 },
    intermediate: { min: 35000, max: 45000, median: 40000 },
    senior: { min: 45000, max: 65000, median: 55000 }
  },
  {
    job: 'Restaurateur',
    category: 'Hôtellerie',
    junior: { min: 35000, max: 50000, median: 42500 },
    intermediate: { min: 50000, max: 75000, median: 62500 },
    senior: { min: 75000, max: 130000, median: 102500 }
  },
  {
    job: 'Chef Cuisinier',
    category: 'Hôtellerie',
    junior: { min: 30000, max: 40000, median: 35000 },
    intermediate: { min: 40000, max: 58000, median: 49000 },
    senior: { min: 58000, max: 95000, median: 76500 }
  },
  {
    job: 'Sommelier',
    category: 'Hôtellerie',
    junior: { min: 26000, max: 34000, median: 30000 },
    intermediate: { min: 34000, max: 48000, median: 41000 },
    senior: { min: 48000, max: 75000, median: 61500 }
  },
  {
    job: 'Directeur d\'Hôtel',
    category: 'Hôtellerie',
    junior: { min: 45000, max: 60000, median: 52500 },
    intermediate: { min: 60000, max: 85000, median: 72500 },
    senior: { min: 85000, max: 135000, median: 110000 }
  },
  {
    job: 'Agent Immobilier',
    category: 'Immobilier',
    junior: { min: 28000, max: 38000, median: 33000 },
    intermediate: { min: 38000, max: 55000, median: 46500 },
    senior: { min: 55000, max: 95000, median: 75000 }
  },
  {
    job: 'Syndic Immobilier',
    category: 'Immobilier',
    junior: { min: 32000, max: 42000, median: 37000 },
    intermediate: { min: 42000, max: 58000, median: 50000 },
    senior: { min: 58000, max: 88000, median: 73000 }
  },
  {
    job: 'Courtier en Assurance',
    category: 'Assurance',
    junior: { min: 28000, max: 37000, median: 32500 },
    intermediate: { min: 37000, max: 52000, median: 44500 },
    senior: { min: 52000, max: 85000, median: 68500 }
  },
  {
    job: 'Gestionnaire Sinistre',
    category: 'Assurance',
    junior: { min: 26000, max: 34000, median: 30000 },
    intermediate: { min: 34000, max: 48000, median: 41000 },
    senior: { min: 48000, max: 70000, median: 59000 }
  },
  {
    job: 'Responsable ESG',
    category: 'Éducation',
    junior: { min: 38000, max: 50000, median: 44000 },
    intermediate: { min: 50000, max: 68000, median: 59000 },
    senior: { min: 68000, max: 100000, median: 84000 }
  },
  {
    job: 'Autre',
    category: 'Autre',
    junior: { min: 25000, max: 35000, median: 30000 },
    intermediate: { min: 35000, max: 50000, median: 42500 },
    senior: { min: 50000, max: 70000, median: 60000 }
  }
];

export const jobCategories = [
  'Informatique',
  'Marketing',
  'Commercial',
  'Finance',
  'RH',
  'Santé',
  'Éducation',
  'Ingénierie',
  'Design',
  'Juridique',
  'Administration',
  'Communication',
  'Bâtiment',
  'Management',
  'Logistique',
  'Achats',
  'Recherche',
  'Aviation',
  'Hôtellerie',
  'Immobilier',
  'Assurance',
  'Autre'
];

export const locationMultiplier: Record<string, number> = {
  'Île-de-France (Paris et région)': 1.15,
  'Lyon': 1.05,
  'Marseille': 1.02,
  'Toulouse': 1.03,
  'Nantes': 1.02,
  'Bordeaux': 1.03,
  'Lille': 1.0,
  'Strasbourg': 1.02,
  'Autre grande ville': 1.0,
  'Ville moyenne': 0.95,
  'Zone rurale': 0.90
};

export const companySizeMultiplier: Record<string, number> = {
  'Moins de 10 salariés': 0.90,
  '10 à 50 salariés': 0.95,
  '50 à 250 salariés': 1.0,
  '250 à 1000 salariés': 1.05,
  'Plus de 1000 salariés': 1.10,
  'Grand groupe / CAC 40': 1.15
};
