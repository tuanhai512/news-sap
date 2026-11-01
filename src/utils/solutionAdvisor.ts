import { 
  IndustryProfile, 
  SolutionAdvisoryRequest, 
  AdvisoryReportResult, 
  SAPReleaseMilestone 
} from '../types/sap.ts';
import { OFFICIAL_SAP_CURATED_NEWS } from './sapParser.ts';

export const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    id: 'manufacturing',
    nameVi: 'Sản xuất & Chế tạo Công nghiệp',
    nameEn: 'Discrete & Process Manufacturing',
    iconName: 'Factory',
    commonBottlenecks: [
      'Khó kiểm soát giá thành sản xuất (Product Costing) thời gian thực',
      'Tồn kho nguyên vật liệu dư thừa hoặc đứt gãy chuyền sản xuất',
      'Lập kế hoạch sản xuất MRP thủ công, thiếu liên kết với đơn đặt hàng',
      'Định mức tiêu hao NVL (BOM) và quy trình QC kiểm soát chất lượng phân tán'
    ],
    recommendedSAPBundle: {
      coreERP: 'SAP S/4HANA Cloud (Production Planning MRP, Product Cost Controlling CO-PC, Quality Management QM)',
      cloudProgram: 'GROW with SAP',
      keyModules: ['PP (Production Planning)', 'CO-PC (Product Costing)', 'MM (Materials Management)', 'QM (Quality Management)', 'PM (Plant Maintenance)'],
      btpServices: ['SAP Integration Suite (Kết nối máy móc IoT/MES)', 'SAP Build Apps (Ứng dụng ghi nhận sản lượng tại xưởng)'],
      aiCapabilities: ['Joule for Maintenance: Dự đoán hỏng hóc máy móc', 'AI MRP: Dự báo nhu cầu vật tư tự động'],
      timelineMonths: '4 - 7 tháng',
      estimatedTCOBenefit: 'Giảm 18-24% tồn kho đệm, tính toán giá thành chính xác từng ca sản xuất'
    },
    keySuccessMetrics: ['Độ chính xác tồn kho > 99%', 'Rút ngắn chu kỳ lập lịch sản xuất 40%', 'Cắt giảm 15% phế phẩm']
  },
  {
    id: 'retail-fmcg',
    nameVi: 'Bán lẻ, FMCG & Chuỗi Cung ứng Phân phối',
    nameEn: 'Retail, Consumer Goods & Distribution',
    iconName: 'Store',
    commonBottlenecks: [
      'Số liệu tồn kho đa kênh (Omnichannel) không đồng bộ thời gian thực',
      'Khó khăn trong quản lý khuyến mãi, chiết khấu phức tạp cho đại lý',
      'Đối soát công nợ phải thu với hàng trăm siêu thị / nhà phân phối bị chậm',
      'Dự báo nhu cầu hàng hóa theo mùa vụ chưa chính xác, dẫn đến đọng vốn'
    ],
    recommendedSAPBundle: {
      coreERP: 'SAP S/4HANA Cloud Retail / Commercial Edition',
      cloudProgram: 'GROW with SAP',
      keyModules: ['SD (Sales & Distribution)', 'MM (Procurement)', 'FI-AR (Accounts Receivable & Rebate Management)', 'EWM (Extended Warehouse)'],
      btpServices: ['SAP Integration Suite (Kết nối POS, Sàn TMĐT Shopee/Lazada, Hóa đơn điện tử)', 'SAP Datasphere (Hội tụ dữ liệu bán hàng)'],
      aiCapabilities: ['Joule Demand Sensing: Dự báo xu hướng tiêu dùng theo mùa', 'Tự động đối soát công nợ đại lý'],
      timelineMonths: '4 - 6 tháng',
      estimatedTCOBenefit: 'Tăng 25% tốc độ quay vòng vốn lưu động, đối soát doanh thu tự động hàng ngày'
    },
    keySuccessMetrics: ['Đồng bộ tồn kho đa kênh < 5 giây', 'Rút ngắn đối soát công nợ đại lý 70%', 'Giảm 20% hàng hết hạn cận date']
  },
  {
    id: 'logistics-warehouse',
    nameVi: 'Kho vận, Giao nhận & Logistics (3PL/4PL)',
    nameEn: 'Transportation & Logistics',
    iconName: 'Truck',
    commonBottlenecks: [
      'Chi phí vận tải và định mức nhiên liệu khó kiểm soát chính xác',
      'Diện tích kho bãi sử dụng chưa tối ưu, sai sót khi nhặt hàng (Pick & Pack)',
      'Thiếu khả năng truy vết đơn hàng (Track & Trace) thời gian thực cho khách hàng',
      'Quy trình hải quan và chứng từ vận tải quốc tế còn nhiều thủ công'
    ],
    recommendedSAPBundle: {
      coreERP: 'SAP S/4HANA Cloud with SAP EWM & SAP Transportation Management (TM)',
      cloudProgram: 'RISE with SAP',
      keyModules: ['SAP EWM (Quản lý kho chuyên sâu)', 'SAP TM (Quản lý vận tải)', 'SAP Business Network for Logistics'],
      btpServices: ['Edge Integration Cell (Tích hợp trạm cân, Barcode scanner, RFID không phụ thuộc internet)'],
      aiCapabilities: ['Joule Dynamic Routing: Tối ưu lộ trình xe tải và xếp dỡ container'],
      timelineMonths: '6 - 9 tháng',
      estimatedTCOBenefit: 'Tối ưu 16-22% chi phí nhiên liệu và nâng công suất sử dụng diện tích kho thêm 30%'
    },
    keySuccessMetrics: ['Độ chính xác soạn hàng 99.8%', 'Theo dõi lộ trình xe 100% thời gian thực', 'Giảm 35% thời gian quay đầu xe']
  },
  {
    id: 'finance-banking',
    nameVi: 'Ngân hàng, Tài chính & Dịch vụ Chuyên nghiệp',
    nameEn: 'Financial Services & Banking',
    iconName: 'Building2',
    commonBottlenecks: [
      'Đóng sổ kế toán và lập báo cáo tài chính hợp nhất mất nhiều ngày',
      'Khó khăn trong việc áp dụng chuẩn mực kế toán quốc tế IFRS 9 / IFRS 15 / IFRS 16',
      'Dữ liệu tài chính phân tán giữa core banking và các phần mềm vệ tinh',
      'Quy trình kiểm soát tuân thủ và kiểm toán nội bộ mất nhiều công sức'
    ],
    recommendedSAPBundle: {
      coreERP: 'SAP S/4HANA Cloud (Universal Journal, Group Reporting, Advanced Financial Closing)',
      cloudProgram: 'RISE with SAP',
      keyModules: ['FI (General Ledger, AP/AR, Asset Accounting)', 'CO (Profitability Analysis CO-PA)', 'Group Reporting (Hợp nhất BCTC)', 'Treasury (Quản lý ngân quỹ)'],
      btpServices: ['SAP BTP Analytics Cloud (SAC)', 'SAP Datasphere'],
      aiCapabilities: ['Joule Financial Analyst: Tự động phân tích phương sai P&L', 'AI Document Information Extraction cho hóa đơn'],
      timelineMonths: '6 - 10 tháng',
      estimatedTCOBenefit: 'Đóng sổ tài chính trong 24 giờ, tự động hóa 80% đối chiếu giao dịch'
    },
    keySuccessMetrics: ['Đóng sổ kế toán trong vòng 2 ngày làm việc', '100% tuân thủ IFRS & VAS song song', 'Tiết kiệm 50% thời gian kiểm toán']
  },
  {
    id: 'real-estate-construction',
    nameVi: 'Bất động sản, Xây dựng & Quản lý Dự án EPC',
    nameEn: 'Real Estate & Project Construction',
    iconName: 'HardHat',
    commonBottlenecks: [
      'Vượt ngân sách dự án do không theo dõi được cam kết chi phí (Commitment)',
      'Tiến độ thi công thực tế lệch so với kế hoạch phê duyệt',
      'Quản lý hợp đồng thầu phụ, nghiệm thu giai đoạn và thanh quyết toán phức tạp',
      'Khai thác cho thuê và quản lý vận hành tòa nhà thiếu hệ thống số hóa'
    ],
    recommendedSAPBundle: {
      coreERP: 'SAP S/4HANA Cloud (Project System PS, Flexible Real Estate RE-FX, Commercial Project Management CPM)',
      cloudProgram: 'RISE with SAP',
      keyModules: ['PS (Project System)', 'RE-FX (Real Estate Management)', 'CO (Project Controlling)', 'MM (Sub-contractor Management)'],
      btpServices: ['SAP Build Process Automation (Quy trình phê duyệt hồ sơ nghiệm thu khối lượng thầu phụ)'],
      aiCapabilities: ['Joule Project Risk Advisor: Cảnh báo sớm vượt ngân sách gói thầu'],
      timelineMonths: '6 - 9 tháng',
      estimatedTCOBenefit: 'Kiểm soát 100% ngân sách theo thời gian thực, ngăn chặn thất thoát vật tư dự án'
    },
    keySuccessMetrics: ['Kiểm soát sai lệch chi phí dự án < 2%', 'Rút ngắn phê duyệt nghiệm thu 60%', 'Tối ưu hóa tỷ lệ lấp đầy mặt bằng cho thuê 15%']
  }
];

