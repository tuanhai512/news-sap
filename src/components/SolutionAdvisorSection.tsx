import React, { useState } from 'react';
import { 
  Building2, 
  Factory, 
  Store, 
  Truck, 
  HardHat, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Clock, 
  DollarSign,
  FileText
} from 'lucide-react';
import { INDUSTRY_PROFILES, generateAdvisoryReport } from '../utils/solutionAdvisor.ts';
import { AdvisoryReportResult, EnterpriseSize } from '../types/sap.ts';
import { ASSET_IMAGES } from '../assets/assetPaths.ts';

interface SolutionAdvisorSectionProps {
  onOpenArticle: (item: any) => void;
}

export const SolutionAdvisorSection: React.FC<SolutionAdvisorSectionProps> = ({ onOpenArticle }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
  const [companySize, setCompanySize] = useState<EnterpriseSize>('mid-market');
  const [currentSystem, setCurrentSystem] = useState<string>('Phần mềm kế toán nội địa Misa / FAST / Excel');
  const [employeeCount, setEmployeeCount] = useState<string>('250');
  const [annualRevenue, setAnnualRevenue] = useState<string>('200 - 500 tỷ VND');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Tối ưu hóa quản lý tồn kho và giá thành',
    'Rút ngắn thời gian đóng sổ tài chính',
  ]);
  const [report, setReport] = useState<AdvisoryReportResult | null>(() => {
    return generateAdvisoryReport({
      industry: 'manufacturing',
      currentSystem: 'Phần mềm kế toán nội địa Misa / FAST / Excel',
      companySize: 'mid-market',
      employeeCount: '250',
      annualRevenue: '200 - 500 tỷ VND',
      primaryGoals: ['Tối ưu hóa quản lý tồn kho và giá thành', 'Rút ngắn thời gian đóng sổ tài chính'],
    });
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const goalOptions = [
    'Tối ưu hóa quản lý tồn kho và giá thành',
    'Rút ngắn thời gian đóng sổ tài chính',
    'Đồng bộ dữ liệu đa kênh & sàn TMĐT',
    'Chuyển đổi Clean Core & Xóa bỏ nợ kỹ thuật',
    'Chuẩn bị nâng cấp trước hạn chót 2027 của SAP ECC 6.0',
    'Ứng dụng AI Joule tự động hóa quy trình phê duyệt',
  ];

  const handleToggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goal));
      }
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    fetch('/api/sap/solution-recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        industry: selectedIndustry,
        currentSystem,
        companySize,
        employeeCount,
        annualRevenue,
        primaryGoals: selectedGoals,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.report) {
          setReport(data.report);
        }
      })
      .catch(() => {
        // Fallback local generator
        const localReport = generateAdvisoryReport({
          industry: selectedIndustry,
          currentSystem,
          companySize,
          employeeCount,
          annualRevenue,
          primaryGoals: selectedGoals,
        });
        setReport(localReport);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const industryIcon = (id: string) => {
    switch (id) {
      case 'manufacturing': return <Factory className="w-4 h-4" />;
      case 'retail-fmcg': return <Store className="w-4 h-4" />;
      case 'logistics-warehouse': return <Truck className="w-4 h-4" />;
      case 'finance-banking': return <Building2 className="w-4 h-4" />;
      case 'real-estate-construction': return <HardHat className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0070F2] mb-1">
          <span>Công cụ Tư vấn Kiến trúc & Giải pháp SAP</span>
          <span aria-hidden="true">·</span>
          <span>Dành cho Doanh nghiệp</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Bộ Định Tuyến & Đề Xuất Giải Pháp SAP Doanh Nghiệp
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Lựa chọn ngành nghề, quy mô và bài toán cốt lõi để nhận bản kiến trúc khuyến nghị chính thức: lựa chọn GROW with SAP (Public Cloud) hay RISE with SAP (Private Cloud), lộ trình Clean Core và dự phóng ROI.
        </p>
      </div>

      {/* Form Input Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Step 1: Industry Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            1. Lựa chọn Ngành nghề Hoạt động của Doanh nghiệp
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {INDUSTRY_PROFILES.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setSelectedIndustry(ind.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                  selectedIndustry === ind.id
                    ? 'border-[#0070F2] bg-sky-50/60 ring-1 ring-[#0070F2] text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg w-fit ${
                  selectedIndustry === ind.id ? 'bg-[#0070F2] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {industryIcon(ind.id)}
                </div>
                <div className="text-xs font-bold leading-snug">{ind.nameVi}</div>
                <div className="text-[11px] text-slate-400 leading-tight">{ind.nameEn}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Company Size & Current ERP System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Quy mô Doanh nghiệp
            </label>
            <div className="flex gap-2">
              {(['sme', 'mid-market', 'large-enterprise'] as EnterpriseSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setCompanySize(size)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                    companySize === size
                      ? 'border-[#0070F2] bg-sky-50 text-[#0070F2] font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  {size === 'sme' ? 'Vừa & Nhỏ (SME)' : size === 'mid-market' ? 'Quy mô Vừa' : 'Tập đoàn Lớn'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Hệ thống Quản trị / Kế toán Hiện tại
            </label>
            <select
              value={currentSystem}
              onChange={(e) => setCurrentSystem(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0070F2]"
            >
              <option value="Phần mềm kế toán nội địa Misa / FAST / Excel">Misa / FAST / Bravo / Excel</option>
              <option value="SAP ECC 6.0 EHP 6/7/8 (On-premise)">SAP ECC 6.0 (Đối mặt hạn chót 2027)</option>
              <option value="Oracle NetSuite / Microsoft Dynamics 365">Oracle / Microsoft Dynamics</option>
              <option value="Phần mềm tự phát triển nội bộ (In-house Custom)">Phần mềm In-house tự phát triển</option>
              <option value="Chưa có ERP tập trung (Phân tán nhiều phòng ban)">Chưa có ERP tập trung</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Quy mô Doanh thu & Nhân sự
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                placeholder="Số nhân sự (VD: 300)"
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0070F2]"
              />
              <input
                type="text"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                placeholder="Doanh thu/năm"
                className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0070F2]"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Strategic Goals */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            5. Các Mục tiêu Chiến lược Ưu tiên (Chọn các mục phù hợp)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {goalOptions.map((goal) => {
              const checked = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleToggleGoal(goal)}
                  className={`p-2.5 text-xs rounded-lg border text-left flex items-start gap-2 transition-colors ${
                    checked
                      ? 'border-[#0070F2] bg-sky-50/70 text-slate-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-white ${
                    checked ? 'bg-[#0070F2]' : 'border border-slate-300 bg-white'
                  }`}>
                    {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span>{goal}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trigger Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0070F2] hover:bg-[#005bbd] text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Đang tổng hợp kiến trúc SAP...' : 'Tạo Đề Xuất Kiến Trúc Giải Pháp'}</span>
          </button>
        </div>
      </div>

      {/* Report Output Presentation */}
      {report && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Executive Header Banner */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <span>Khuyến Nghị Chính Thức</span>
                <span aria-hidden="true">·</span>
                <span>{report.industryTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-bold tabular-nums">Độ phù hợp: {report.strategicFitScore}%</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Mô hình Khuyến nghị: {report.recommendedProgram}
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Phiên bản: <strong className="text-white">{report.edition}</strong>
              </p>
            </div>

            {/* Advisor portrait card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shrink-0">
              <img
                src={ASSET_IMAGES.advisorAvatar}
                alt="Chuyên gia tư vấn giải pháp SAP"
                className="w-12 h-12 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <div className="font-bold text-white">Ban Cố vấn Kiến trúc SAP</div>
                <div className="text-slate-300">Chuẩn hóa theo SAP Best Practices</div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Executive Summary */}
            <div className="p-5 rounded-xl bg-sky-50/70 border border-sky-100 text-slate-800 text-sm leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1.5">Tóm lược Chiến lược Đề xuất:</span>
              <p>{report.executiveSummary}</p>
            </div>

            {/* Architecture 4-Pillar Grid */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Kiến Trúc Hệ Thống Đề Xuất (Target Architecture)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-[#0070F2] uppercase">1. Lõi ERP Chuẩn (Clean Core)</div>
                  <div className="text-xs font-bold text-slate-900">{report.recommendedArchitecture.coreSystem}</div>
                  <p className="text-[11px] text-slate-500">Giữ nguyên bản chuẩn, tự động nâng cấp định kỳ 6 tháng/lần.</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-indigo-600 uppercase">2. Nền tảng Mở rộng (PaaS)</div>
                  <div className="text-xs font-bold text-slate-900">{report.recommendedArchitecture.extensionPlatform}</div>
                  <p className="text-[11px] text-slate-500">Phát triển ứng dụng đặc thù và kết nối hệ thống ngoài trên SAP BTP.</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-violet-600 uppercase">3. Trí tuệ Nhân tạo (AI)</div>
                  <div className="text-xs font-bold text-slate-900">{report.recommendedArchitecture.aiAutomation}</div>
                  <p className="text-[11px] text-slate-500">Trợ lý Joule phân tích tài chính, dự báo nhu cầu vật tư tự động.</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-emerald-600 uppercase">4. Tích hợp & Dữ liệu</div>
                  <div className="text-xs font-bold text-slate-900">{report.recommendedArchitecture.dataIntegration}</div>
                  <p className="text-[11px] text-slate-500">Tích hợp hóa đơn điện tử, hải quan, máy móc trạm cân không độ trễ.</p>
                </div>
              </div>
            </div>

            {/* Implementation Phases */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Lộ Trình Triển Khai 3 Giai Đoạn (SAP Activate Methodology)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.implementationPhases.map((phase, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0070F2] uppercase">Bước 0{idx + 1}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {phase.duration}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{phase.phase}</div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {phase.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected ROI Metrics */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Dự Phóng Hiệu Quả Đầu Tư (Projected Business ROI)
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-xs text-emerald-800 font-semibold mb-1">Năng suất Vận hành</div>
                  <div className="text-sm font-bold text-emerald-950">{report.projectedROI.processEfficiency}</div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div className="text-xs text-sky-800 font-semibold mb-1">Tối ưu Tồn kho</div>
                  <div className="text-sm font-bold text-sky-950">{report.projectedROI.inventoryOptimization}</div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <div className="text-xs text-indigo-800 font-semibold mb-1">Tốc độ Đóng sổ</div>
                  <div className="text-sm font-bold text-indigo-950">{report.projectedROI.financialClosingSpeed}</div>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                  <div className="text-xs text-purple-800 font-semibold mb-1">Tổng chi phí TCO</div>
                  <div className="text-sm font-bold text-purple-950">{report.projectedROI.tcoReduction}</div>
                </div>
              </div>
            </div>

            {/* Clean Core Principles */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>4 Nguyên Tắc Vàng Giữ Clean Core Cho Doanh Nghiệp</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                {report.cleanCorePrinciples.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200/80">
                    <span className="font-bold text-[#0070F2]">{idx + 1}.</span>
                    <span className="leading-relaxed">{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant SAP Official Updates */}
            {report.recommendedArticles && report.recommendedArticles.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Tài Liệu & Tin Tức SAP Chính Thức Bổ Trợ Cho Kiến Trúc Này
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.recommendedArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => onOpenArticle(art)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-[#0070F2] bg-white cursor-pointer transition-colors shadow-xs space-y-2 group"
                    >
                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>{art.source}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0070F2] transition-colors line-clamp-2">
                        {art.titleVi || art.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{art.executiveTakeawayVi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
