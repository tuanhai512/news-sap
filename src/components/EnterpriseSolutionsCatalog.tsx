import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  Boxes, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { ASSET_IMAGES } from '../assets/assetPaths.ts';

interface EnterpriseSolutionsCatalogProps {
  onOpenAdvisorModal: () => void;
  onFilterNewsByCategory: (cat: string) => void;
}

export const EnterpriseSolutionsCatalog: React.FC<EnterpriseSolutionsCatalogProps> = ({
  onOpenAdvisorModal,
  onFilterNewsByCategory,
}) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('joule-ai');

  const solutions = [
    {
      id: 'joule-ai',
      categoryKey: 'joule-ai',
      name: 'SAP Joule & Business AI Hub',
      badge: 'Trí Tuệ Nhân Tạo Doanh Nghiệp',
      tagline: 'Trợ lý AI tự trị (Autonomous Agents) thấu hiểu bối cảnh dữ liệu doanh nghiệp sâu sắc',
      description: 'Joule không chỉ là chatbot thông thường, mà là một đồng minh công nghệ được nhúng trực tiếp vào toàn bộ luồng quy trình của SAP S/4HANA, SuccessFactors và Ariba. Joule thấu hiểu cấu trúc sổ cái, đơn hàng và bảng lương để tự động hóa nghiệp vụ an toàn.',
      keyCapabilities: [
        'Truy vấn báo cáo P&L và đối chiếu công nợ bằng câu lệnh ngôn ngữ tự nhiên tiếng Việt hoặc tiếng Anh',
        'Tự động lập thảo đơn hàng mua (PO) và phân tích sai lệch giá nhà cung cấp',
        'Bảo mật dữ liệu tuyệt đối: dữ liệu doanh nghiệp không bao giờ bị dùng để huấn luyện mô hình công cộng'
      ],
      idealFor: 'Doanh nghiệp muốn cắt giảm 40-60% thời gian xử lý thủ công của bộ phận kế toán, mua hàng và nhân sự.',
      image: ASSET_IMAGES.jouleAi,
      officialLink: 'https://www.sap.com/products/artificial-intelligence.html'
    },
    {
      id: 's4hana-cloud',
      categoryKey: 's4hana-erp',
      name: 'SAP S/4HANA Cloud (Public & Private)',
      badge: 'ERP Lõi Thế Hệ Mới',
      tagline: 'Hệ thống hoạch định nguồn lực doanh nghiệp số 1 thế giới vận hành trên cơ sở dữ liệu in-memory SAP HANA',
      description: 'Hỗ trợ quản trị toàn diện: Kế toán Tài chính (FI), Quản trị Chi phí (CO), Mua hàng (MM), Quản lý Kho chuyên sâu (EWM), Bán hàng & Phân phối (SD) và Sản xuất (PP) theo chuẩn mực kế toán kép VAS và IFRS.',
      keyCapabilities: [
        'Đóng sổ kế toán tài chính thời gian thực với Universal Journal độc quyền',
        'Hơn 120 kịch bản Best Practices cấu hình sẵn, đẩy nhanh tiến độ triển khai chỉ từ 4 tháng',
        'Kiến trúc Clean Core đảm bảo nâng cấp mượt mà không lo đứt gãy tùy biến'
      ],
      idealFor: 'Doanh nghiệp muốn xây dựng nền móng quản trị vững chắc để mở rộng chuỗi, IPO hoặc thu hút vốn đầu tư ngoại.',
      image: ASSET_IMAGES.cleanCoreArchitecture,
      officialLink: 'https://www.sap.com/products/erp/s4hana.html'
    },
    {
      id: 'sap-btp',
      categoryKey: 'btp-cloud',
      name: 'SAP Business Technology Platform (BTP)',
      badge: 'Nền Tảng Đám Mây Mở Rộng',
      tagline: 'Trục xương sống tích hợp, phân tích dữ liệu và phát triển ứng dụng mở rộng Clean Core',
      description: 'SAP BTP cho phép doanh nghiệp kết nối liền mạch ERP với mọi ứng dụng ngoại vi: Hóa đơn điện tử Viettel/VNPT/Misa, Cổng ngân hàng Vietcombank/BIDV, POS bán lẻ và máy móc nhà xưởng qua SAP Integration Suite.',
      keyCapabilities: [
        'SAP Integration Suite: Hàng ngàn API và luồng tích hợp dựng sẵn (Pre-built Integrations)',
        'SAP Build: Nền tảng Low-code / No-code cho phép phòng ban nghiệp vụ tự tạo app phê duyệt trên điện thoại',
        'Edge Integration Cell: Chạy luồng tích hợp an toàn ngay tại trung tâm dữ liệu tại Việt Nam'
      ],
      idealFor: 'Giám đốc CNTT (CIO) cần giải quyết bài toán tích hợp phức tạp giữa SAP và các phần mềm vệ tinh nội địa.',
      image: ASSET_IMAGES.heroBanner,
      officialLink: 'https://www.sap.com/products/technology-platform.html'
    },
    {
      id: 'signavio-leanix',
      categoryKey: 'clean-core',
      name: 'SAP Signavio & LeanIX',
      badge: 'Quản Trị Kiến Trúc & Quy Trình',
      tagline: 'Khai phá quy trình (Process Mining) và tối ưu hóa danh mục ứng dụng toàn doanh nghiệp',
      description: 'Bộ công cụ của SAP giúp doanh nghiệp nhìn thấy chính xác dữ liệu thực tế: khâu nào đang chậm, hóa đơn nào bị trễ, tỷ lệ sai sót ở đâu và kiến trúc CNTT cần hiện đại hóa ra sao trước khi bắt đầu dự án ERP.',
      keyCapabilities: [
        'Process Insights: Quét dữ liệu hệ thống ERP hiện tại trong 48 giờ để lập báo cáo điểm nghẽn',
        'LeanIX: Quản lý toàn bộ danh mục phần mềm và rủi ro hết hạn bảo trì CNTT',
        'Mô phỏng tác động tài chính trước khi thay đổi quy trình vận hành'
      ],
      idealFor: 'Tập đoàn chuẩn bị chuyển đổi từ SAP ECC sang S/4HANA hoặc tái cấu trúc quy trình vận hành.',
      image: ASSET_IMAGES.cleanCoreArchitecture,
      officialLink: 'https://www.sap.com/products/business-process-transformation.html'
    }
  ];

  const currentSol = solutions.find((s) => s.id === selectedSolutionId) || solutions[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0070F2] mb-1">
          <span>Hệ Sinh Thái Giải Pháp Tiêu Biểu</span>
          <span aria-hidden="true">·</span>
          <span>SAP Enterprise Suite</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Danh Mục Giải Pháp Công Nghệ Trọng Điểm Của SAP
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Khám phá các trụ cột giải pháp cốt lõi giúp các doanh nghiệp hàng đầu tối ưu hóa chi phí, chuẩn hóa số liệu tài chính và khai phóng năng lực của trí tuệ nhân tạo.
        </p>
      </div>

      {/* Solution Navigation Pills / Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {solutions.map((sol) => (
          <button
            key={sol.id}
            onClick={() => setSelectedSolutionId(sol.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedSolutionId === sol.id
                ? 'bg-[#0070F2] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{sol.name}</span>
          </button>
        ))}
      </div>

      {/* Solution Spotlight Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual asset side */}
        <div className="lg:col-span-5 relative bg-slate-900 min-h-[280px] lg:min-h-full">
          <img
            src={currentSol.image}
            alt={currentSol.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{currentSol.badge}</div>
            <div className="text-lg font-bold">{currentSol.name}</div>
          </div>
        </div>

        {/* Content details side */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold text-[#0070F2] uppercase tracking-wider mb-1">
                {currentSol.badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentSol.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {currentSol.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentSol.description}
            </p>

            {/* Key Capabilities */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Năng lực then chốt cho Doanh nghiệp:
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {currentSol.keyCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Đối tượng doanh nghiệp phù hợp nhất: </span>
              <span>{currentSol.idealFor}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onFilterNewsByCategory(currentSol.categoryKey)}
              className="text-xs font-bold text-[#0070F2] hover:underline flex items-center gap-1"
            >
              <span>Xem tin tức chính thức về giải pháp này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href={currentSol.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Tài liệu SAP.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenAdvisorModal}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#0070F2] hover:bg-[#0057bd] rounded-lg transition-colors shadow-xs"
              >
                Nhận đề xuất triển khai
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
