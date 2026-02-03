declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  console.log('[Analytics]', eventName, eventParams);
};

export const trackQuizCompleted = (score: number, totalQuestions: number) => {
  trackEvent('quiz_completed', {
    score,
    total_questions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100)
  });
};

export const trackShareClicked = (content: string, platform?: string) => {
  trackEvent('share_clicked', {
    content_type: content,
    platform: platform || 'unknown'
  });
};

export const trackCalculationSaved = (salaryType: string, amount: number) => {
  trackEvent('calculation_saved', {
    salary_type: salaryType,
    amount: Math.round(amount)
  });
};

export const trackIncreaseSimulated = (currentSalary: number, increasePercent: number) => {
  trackEvent('increase_simulated', {
    current_salary: Math.round(currentSalary),
    increase_percent: increasePercent
  });
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  console.log('[Analytics] Page view:', pagePath, pageTitle);
};

export const trackInfographicViewed = (infographicId: string) => {
  trackEvent('infographic_viewed', {
    infographic_id: infographicId
  });
};
