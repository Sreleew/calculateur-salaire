import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Share2, ArrowRight, Briefcase, DollarSign, MapPin, Building2, Clock } from 'lucide-react';
import { salaryDatabase, locationMultiplier, companySizeMultiplier } from '../data/salaryData';
import { trackQuizCompleted } from '../utils/analytics';

interface QuizData {
  job: string;
  salary: number;
  experience: string;
  location: string;
  companySize: string;
}

interface AnalysisResult {
  marketSalary: number;
  difference: number;
  percentage: number;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  title: string;
  description: string;
  advice: string;
  icon: 'up' | 'down' | 'neutral';
}

const experienceLevels = [
  { value: 'junior', label: 'Junior (0-3 ans)' },
  { value: 'intermediate', label: 'Intermédiaire (3-7 ans)' },
  { value: 'senior', label: 'Senior (7+ ans)' }
];

const jobs = salaryDatabase.map(s => s.job).sort();
const locations = Object.keys(locationMultiplier);
const companySizes = Object.keys(companySizeMultiplier);

function calculateMarketSalary(data: QuizData): number {
  const jobData = salaryDatabase.find(j => j.job === data.job);
  if (!jobData) return 0;

  const experienceData = jobData[data.experience as keyof typeof jobData] as { median: number };
  const baseSalary = experienceData.median;

  const locationFactor = locationMultiplier[data.location] || 1;
  const companyFactor = companySizeMultiplier[data.companySize] || 1;

  return Math.round(baseSalary * locationFactor * companyFactor);
}