export const SAP_RELEASE_MILESTONES: SAPReleaseMilestone[] = [
  {
    version: 'SAP S/4HANA 2025 / 2026 Cloud Release',
    releaseDate: 'Tháng 02/2026',
    status: 'Current',
    headline: 'Bản phát hành điện toán đám mây tích hợp Joule Autonomous Agents và Clean Core Extensibility',
    keyFeatures: [
      'Joule Autonomous AI Agents tích hợp sẵn trong quy trình Mua hàng, Bán hàng và Quản trị Tài chính',
      'Universal Parallel Accounting hỗ trợ kế toán song song VAS (Việt Nam) và IFRS trên cùng 1 chứng từ',
      'ABAP Cloud mô hình mở rộng 3 tầng (Tier 1: Cloud-ready, Tier 2: Cloud API, Tier 3: Classic Wrapper)'
    ],
    cleanCoreImpact: 'Tiêu chuẩn vàng cho mọi dự án triển khai mới. Khuyến nghị không chỉnh sửa mã nguồn gốc ERP.'
  },
  {
    version: 'SAP S/4HANA 2024 FPS02',
    releaseDate: 'Tháng 10/2025',
    status: 'Long-Term Support',
    headline: 'Bản nâng cấp ổn định cho doanh nghiệp sản xuất và tập đoàn lớn',
    keyFeatures: [
      'Nâng cấp SAP Integration Suite với Edge Integration Cell chạy tại biên',
      'Cải tiến công cụ MRP Live tăng tốc lập kế hoạch sản xuất gấp 10 lần',
      'Bổ sung module Green Ledger hạch toán khí thải môi trường'
    ],
    cleanCoreImpact: 'Doanh nghiệp dùng bản này cần kiểm tra độ tương thích Clean Core bằng SAP Readiness Check.'
  },
  {
    version: 'SAP ECC 6.0 End-of-Support Countdown',
    releaseDate: '31/12/2027 (Mở rộng đến 2030)',
    status: 'End-of-Support Warning',
    headline: 'Hạn chót chấm dứt bảo trì tiêu chuẩn cho SAP ECC 6.0 trên toàn cầu',
    keyFeatures: [
      'SAP sẽ chính thức dừng cập nhật bản vá bảo mật và tính năng cho ECC 6.0 sau năm 2027',
      'Phí duy trì hỗ trợ mở rộng (Extended Maintenance) sẽ tăng thêm tối thiểu 2-4% mỗi năm đến 2030',
      'Hơn 70% doanh nghiệp toàn cầu đang gấp rút chuyển dịch sang SAP S/4HANA Cloud'
    ],
    cleanCoreImpact: 'Cảnh báo khẩn cấp: Thời gian trung bình để chuyển đổi một hệ thống ECC sang S/4HANA là từ 9-14 tháng. Doanh nghiệp cần bắt đầu đánh giá hiện trạng ngay hôm nay.',
    eccDeadlineNotice: 'Thời gian còn lại để chuẩn bị chuyển đổi: Khoảng 14 tháng trước khi bước vào giai đoạn gia hạn chi phí cao.'
  }
];

