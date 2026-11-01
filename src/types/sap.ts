export type SAPCategory = 
  | 'all'
  | 'joule-ai'
  | 's4hana-erp'
  | 'btp-cloud'
  | 'supply-chain'
  | 'clean-core'
  | 'sustainability';

export type SAPSourceType = 
  | 'SAP News Center'
  | 'SAP Community'
  | 'SAP Road Map Explorer'
  | 'SAP Press Release'
  | 'SAP TechEd Highlights';

export type EnterpriseSize = 'sme' | 'mid-market' | 'large-enterprise';

export interface SAPNewsItem {
  id: string;
  title: string;
  titleVi: string;
  link: string;
  pubDate: string;
  source: SAPSourceType;
  category: SAPCategory;
  summary: string;
  summaryVi: string;
  executiveTakeawayVi: string;
  impactLevel: 'High' | 'Medium' | 'Strategic';
  relevantSolutions: string[];
  targetIndustries: string[];
  readTime: string;
  featured?: boolean;
}

export interface IndustryProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  iconName: string;
  commonBottlenecks: string[];
  recommendedSAPBundle: {
    coreERP: string;
    cloudProgram: 'GROW with SAP' | 'RISE with SAP';
    keyModules: string[];
    btpServices: string[];
    aiCapabilities: string[];
    timelineMonths: string;
    estimatedTCOBenefit: string;
  };
  keySuccessMetrics: string[];
}

export interface SolutionAdvisoryRequest {
  industry: string;
  currentSystem: string;
  companySize: EnterpriseSize;
  employeeCount: string;
  annualRevenue: string;
  primaryGoals: string[];
}

export interface AdvisoryReportResult {
  industryTitle: string;
  recommendedProgram: 'GROW with SAP' | 'RISE with SAP';
  edition: 'SAP S/4HANA Cloud Public Edition' | 'SAP S/4HANA Cloud Private Edition';
  strategicFitScore: number;
  executiveSummary: string;
  recommendedArchitecture: {
    coreSystem: string;
    extensionPlatform: string;
    aiAutomation: string;
    dataIntegration: string;
  };
  implementationPhases: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  cleanCorePrinciples: string[];
  projectedROI: {
    processEfficiency: string;
    inventoryOptimization: string;
    financialClosingSpeed: string;
    tcoReduction: string;
  };
  recommendedArticles: SAPNewsItem[];
}

export interface SAPReleaseMilestone {
  version: string;
  releaseDate: string;
  status: 'Current' | 'Upcoming' | 'Long-Term Support' | 'End-of-Support Warning';
  headline: string;
  keyFeatures: string[];
  cleanCoreImpact: string;
  eccDeadlineNotice?: string;
}