function analyzePosition(data: QuizData): AnalysisResult {
  const marketSalary = calculateMarketSalary(data);
  const difference = data.salary - marketSalary;
  const percentage = Math.round((difference / marketSalary) * 100);

  if (percentage >= 10) {
    return {
      marketSalary,
      difference,
      percentage,
      status: 'excellent',
      title: 'Excellent ! Vous êtes au-dessus du marché',
      description: `Votre salaire de ${data.salary.toLocaleString('fr-FR')}€ est ${percentage}% au-dessus de la médiane du marché pour votre profil (${marketSalary.toLocaleString('fr-FR')}€). Vous êtes très bien valorisé(e) dans votre entreprise.`,
      advice: 'Continuez à développer vos compétences et à suivre l\'évolution du marché. Pensez à documenter vos réussites pour vos futures négociations.',
      icon: 'up'
    };
  } else if (percentage >= 0) {
    return {
      marketSalary,
      difference,
      percentage,
      status: 'good',
      title: 'Bien ! Vous êtes dans la moyenne du marché',
      description: `Votre salaire de ${data.salary.toLocaleString('fr-FR')}€ est aligné avec la médiane du marché (${marketSalary.toLocaleString('fr-FR')}€). Vous êtes correctement rémunéré(e) selon les standards actuels.`,
      advice: 'Restez vigilant(e) sur l\'évolution des salaires dans votre secteur. Une augmentation annuelle de 3-5% minimum est recommandée pour suivre l\'inflation.',
      icon: 'neutral'
    };
  } else if (percentage >= -10) {
    return {
      marketSalary,
      difference,
      percentage,
      status: 'fair',
      title: 'Attention ! Vous êtes légèrement en-dessous',
      description: `Votre salaire de ${data.salary.toLocaleString('fr-FR')}€ est ${Math.abs(percentage)}% en-dessous de la médiane du marché (${marketSalary.toLocaleString('fr-FR')}€). Vous perdez environ ${Math.abs(difference).toLocaleString('fr-FR')}€ par an.`,
      advice: 'Préparez un dossier solide avec vos réalisations et demandez un entretien pour négocier une augmentation. Le moment idéal est lors de votre entretien annuel.',
      icon: 'down'
    };
  } else if (percentage >= -20) {
    return {
      marketSalary,
      difference,
      percentage,
      status: 'poor',
      title: 'Alerte ! Vous êtes clairement sous-payé(e)',
      description: `Votre salaire de ${data.salary.toLocaleString('fr-FR')}€ est ${Math.abs(percentage)}% en-dessous de la médiane du marché (${marketSalary.toLocaleString('fr-FR')}€). Vous perdez ${Math.abs(difference).toLocaleString('fr-FR')}€ par an, soit ${Math.round(Math.abs(difference) / 12).toLocaleString('fr-FR')}€ par mois.`,
      advice: 'Action urgente recommandée : soit négociez une revalorisation significative avec preuves de marché à l\'appui, soit explorez activement les opportunités externes.',
      icon: 'down'
    };
  } else {
    return {
      marketSalary,
      difference,
      percentage,
      status: 'critical',
      title: 'Situation critique ! Action immédiate nécessaire',
      description: `Votre salaire de ${data.salary.toLocaleString('fr-FR')}€ est ${Math.abs(percentage)}% en-dessous de la médiane du marché (${marketSalary.toLocaleString('fr-FR')}€). Vous perdez ${Math.abs(difference).toLocaleString('fr-FR')}€ par an, soit ${Math.round(Math.abs(difference) / 12).toLocaleString('fr-FR')}€ par mois !`,
      advice: 'Situation non viable à long terme. Nous vous recommandons vivement d\'explorer le marché de l\'emploi. Votre profil mérite bien mieux. Préparez votre CV et commencez vos recherches dès maintenant.',
      icon: 'down'
    };
  }
}

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<Partial<QuizData>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const updateData = (field: keyof QuizData, value: string | number) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const data = quizData as QuizData;
      const analysis = analyzePosition(data);
      setResult(analysis);
      setStep(6);

      trackQuizCompleted(data.salary, analysis.marketSalary);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(1);
    setQuizData({});
    setResult(null);
  };

  const shareResult = () => {
    if (!result) return;
    const text = `J'ai analysé mon salaire et le résultat est : ${result.title}`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title: 'Analyse de Salaire', text, url });
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return !!quizData.job;
      case 2: return !!quizData.salary && quizData.salary > 0;
      case 3: return !!quizData.experience;
      case 4: return !!quizData.location;
      case 5: return !!quizData.companySize;
      default: return false;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500', icon: 'text-green-600' };
      case 'good': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500', icon: 'text-blue-600' };
      case 'fair': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500', icon: 'text-yellow-600' };
      case 'poor': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500', icon: 'text-orange-600' };
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500', icon: 'text-red-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-500', icon: 'text-gray-600' };
    }
  };

  if (step === 6 && result) {
    const colors = getStatusColor(result.status);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '3rem 1rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            padding: '3rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                marginBottom: '1.5rem'
              }} className={colors.bg}>
                {result.icon === 'up' && <TrendingUp className={`w-10 h-10 ${colors.icon}`} />}
                {result.icon === 'down' && <TrendingDown className={`w-10 h-10 ${colors.icon}`} />}
                {result.icon === 'neutral' && <Minus className={`w-10 h-10 ${colors.icon}`} />}
              </div>

              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                {result.title}
              </h1>

              <div style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '2rem'
              }} className={`${colors.bg} ${colors.text}`}>
                {result.percentage > 0 ? '+' : ''}{result.percentage}% vs marché
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                borderRadius: '15px',
                padding: '2rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Votre salaire
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {quizData.salary?.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Médiane du marché
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {result.marketSalary.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Différence annuelle
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: result.difference >= 0 ? '#10b981' : '#ef4444'
                    }}>
                      {result.difference > 0 ? '+' : ''}{result.difference.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'var(--bg-primary)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  <strong>Profil analysé :</strong> {quizData.job} • {experienceLevels.find(e => e.value === quizData.experience)?.label} • {quizData.location} • {quizData.companySize}
                </div>
              </div>

              <div style={{
                background: 'var(--bg-tertiary)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Analyse détaillée
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {result.description}
                </p>
              </div>

              <div style={{
                borderRadius: '15px',
                padding: '1.5rem',
                borderLeft: '4px solid var(--primary-color)',
                marginBottom: '1.5rem'
              }} className={colors.bg}>
                <h2 style={{
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem'
                }} className={colors.text}>
                  Notre recommandation
                </h2>
                <p style={{ lineHeight: '1.6' }} className={colors.text}>
                  {result.advice}
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '15px',
                padding: '2rem',
                color: 'white'
              }}>
                <h3 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '1rem' }}>
                  🎁 Guide gratuit : Négocier son salaire
                </h3>
                <p style={{ marginBottom: '1.5rem', opacity: 0.95 }}>
                  Téléchargez notre guide complet (25 pages) pour préparer votre négociation avec méthode et arguments concrets.
                </p>
                <button style={{
                  background: 'white',
                  color: '#3b82f6',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s'
                }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  Télécharger le guide gratuit
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={shareResult}
                style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Share2 style={{ width: '20px', height: '20px' }} />
                Partager mon résultat
              </button>

              <button
                onClick={reset}
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Refaire l'analyse
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a href="/" style={{
                color: 'var(--primary-color)',
                fontWeight: '500',
                textDecoration: 'none'
              }}>
                ← Retour aux calculateurs
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = (step / 5) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '3rem 1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Êtes-vous bien payé(e) ?
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)'
          }}>
            Analysez votre salaire en 5 questions
          </p>
        </div>

        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              marginBottom: '0.5rem'
            }}>
              <span>Question {step}/5</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  borderRadius: '10px',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <div style={{ minHeight: '400px' }}>
            {step === 1 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Briefcase style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    Quel est votre métier ?
                  </h2>
                </div>

                <select
                  value={quizData.job || ''}
                  onChange={(e) => updateData('job', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Sélectionnez votre métier</option>
                  {jobs.map(job => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    Quel est votre salaire brut annuel ?
                  </h2>
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={quizData.salary || ''}
                    onChange={(e) => updateData('salary', parseInt(e.target.value) || 0)}
                    placeholder="Ex: 35000"
                    style={{
                      width: '100%',
                      padding: '1rem 3rem 1rem 1rem',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: '2px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.25rem',
                    color: 'var(--text-tertiary)',
                    fontWeight: '600'
                  }}>
                    € / an
                  </span>
                </div>
                <p style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-tertiary)'
                }}>
                  Indiquez votre salaire brut annuel (avant impôts et charges)
                </p>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    Quelle est votre expérience ?
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => updateData('experience', level.value)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: quizData.experience === level.value
                          ? '2px solid var(--primary-color)'
                          : '2px solid var(--border-color)',
                        background: quizData.experience === level.value
                          ? 'var(--primary-color)'
                          : 'var(--bg-tertiary)',
                        color: quizData.experience === level.value
                          ? 'white'
                          : 'var(--text-primary)',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    Où travaillez-vous ?
                  </h2>
                </div>

                <select
                  value={quizData.location || ''}
                  onChange={(e) => updateData('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Sélectionnez votre localisation</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            )}

            {step === 5 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Building2 style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    Taille de votre entreprise ?
                  </h2>
                </div>

                <select
                  value={quizData.companySize || ''}
                  onChange={(e) => updateData('companySize', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: '2px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Sélectionnez la taille</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            {step > 1 ? (
              <button
                onClick={prevStep}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ← Précédent
              </button>
            ) : <div />}

            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '10px',
                background: isStepValid() ? 'var(--primary-color)' : 'var(--bg-tertiary)',
                color: isStepValid() ? 'white' : 'var(--text-tertiary)',
                border: 'none',
                fontWeight: '600',
                cursor: isStepValid() ? 'pointer' : 'not-allowed',
                opacity: isStepValid() ? 1 : 0.5
              }}
            >
              {step === 5 ? 'Voir mon résultat →' : 'Suivant →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
