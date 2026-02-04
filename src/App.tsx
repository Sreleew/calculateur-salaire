import { useState, useEffect, useRef } from 'react';
import './App.css';
import CookieConsent from './components/CookieConsent';
import AdSenseBlock from './components/AdSenseBlock';
import FAQ from './components/FAQ';
import BlogList from './components/BlogList';
import BlogPost, { BlogPostData } from './components/BlogPost';
import DisclaimerBanner from './components/DisclaimerBanner';
import MethodologyBlock from './components/MethodologyBlock';
import { trackCalculationSaved } from './utils/analytics';
import { blogPosts } from './data/blogPosts';

type Period = 'monthly' | 'yearly' | 'daily' | 'hourly';
type Status = 'non-cadre' | 'cadre' | 'cadre-superieur' | 'fonction-publique' | 'agent-contractuel' | 'profession-liberale' | 'micro-entrepreneur' | 'apprenti' | 'stagiaire';

const PLAFOND_SS_MENSUEL = 3864;
const SMIC_MENSUEL = 1823.03;
const SALAIRE_MEDIAN_FRANCE = 2300;
const SALAIRE_MOYEN_FRANCE = 2650;
const JOURS_TRAVAILLES_AN = 218;
const SEMAINES_AN = 52;
const TRANSPORT_REIMBURSE = 45;

const CHARGE_RATE_BY_STATUS: Record<Status, number> = {
  'non-cadre': 0.22,
  'cadre': 0.25,
  'cadre-superieur': 0.27,
  'fonction-publique': 0.17,
  'agent-contractuel': 0.20,
  'profession-liberale': 0.22,
  'micro-entrepreneur': 0.22,
  'apprenti': 0.09,
  'stagiaire': 0.10,
};

const TAX_BRACKETS: Record<string, Array<{ min: number; max: number; rate: number }>> = {
  'metropole': [
    { min: 0, max: 1591, rate: 0 },
    { min: 1591, max: 1653, rate: 0.5 },
    { min: 1653, max: 1759, rate: 1.3 },
    { min: 1759, max: 1877, rate: 2.1 },
    { min: 1877, max: 2006, rate: 2.9 },
    { min: 2006, max: 2113, rate: 3.5 },
    { min: 2113, max: 2253, rate: 4.1 },
    { min: 2253, max: 2666, rate: 5.3 },
    { min: 2666, max: 3052, rate: 7.5 },
    { min: 3052, max: 3476, rate: 9.9 },
    { min: 3476, max: 3913, rate: 11.9 },
    { min: 3913, max: 4566, rate: 13.8 },
    { min: 4566, max: 5475, rate: 15.8 },
    { min: 5475, max: 6851, rate: 17.9 },
    { min: 6851, max: 8557, rate: 20 },
    { min: 8557, max: 11877, rate: 24 },
    { min: 11877, max: 16086, rate: 28 },
    { min: 16086, max: 25251, rate: 33 },
    { min: 25251, max: 54088, rate: 38 },
    { min: 54088, max: Infinity, rate: 43 },
  ],
  'dom': [
    { min: 0, max: 1825, rate: 0 },
    { min: 1825, max: 1936, rate: 0.5 },
    { min: 1936, max: 2133, rate: 1.3 },
    { min: 2133, max: 2329, rate: 2.1 },
    { min: 2329, max: 2572, rate: 2.9 },
    { min: 2572, max: 2712, rate: 3.5 },
    { min: 2712, max: 2805, rate: 4.1 },
    { min: 2805, max: 3086, rate: 5.3 },
    { min: 3086, max: 3816, rate: 7.5 },
    { min: 3816, max: 4883, rate: 9.9 },
    { min: 4883, max: 5546, rate: 11.9 },
    { min: 5546, max: 6424, rate: 13.8 },
    { min: 6424, max: 7697, rate: 15.8 },
    { min: 7697, max: 8557, rate: 17.9 },
    { min: 8557, max: 9725, rate: 20 },
    { min: 9725, max: 13374, rate: 24 },
    { min: 13374, max: 17770, rate: 28 },
    { min: 17770, max: 27122, rate: 33 },
    { min: 27122, max: 59283, rate: 38 },
    { min: 59283, max: Infinity, rate: 43 },
  ],
};

const getTaxRateByIncome = (netAvantImpot: number, region: string): number => {
  let regionKey = region;
  if (region === 'alsace-moselle') regionKey = 'metropole';
  const brackets = TAX_BRACKETS[regionKey] || TAX_BRACKETS['metropole'];
  const bracket = brackets.find(b => netAvantImpot >= b.min && netAvantImpot < b.max);
  return bracket?.rate ?? 0;
};

interface Cotisation {
  nom: string;
  taux: number;
  base: string;
  montant?: number;
}

interface CotisationsResult {
  totalSalariales: number;
  totalPatronales: number;
  detailSalariales: Cotisation[];
  detailPatronales: Cotisation[];
}

