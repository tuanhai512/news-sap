export type SAPFunctionalModule = 'SD' | 'MM' | 'PP' | 'FI-CO' | 'EWM';

export interface AccountingPosting {
  accountName: string;
  accountNumber: string;
  debitCredit: 'Nợ (Debit)' | 'Có (Credit)';
  amount: string;
  ledger: '0L (Chuẩn VAS Việt Nam)' | '2L (Chuẩn quốc tế IFRS)' | 'Cả hai';
}

export interface FunctionalStep {
  stepNumber: number;
  stepName: string;
  role: string;
  fioriApp: string;
  tCode: string;
  descriptionVi: string;
  documentGenerated: string;
  jouleAiAssistantRole: string;
  accountingPostings?: AccountingPosting[];
  sampleData: {
    label: string;
    value: string;
  }[];
}

export interface FunctionalScenario {
  id: string;
  module: SAPFunctionalModule;
  scopeItemCode: string; // e.g. BD9, J45, BJ5
  titleVi: string;
  titleEn: string;
  businessContextVi: string;
  businessBenefitVi: string;
  targetIndustries: string[];
  steps: FunctionalStep[];
}