export function generateAdvisoryReport(req: SolutionAdvisoryRequest): AdvisoryReportResult {
  const profile = INDUSTRY_PROFILES.find(p => p.id === req.industry) || INDUSTRY_PROFILES[0];
  
  // Logic: determine GROW with SAP vs RISE with SAP
  // GROW with SAP is ideal for SMEs and fast-growing mid-market moving to Public Cloud standard Best Practices
  // RISE with SAP is ideal for large enterprises with complex landscape, existing ECC, or private cloud compliance
  const isLargeOrExisting = req.companySize === 'large-enterprise' || req.currentSystem.includes('ECC') || req.currentSystem.includes('Oracle') || req.currentSystem.includes('SAP R/3');
  const program: 'GROW with SAP' | 'RISE with SAP' = isLargeOrExisting ? 'RISE with SAP' : 'GROW with SAP';
  const edition = program === 'GROW with SAP' ? 'SAP S/4HANA Cloud Public Edition' : 'SAP S/4HANA Cloud Private Edition';

  // Calculate strategic fit score based on selected goals
  let fitScore = 92;
  if (req.primaryGoals.length >= 3) fitScore = 96;
  if (isLargeOrExisting) fitScore = 94;

  const executiveSummary = `Dựa trên hiện trạng doanh nghiệp thuộc ngành ${profile.nameVi}, quy mô ${req.companySize === 'sme' ? 'Vừa và nhỏ (SME)' : req.companySize === 'mid-market' ? 'Doanh nghiệp quy mô Vừa (Mid-Market)' : 'Tập đoàn Lớn (Enterprise)'} và đang sử dụng ${req.currentSystem}, SAP khuyến nghị mô hình chuyển đổi số ${program} trên nền tảng ${edition}. Giải pháp giúp doanh nghiệp áp dụng các quy trình chuẩn mực thế giới (Best Practices), loại bỏ hoàn toàn nợ kỹ thuật bằng chiến lược Clean Core và tận dụng trí tuệ nhân tạo SAP Joule Copilot để tối ưu vận hành.`;

  const cleanCorePrinciples = [
    'Giữ nguyên mã nguồn lõi ERP (Keep the Core Clean) - không tùy biến trực tiếp vào bảng cơ sở dữ liệu SAP chuẩn.',
    'Toàn bộ ứng dụng mở rộng hoặc báo cáo đặc thù ngành phát triển trên SAP BTP (Business Technology Platform) bằng ABAP Cloud hoặc CAP (Cloud Application Programming).',
    'Tích hợp thông qua chuẩn API và Event-driven Architecture của SAP Integration Suite, đảm bảo việc tự động nâng cấp phiên bản không gây lỗi gián đoạn.',
    'Sử dụng các công cụ kiểm toán quy trình tự động SAP Signavio để rà soát thường xuyên các điểm nghẽn.'
  ];

  const implementationPhases = [
    {
      phase: 'Giai đoạn 1: Khám phá & Chuẩn bị (Discover & Prepare)',
      duration: '4 - 6 tuần',
      deliverables: [
        'Chạy công cụ SAP Readiness Check & Process Insights đánh giá hệ thống hiện tại',
        'Xác định danh mục Best Practices kích hoạt sẵn và bản đồ tích hợp hệ thống',
        'Thành lập Ban chỉ đạo chuyển đổi số và xác định các KPI đo lường thành công'
      ]
    },
    {
      phase: 'Giai đoạn 2: Khám phá chi tiết & Cấu hình (Explore & Realize)',
      duration: isLargeOrExisting ? '12 - 16 tuần' : '8 - 12 tuần',
      deliverables: [
        'Hội thảo Fit-to-Standard (đối chiếu quy trình doanh nghiệp với chuẩn SAP)',
        'Cấu hình phân hệ tài chính, chuỗi cung ứng, kho vận và kế toán VAS/IFRS',
        'Phát triển các kết nối ngoại vi (Hóa đơn điện tử, Cổng ngân hàng, MES) qua SAP BTP',
        'Chuyển đổi và làm sạch dữ liệu danh mục (Master Data) và số dư ban đầu'
      ]
    },
    {
      phase: 'Giai đoạn 3: Kiểm thử & Đưa vào vận hành (Deploy & Run)',
      duration: '4 - 6 tuần',
      deliverables: [
        'Kiểm thử tích hợp người dùng (UAT) và diễn tập chuyển đổi (Cutover simulation)',
        'Đào tạo người dùng cuối với sự hỗ trợ của SAP Joule Copilot',
        'Go-Live chính thức và hỗ trợ ổn định giai đoạn Hypercare 30 ngày'
      ]
    }
  ];

  const relevantNews = OFFICIAL_SAP_CURATED_NEWS.filter(item => {
    return item.targetIndustries.some(ind => ind.toLowerCase().includes(profile.nameVi.toLowerCase()) || ind.includes('Tất cả')) ||
           item.category === 's4hana-erp' ||
           item.category === 'joule-ai' ||
           item.category === 'clean-core';
  }).slice(0, 3);

  return {
    industryTitle: profile.nameVi,
    recommendedProgram: program,
    edition,
    strategicFitScore: fitScore,
    executiveSummary,
    recommendedArchitecture: {
      coreSystem: edition,
      extensionPlatform: 'SAP Business Technology Platform (SAP BTP - Integration Suite, Build Code)',
      aiAutomation: 'SAP Joule Copilot & SAP Business AI Hub',
      dataIntegration: 'SAP Datasphere & Edge Integration Cell'
    },
    implementationPhases,
    cleanCorePrinciples,
    projectedROI: {
      processEfficiency: '+30% Tăng năng suất vận hành liên phòng ban',
      inventoryOptimization: 'Giảm 15% - 22% giá trị tồn kho đọng vốn',
      financialClosingSpeed: 'Rút ngắn thời gian đóng sổ từ 10 ngày xuống 2 ngày',
      tcoReduction: 'Tiết kiệm 28% tổng chi phí sở hữu (TCO) sau 3 năm'
    },
    recommendedArticles: relevantNews
  };
}