interface CalculationResult {
  brut: number;
  netAvantImpot: number;
  impot: number;
  netApresImpot: number;
  cotisations: CotisationsResult;
}

interface HistoryItem {
  id: number;
  date: string;
  mode: string;
  input: number;
  period: string;
  status: string;
  brut: number;
  net: number;
}

const COTISATIONS: Record<Status, { salariales: Cotisation[]; patronales: Cotisation[] }> = {
  'non-cadre': {
    salariales: [
      { nom: 'Assurance maladie', taux: 0, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 6.90, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 0.40, base: 'total' },
      { nom: 'Assurance chômage', taux: 0, base: 'plafond4' },
      { nom: 'Retraite complémentaire T1', taux: 3.15, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 8.64, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 0.86, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.08, base: 'tranche2' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: [
      { nom: 'Assurance maladie', taux: 7.00, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 8.55, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 2.02, base: 'total' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'Accidents du travail', taux: 2.00, base: 'total' },
      { nom: 'FNAL', taux: 0.50, base: 'total' },
      { nom: 'Assurance chômage', taux: 4.05, base: 'plafond4' },
      { nom: 'AGS', taux: 0.15, base: 'plafond4' },
      { nom: 'Retraite complémentaire T1', taux: 4.72, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 12.95, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 1.29, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.62, base: 'tranche2' },
    ]
  },
  'cadre': {
    salariales: [
      { nom: 'Assurance maladie', taux: 0, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 6.90, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 0.40, base: 'total' },
      { nom: 'Retraite complémentaire T1', taux: 3.15, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 8.64, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 0.86, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.08, base: 'tranche2' },
      { nom: 'CET', taux: 0.14, base: 'plafond8' },
      { nom: 'APEC', taux: 0.024, base: 'plafond4' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: [
      { nom: 'Assurance maladie', taux: 7.00, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 8.55, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 2.02, base: 'total' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'Accidents du travail', taux: 2.00, base: 'total' },
      { nom: 'FNAL', taux: 0.50, base: 'total' },
      { nom: 'Assurance chômage', taux: 4.05, base: 'plafond4' },
      { nom: 'AGS', taux: 0.15, base: 'plafond4' },
      { nom: 'Retraite complémentaire T1', taux: 4.72, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 12.95, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 1.29, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.62, base: 'tranche2' },
      { nom: 'CET', taux: 0.21, base: 'plafond8' },
      { nom: 'APEC', taux: 0.036, base: 'plafond4' },
    ]
  },
  'fonction-publique': {
    salariales: [
      { nom: 'Pension civile', taux: 11.10, base: 'total' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
      { nom: 'RAFP', taux: 5.00, base: 'primes' },
    ],
    patronales: [
      { nom: 'Pension civile', taux: 74.28, base: 'total' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'FNAL', taux: 0.50, base: 'total' },
      { nom: 'RAFP', taux: 5.00, base: 'primes' },
    ]
  },
  'profession-liberale': {
    salariales: [
      { nom: 'URSSAF (maladie)', taux: 6.50, base: 'total' },
      { nom: 'Retraite de base', taux: 8.23, base: 'plafond' },
      { nom: 'Retraite complémentaire', taux: 7.00, base: 'total' },
      { nom: 'Invalidité-décès', taux: 1.30, base: 'total' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: []
  },
  'apprenti': {
    salariales: [
      { nom: 'CSG déductible (exonérée)', taux: 0, base: 'csg' },
      { nom: 'CRDS (exonérée)', taux: 0, base: 'csg' },
    ],
    patronales: [
      { nom: 'Assurance maladie', taux: 7.00, base: 'total' },
      { nom: 'Assurance vieillesse', taux: 8.55, base: 'plafond' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'Accidents du travail', taux: 2.00, base: 'total' },
    ]
  },
  'stagiaire': {
    salariales: [],
    patronales: []
  },
  'cadre-superieur': {
    salariales: [
      { nom: 'Assurance maladie', taux: 0, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 6.90, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 0.40, base: 'total' },
      { nom: 'Retraite complémentaire T1', taux: 3.15, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 8.64, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 0.86, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.08, base: 'tranche2' },
      { nom: 'CET', taux: 0.14, base: 'plafond8' },
      { nom: 'APEC', taux: 0.024, base: 'plafond4' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: [
      { nom: 'Assurance maladie', taux: 7.00, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 8.55, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 2.02, base: 'total' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'Accidents du travail', taux: 2.00, base: 'total' },
      { nom: 'FNAL', taux: 0.50, base: 'total' },
      { nom: 'Assurance chômage', taux: 4.05, base: 'plafond4' },
      { nom: 'AGS', taux: 0.15, base: 'plafond4' },
      { nom: 'Retraite complémentaire T1', taux: 4.72, base: 'plafond' },
      { nom: 'Retraite complémentaire T2', taux: 12.95, base: 'tranche2' },
      { nom: 'CEG Tranche 1', taux: 1.29, base: 'plafond' },
      { nom: 'CEG Tranche 2', taux: 1.62, base: 'tranche2' },
      { nom: 'CET', taux: 0.21, base: 'plafond8' },
      { nom: 'APEC', taux: 0.036, base: 'plafond4' },
    ]
  },
  'agent-contractuel': {
    salariales: [
      { nom: 'Assurance maladie', taux: 0, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 6.90, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 0.40, base: 'total' },
      { nom: 'Contribution solidarité autonomie', taux: 0.30, base: 'total' },
      { nom: 'Allocations familiales', taux: 0, base: 'total' },
      { nom: 'Assurance chômage', taux: 0.95, base: 'plafond4' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: [
      { nom: 'Assurance maladie', taux: 7.00, base: 'total' },
      { nom: 'Assurance vieillesse plafonnée', taux: 8.55, base: 'plafond' },
      { nom: 'Assurance vieillesse déplafonnée', taux: 2.02, base: 'total' },
      { nom: 'Contribution solidarité autonomie', taux: 0.30, base: 'total' },
      { nom: 'Allocations familiales', taux: 5.25, base: 'total' },
      { nom: 'Accidents du travail', taux: 0.50, base: 'total' },
      { nom: 'FNAL', taux: 0.50, base: 'total' },
      { nom: 'Assurance chômage', taux: 4.05, base: 'plafond4' },
      { nom: 'AGS', taux: 0.15, base: 'plafond4' },
    ]
  },
  'micro-entrepreneur': {
    salariales: [
      { nom: 'Assurance maladie', taux: 7.50, base: 'total' },
      { nom: 'Retraite de base', taux: 14.00, base: 'total' },
      { nom: 'Retraite complémentaire', taux: 3.50, base: 'total' },
      { nom: 'CSG déductible', taux: 6.80, base: 'csg' },
      { nom: 'CSG non déductible', taux: 2.40, base: 'csg' },
      { nom: 'CRDS', taux: 0.50, base: 'csg' },
    ],
    patronales: []
  }
};

function App() {
  const [currentView, setCurrentView] = useState<'calculator' | 'blog' | 'article'>('calculator');
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);
  const [currentMode, setCurrentMode] = useState<'brut-to-net' | 'net-to-brut'>('brut-to-net');
  const [salaryInput, setSalaryInput] = useState(SMIC_MENSUEL.toString());
  const [debouncedSalary, setDebouncedSalary] = useState(SMIC_MENSUEL.toString());
  const [period, setPeriod] = useState<Period>('monthly');
  const [status, setStatus] = useState<Status>('non-cadre');
  const [region, setRegion] = useState('metropole');
  const [taxRate, setTaxRate] = useState('0');
  const [hoursWeek, setHoursWeek] = useState('35');
  const [mutuelle, setMutuelle] = useState(false);
  const [transport, setTransport] = useState(false);
  const [ticketsResto, setTicketsResto] = useState(false);
  const [heuresSup, setHeuresSup] = useState(false);
  const [heuresSupValue, setHeuresSupValue] = useState('0');
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('salary-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2
  });

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSalary(salaryInput);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [salaryInput]);

  const getPlafondBase = (base: string, brutMensuel: number, plafondMensuel: number): number => {
    switch(base) {
      case 'total': return brutMensuel;
      case 'plafond': return Math.min(brutMensuel, plafondMensuel);
      case 'plafond4': return Math.min(brutMensuel, plafondMensuel * 4);
      case 'plafond8': return Math.min(brutMensuel, plafondMensuel * 8);
      case 'tranche2': return Math.max(0, Math.min(brutMensuel, plafondMensuel * 8) - plafondMensuel);
      case 'csg': return brutMensuel * 0.9825;
      case 'primes': return brutMensuel * 0.2;
      default: return brutMensuel;
    }
  };

  const calculateCotisations = (brutMensuel: number, stat: Status, reg: string): CotisationsResult => {
    const cotisationsConfig = COTISATIONS[stat];
    const plafondMensuel = PLAFOND_SS_MENSUEL;
    let tauxSupplementaire = reg === 'alsace-moselle' ? 1.30 : 0;

    let totalSalariales = 0;
    let totalPatronales = 0;
    const detailSalariales: Cotisation[] = [];
    const detailPatronales: Cotisation[] = [];

    cotisationsConfig.salariales.forEach(cot => {
      const base = getPlafondBase(cot.base, brutMensuel, plafondMensuel);
      const montant = base * (cot.taux / 100);
      if (montant > 0) {
        totalSalariales += montant;
        detailSalariales.push({ ...cot, base, montant });
      }
    });

    if (tauxSupplementaire > 0) {
      const montant = brutMensuel * (tauxSupplementaire / 100);
      totalSalariales += montant;
      detailSalariales.push({
        nom: 'Cotisation maladie Alsace-Moselle',
        taux: tauxSupplementaire,
        base: brutMensuel,
        montant
      });
    }

    cotisationsConfig.patronales.forEach(cot => {
      const base = getPlafondBase(cot.base, brutMensuel, plafondMensuel);
      const montant = base * (cot.taux / 100);
      if (montant > 0) {
        totalPatronales += montant;
        detailPatronales.push({ ...cot, base, montant });
      }
    });

    return { totalSalariales, totalPatronales, detailSalariales, detailPatronales };
  };

  const brutToNet = (brutMensuel: number, stat: Status, reg: string, rate: number): CalculationResult => {
    const cotisations = calculateCotisations(brutMensuel, stat, reg);
    const netAvantImpot = brutMensuel - cotisations.totalSalariales;
    const impot = netAvantImpot * (rate / 100);
    const netApresImpot = netAvantImpot - impot;

    return { brut: brutMensuel, netAvantImpot, impot, netApresImpot, cotisations };
  };

  const netToBrut = (netSouhaite: number, stat: Status, reg: string, rate: number): CalculationResult => {
    let brut = netSouhaite * 1.3;
    let iterations = 0;
    const maxIterations = 50;
    const tolerance = 0.01;

    while (iterations < maxIterations) {
      const res = brutToNet(brut, stat, reg, rate);
      const diff = netSouhaite - res.netApresImpot;
      if (Math.abs(diff) < tolerance) break;
      brut += diff * 0.8;
      iterations++;
    }

    return brutToNet(brut, stat, reg, rate);
  };

  useEffect(() => {
    const salaryValue = parseFloat(debouncedSalary) || 0;
    if (salaryValue <= 0) {
      setResult(null);
      return;
    }

    let salaireMensuel = salaryValue;
    switch(period) {
      case 'yearly': salaireMensuel = salaryValue / 12; break;
      case 'daily': salaireMensuel = salaryValue * (JOURS_TRAVAILLES_AN / 12); break;
      case 'hourly': salaireMensuel = salaryValue * parseFloat(hoursWeek) * (SEMAINES_AN / 12); break;
    }

    let res: CalculationResult;
    if (currentMode === 'brut-to-net') {
      res = brutToNet(salaireMensuel, status, region, parseFloat(taxRate));
      const autoRate = getTaxRateByIncome(res.netAvantImpot, region);
      if (autoRate.toString() !== taxRate) {
        setTaxRate(autoRate.toString());
      }
      res = brutToNet(salaireMensuel, status, region, autoRate);
    } else {
      res = netToBrut(salaireMensuel, status, region, parseFloat(taxRate));
    }

    setResult(res);
  }, [debouncedSalary, period, status, region, hoursWeek, currentMode, taxRate]);

  const showToast = (message: string, type: string = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const saveCalculation = () => {
    const salaryValue = parseFloat(salaryInput) || 0;
    if (salaryValue <= 0) {
      showToast('Veuillez entrer un salaire valide', 'error');
      return;
    }

    if (!result) return;

    const calculation: HistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      mode: currentMode,
      input: salaryValue,
      period,
      status,
      brut: result.brut,
      net: result.netApresImpot
    };

    const newHistory = [calculation, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('salary-history', JSON.stringify(newHistory));
    showToast('Calcul sauvegardé !', 'success');

    trackCalculationSaved(currentMode, result.brut);
  };

  const deleteCalculation = (id: number) => {
    const newHistory = history.filter(c => c.id !== id);
    setHistory(newHistory);
    localStorage.setItem('salary-history', JSON.stringify(newHistory));
    showToast('Calcul supprimé', 'success');
  };

  const loadCalculation = (id: number) => {
    const calc = history.find(c => c.id === id);
    if (!calc) return;

    setCurrentMode(calc.mode as 'brut-to-net' | 'net-to-brut');
    setSalaryInput(calc.input.toString());
    setPeriod(calc.period as Period);
    setStatus(calc.status as Status);
    showToast('Calcul chargé !', 'success');
  };

  const shareCalculation = () => {
    if (!result) return;
    const params = new URLSearchParams({
      mode: currentMode,
      salary: salaryInput,
      period: period,
      status: status,
      region: region,
    });
    const shareUrl = `${window.location.origin}?${params.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Lien copié dans le presse-papiers !', 'success');
    }).catch(() => {
      showToast('Erreur lors de la copie', 'error');
    });
  };

  const resetForm = () => {
    setSalaryInput(SMIC_MENSUEL.toString());
    setPeriod('monthly');
    setStatus('non-cadre');
    setRegion('metropole');
    setTaxRate('0');
    setHoursWeek('35');
    setMutuelle(false);
    setTransport(false);
    setTicketsResto(false);
    setHeuresSup(false);
    setHeuresSupValue('0');
    setCurrentMode('brut-to-net');
    showToast('Formulaire réinitialisé', 'success');
  };

  const setSalaryReference = (amount: number) => {
    setSalaryInput(amount.toString());
  };

  const getComparisonValues = () => {
    if (!result) return { hourly: 0, daily: 0, monthly: 0, yearly: 0 };
    const hours = parseFloat(hoursWeek) || 35;
    return {
      hourly: result.brut / (hours * SEMAINES_AN / 12),
      daily: result.brut / (JOURS_TRAVAILLES_AN / 12),
      monthly: result.brut,
      yearly: result.brut * 12
    };
  };

  const comp = getComparisonValues();

  const handleSelectPost = (post: BlogPostData) => {
    setSelectedPost(post);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentView('blog');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCalculator = () => {
    setCurrentView('calculator');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139, 92, 246, 0.1), transparent)' }} />

      <div className="app-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Navigation Header */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={handleBackToCalculator}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>💰</div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Calculateur Salaire</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleBackToCalculator}
              style={{
                padding: '0.75rem 1.5rem',
                background: currentView === 'calculator' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--bg-secondary)',
                color: currentView === 'calculator' ? 'white' : 'var(--text-primary)',
                border: currentView === 'calculator' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              Calculateur
            </button>
            <button
              onClick={() => setCurrentView('blog')}
              style={{
                padding: '0.75rem 1.5rem',
                background: currentView === 'blog' || currentView === 'article' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--bg-secondary)',
                color: currentView === 'blog' || currentView === 'article' ? 'white' : 'var(--text-primary)',
                border: currentView === 'blog' || currentView === 'article' ? 'none' : '1px solid var(--border-color)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              Blog
            </button>
          </div>
        </nav>

        {currentView === 'article' && selectedPost ? (
          <BlogPost post={selectedPost} onBack={handleBackToBlog} />
        ) : currentView === 'blog' ? (
          <BlogList posts={blogPosts} onSelectPost={handleSelectPost} />
        ) : (
          <>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '1.5rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', boxShadow: '0 0 60px rgba(59, 130, 246, 0.15)' }}>💰</div>
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Calculateur Salaire</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Convertissez instantanément votre salaire brut en net (et vice versa) avec précision. Taux 2026 actualisés pour la France.</p>
        </header>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', background: 'var(--bg-card)', padding: '0.5rem', borderRadius: '16px', maxWidth: '500px', margin: '0 auto 2rem', border: '1px solid var(--border-color)' }}>
          <button className="mode-btn active" onClick={() => setCurrentMode('brut-to-net')} style={{ padding: '1rem 1.5rem', border: 'none', background: currentMode === 'brut-to-net' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: currentMode === 'brut-to-net' ? 'white' : 'var(--text-secondary)', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', borderRadius: '12px', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1 }}>
            <span>📊</span> Brut → Net
          </button>
          <button onClick={() => setCurrentMode('net-to-brut')} style={{ padding: '1rem 1.5rem', border: 'none', background: currentMode === 'net-to-brut' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: currentMode === 'net-to-brut' ? 'white' : 'var(--text-secondary)', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', borderRadius: '12px', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1 }}>
            <span>🔄</span> Net → Brut
          </button>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Input Card */}
          <div className="card">
            <div className="section-header">
              <div className="icon-badge">⚙️</div>
              <div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.375rem', fontWeight: 700 }}>Paramètres</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Configurez votre situation</p>
              </div>
            </div>

            {/* Salary References */}
            <div style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05))', borderRadius: '16px', border: '1.5px solid rgba(59, 130, 246, 0.2)' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Références</label>
              <div className="ref-grid">
                {[
                  { label: 'SMIC', value: SMIC_MENSUEL, desc: 'Minimum' },
                  { label: 'Médian', value: SALAIRE_MEDIAN_FRANCE, desc: '50% gagnent plus' },
                  { label: 'Moyen', value: SALAIRE_MOYEN_FRANCE, desc: 'Moyenne' },
                  { label: 'Cadre', value: 3500, desc: 'Repère' }
                ].map((ref, idx) => (
                  <button key={idx} onClick={() => setSalaryReference(ref.value)} style={{ padding: '0.625rem 0.75rem', background: salaryInput === ref.value.toString() ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--bg-card)', border: salaryInput === ref.value.toString() ? 'none' : '1px solid var(--border-color)', borderRadius: '10px', color: salaryInput === ref.value.toString() ? 'white' : 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: salaryInput === ref.value.toString() ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none', fontSize: '0.85rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ref.label}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.15rem' }}>{ref.value.toLocaleString('fr-FR')}€</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.1rem' }}>{ref.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span>{currentMode === 'brut-to-net' ? 'Salaire brut' : 'Salaire net souhaité'}</span>
                <InfoTooltip text={currentMode === 'brut-to-net' ? 'Salaire avant déduction des cotisations sociales et impôts' : 'Salaire que vous souhaitez recevoir en net'} />
              </label>
              <div style={{ position: 'relative' }}>
                <input type="number" value={salaryInput} onChange={e => setSalaryInput(e.target.value)} placeholder="3000" style={{ width: '100%', padding: '1rem 4rem 1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem', transition: 'all 0.3s ease' }} />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 500 }}>€</span>
              </div>
            </div>

            <div className="two-col-grid" style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Période</label>
                <select value={period} onChange={e => setPeriod(e.target.value as Period)} style={{ width: '100%', padding: '1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem', paddingRight: '3rem' }}>
                  <option value="monthly">Mensuel</option>
                  <option value="yearly">Annuel</option>
                  <option value="daily">Journalier</option>
                  <option value="hourly">Horaire</option>
                </select>
              </div>
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Statut</label>
                <select value={status} onChange={e => setStatus(e.target.value as Status)} style={{ width: '100%', padding: '1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem', paddingRight: '3rem' }}>
                  <option value="non-cadre">CDI Non-cadre (-22%)</option>
                  <option value="cadre">CDI Cadre (-25%)</option>
                  <option value="cadre-superieur">CDI Cadre supérieur (-27%)</option>
                  <option value="fonction-publique">Fonction publique (-17%)</option>
                  <option value="agent-contractuel">Agent contractuel (-20%)</option>
                  <option value="profession-liberale">Profession libérale (-22%)</option>
                  <option value="micro-entrepreneur">Auto-entrepreneur (-22%)</option>
                  <option value="apprenti">Apprenti (-9%)</option>
                  <option value="stagiaire">Stagiaire (-10%)</option>
                </select>
              </div>
            </div>

            <div className="two-col-grid" style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Heures/semaine</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" value={hoursWeek} onChange={e => setHoursWeek(e.target.value)} min="1" max="48" style={{ width: '100%', padding: '1rem 4rem 1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem' }} />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 500 }}>h</span>
                </div>
              </div>
              <div style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Région</label>
                <select value={region} onChange={e => setRegion(e.target.value)} style={{ width: '100%', padding: '1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem', paddingRight: '3rem' }}>
                  <option value="metropole">France métropolitaine</option>
                  <option value="alsace-moselle">Alsace-Moselle</option>
                  <option value="dom">DOM-TOM</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span>Taux de prélèvement à la source</span>
                <InfoTooltip text="Calculé automatiquement selon le barème fiscal 2026. Vous pouvez le modifier manuellement pour personnaliser le calcul selon votre situation." />
              </label>
              <div style={{ position: 'relative' }}>
                <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} min="0" max="45" step="0.1" style={{ width: '100%', padding: '1rem 4rem 1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem' }} />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 500 }}>%</span>
              </div>
            </div>

            {/* Toggles */}
            <ToggleGroup label="🏠" title="Mutuelle d'entreprise" subtitle="Part salariale ~25€/mois" checked={mutuelle} onChange={setMutuelle} />
            <ToggleGroup label="🚇" title="Remboursement transport" subtitle={`~${TRANSPORT_REIMBURSE}€/mois`} checked={transport} onChange={setTransport} />
            <ToggleGroup label="🍽️" title="Tickets restaurant" subtitle="Part salariale ~4€/jour" checked={ticketsResto} onChange={setTicketsResto} />
            {!['stagiaire', 'apprenti', 'micro-entrepreneur', 'profession-liberale'].includes(status) && (
              <>
                <ToggleGroup label="⏰" title="Heures supplémentaires défiscalisées" subtitle="Exonération jusqu'à 7500€/an" checked={heuresSup} onChange={setHeuresSup} />
                {heuresSup && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Montant heures sup. mensuelles</label>
                    <div style={{ position: 'relative' }}>
                      <input type="number" value={heuresSupValue} onChange={e => setHeuresSupValue(e.target.value)} min="0" style={{ width: '100%', padding: '1rem 4rem 1rem 1.25rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem' }} />
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 500 }}>€</span>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Results Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(59, 130, 246, 0.05) 100%)' }}>
            <div className="section-header">
              <div className="icon-badge">📈</div>
              <div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.375rem', fontWeight: 700 }}>Résultats</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Votre salaire calculé</p>
              </div>
            </div>

            {result ? (
              <>
                <div className="three-col-grid" style={{ marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Brut</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.25rem' }}>
                      {formatter.format(result.brut)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>par mois</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Net après impôt</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>
                      {formatter.format(result.netApresImpot)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>par mois</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Différence</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.25rem' }}>
                      {formatter.format(result.brut - result.netApresImpot)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{((1 - result.netApresImpot / result.brut) * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <div className="two-col-grid" style={{ marginBottom: '1.5rem' }}>
                  <ResultItem label="Salaire brut" value={formatter.format(result.brut)} sub={formatter.format(result.brut * 12) + ' / an'} />
                  <ResultItem label="Salaire net avant impôt" value={formatter.format(result.netAvantImpot)} sub={formatter.format(result.netAvantImpot * 12) + ' / an'} />
                  <ResultItem label="Prélèvement à la source" value={formatter.format(result.impot)} sub={`Taux: ${taxRate}%`} />
                  <ResultItem label="Salaire net après impôt" value={formatter.format(result.netApresImpot)} sub={formatter.format(result.netApresImpot * 12) + ' / an'} />
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>💼 Coût total employeur</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{formatter.format(result.brut + result.cotisations.totalPatronales)}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Charges patronales: {formatter.format(result.cotisations.totalPatronales)}</div>
                </div>

                <div className="two-col-grid">
                  <ResultItem label="Taux de charges salariales" value={(result.brut > 0 ? (result.cotisations.totalSalariales / result.brut * 100).toFixed(1) : 0) + ' %'} />
                  <ResultItem label="Net/Brut ratio" value={(result.brut > 0 ? (result.netApresImpot / result.brut * 100).toFixed(1) : 0) + ' %'} />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <div onClick={() => setBreakdownOpen(!breakdownOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--border-color)', transition: 'all 0.3s ease' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>📋 Détail des cotisations</h4>
                    <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'transform 0.3s ease', transform: breakdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  </div>
                  {breakdownOpen && (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)' }}>Cotisation</th>
                          <th style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)' }}>Taux</th>
                          <th style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)' }}>Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.cotisations.detailSalariales.map((cot, i) => (
                          <tr key={i}>
                            <td style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)' }}>{cot.nom}</td>
                            <td style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)' }}><span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', background: 'var(--bg-card-hover)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cot.taux.toFixed(2)}%</span></td>
                            <td style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)' }}>{formatter.format(cot.montant || 0)}</td>
                          </tr>
                        ))}
                        <tr style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                          <td style={{ padding: '0.875rem 1rem', fontWeight: 700 }}><strong>Total cotisations salariales</strong></td>
                          <td></td>
                          <td style={{ padding: '0.875rem 1rem', fontWeight: 700 }}><strong>{formatter.format(result.cotisations.totalSalariales)}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button onClick={saveCalculation} style={{ padding: '0.875rem 1.5rem', border: 'none', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                    <span>💾</span> Sauvegarder
                  </button>
                  <button onClick={shareCalculation} style={{ padding: '0.875rem 1.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔗</span> Partager
                  </button>
                  <button onClick={resetForm} style={{ padding: '0.875rem 1.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔄</span> Réinitialiser
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Entrez un salaire pour voir les résultats</div>
            )}
          </div>
        </div>

        {/* AdSense Block - Between Results and Comparison */}
        <div style={{ marginBottom: '2rem' }}>
          <AdSenseBlock adSlot="2345678901" adFormat="horizontal" />
        </div>

        {/* Comparison Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="section-header">
            <div className="icon-badge">📊</div>
            <div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.375rem', fontWeight: 700 }}>Vue d'ensemble</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Votre salaire sur différentes périodes</p>
            </div>
          </div>
          <div className="four-col-grid">
            <ComparisonItem period="Horaire" brut={comp.hourly} net={comp.hourly * (result?.netApresImpot || 1) / (result?.brut || 1)} formatter={formatter} />
            <ComparisonItem period="Journalier" brut={comp.daily} net={comp.daily * (result?.netApresImpot || 1) / (result?.brut || 1)} formatter={formatter} />
            <ComparisonItem period="Mensuel" brut={comp.monthly} net={comp.monthly * (result?.netApresImpot || 1) / (result?.brut || 1)} formatter={formatter} />
            <ComparisonItem period="Annuel" brut={comp.yearly} net={comp.yearly * (result?.netApresImpot || 1) / (result?.brut || 1)} formatter={formatter} />
          </div>
        </div>

        {/* History Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="section-header">
            <div className="icon-badge">📚</div>
            <div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.375rem', fontWeight: 700 }}>Historique</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Vos derniers calculs sauvegardés</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '64px', marginBottom: '1rem', opacity: 0.5 }}>📄</div>
                <p>Aucun calcul sauvegardé</p>
                <small>Cliquez sur "Sauvegarder" pour garder un historique</small>
              </div>
            ) : (
              history.map(calc => (
                <div key={calc.id} onClick={() => loadCalculation(calc.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{calc.mode === 'brut-to-net' ? '📊' : '🔄'}</div>
                    <div>
                      <h5 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{calc.status} {calc.period}</h5>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{calc.date}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{formatter.format(calc.brut)} brut</div>
                    <div style={{ fontWeight: 700, color: '#3b82f6' }}>{formatter.format(calc.net)} net</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteCalculation(calc.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', marginLeft: '1rem', opacity: 1, transition: 'all 0.2s ease', fontSize: '1.2rem' }} onMouseEnter={e => { (e.target as HTMLElement).style.color = '#ef4444'; }} onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-muted)'; }}>✕</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AdSense Block - Between History and Tips */}
        <div style={{ marginBottom: '2rem' }}>
          <AdSenseBlock adSlot="3456789012" adFormat="rectangle" />
        </div>

        {/* Tips Card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)', borderRadius: '24px', padding: '2rem', border: '1.5px solid rgba(16, 185, 129, 0.2)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>💡</div>
            <div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 700 }}>Conseils & Astuces</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Stratégies pour optimiser votre rémunération en 2026</p>
            </div>
          </div>
          <div className="tips-grid">
            <TipItem icon="🎯" title="Négociation salariale" text="Négociez toujours en brut annuel pour une vision claire. 100€ brut/mois = ~950€ net/an. Utilisez ce calculateur lors de discussions avec votre employeur." />
            <TipItem icon="🎁" title="Avantages en nature" text="Tickets restaurant, mutuelle, transport, chèques vacances : souvent plus avantageux fiscalement qu'une augmentation nette. À demander en priorité." />
            <TipItem icon="⏰" title="Heures supplémentaires" text="Exonérées d'impôt jusqu'à 7500€/an. Très rentable : le net augmente sans impôts supplémentaires. Excellent levier d'optimisation." />
            <TipItem icon="💰" title="Statut professionnel" text="Votre statut change les cotisations de 20-30%. Analyser cadre vs non-cadre peut faire une vraie différence sur votre revenu final." />
            <TipItem icon="🏠" title="Télétravail & déductions" text="Sans remboursement transport en télétravail? Vous perdez ~45€/mois, mais négociez une majoration salariale. Le télétravail offre aussi des avantages non monétaires." />
            <TipItem icon="📊" title="Comprendre votre fiche de paie" text="43% en moyenne quittent votre salaire brut. CSG, CRDS, retraite, assurance : connaître cette répartition vous aide à négocier efficacement." />
          </div>
        </div>

        {/* AdSense Block - Before FAQ */}
        <div style={{ marginBottom: '3rem' }}>
          <AdSenseBlock adSlot="1234567890" adFormat="auto" />
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Disclaimer Banner */}
        <div style={{ marginTop: '3rem' }}>
          <DisclaimerBanner />
        </div>

        {/* Methodology Block */}
        <MethodologyBlock />

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '1px solid var(--border-color)', marginTop: '3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => setCurrentView('blog')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              Découvrir nos articles
            </button>
          </div>
          <p>Calculateur Salaire Brut/Net France 2026 — Les calculs sont indicatifs et basés sur les taux en vigueur.</p>
          <p>Pour un calcul officiel, consultez votre service RH ou <a href="https://www.urssaf.fr" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>urssaf.fr</a></p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <a href="/politique-confidentialite" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Politique de confidentialité</a>
            <a href="/mentions-legales" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Mentions légales</a>
            <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
          </div>
        </footer>
        </>
        )}
      </div>

      {/* Toast */}
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--bg-card)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1000, transform: 'translateY(0)', opacity: 1, transition: 'all 0.3s ease' }}>
          <span style={{ color: toast.type === 'success' ? '#10b981' : '#ef4444' }}>✓</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

function ResultItem({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{value}</div>
      {sub && <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{sub}</div>}
    </div>
  );
}

function ComparisonItem({ period, brut, net, formatter }: { period: string; brut: number; net: number; formatter: Intl.NumberFormat }) {
  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-color)', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.2)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{period}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{formatter.format(brut)} brut</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>{formatter.format(net)} net</div>
    </div>
  );
}

function ToggleGroup({ label, title, subtitle, checked, onChange }: { label: string; title: string; subtitle: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span>{label}</span>
        <div>
          <span style={{ fontWeight: 500 }}>{title}</span>
          <br />
          <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{subtitle}</small>
        </div>
      </div>
      <label style={{ position: 'relative', width: '56px', height: '30px' }}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: checked ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'var(--border-color)', transition: '0.3s', borderRadius: '30px' }}>
          <span style={{ position: 'absolute', content: '""', height: '22px', width: '22px', left: checked ? '30px' : '4px', bottom: '4px', background: 'white', transition: '0.3s', borderRadius: '50%' }} />
        </span>
      </label>
    </div>
  );
}

function TipItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ width: '48px', height: '48px', minWidth: '48px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{icon}</div>
      <div>
        <h5 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h5>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</p>
      </div>
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{
          width: '18px',
          height: '18px',
          background: 'var(--bg-card-hover)',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          cursor: 'help',
          userSelect: 'none',
        }}
      >
        ?
      </div>
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 400,
            whiteSpace: 'normal',
            maxWidth: '280px',
            zIndex: 100,
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            marginBottom: '8px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default App;
