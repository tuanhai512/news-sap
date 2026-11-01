import React from 'react';
import { ArrowRight, Search, Sparkles, Building, ShieldCheck, Cpu } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/assetPaths.ts';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExploreAdvisor: () => void;
  onOpenFeedInspector: () => void;
  newsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onExploreAdvisor,
  onOpenFeedInspector,
  newsCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.heroBanner}
          alt="Trung tâm Vận hành và Quản trị Doanh nghiệp SAP"
          className="w-full h-full object-cover opacity-35 object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl">
          {/* Unboxed kicker - no pill */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Cổng Thông Tin Công Nghệ & Giải Pháp SAP</span>
            <span aria-hidden="true">·</span>
            <span>Nguồn Chính Thức SAP News & Community</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 [text-wrap:balance] leading-tight">
            Cập nhật Công nghệ & Giải pháp Doanh nghiệp mới nhất từ SAP
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Theo dõi liên tục các thông cáo báo chí, kiến trúc Clean Core, hệ sinh thái SAP S/4HANA Cloud, BTP và trợ lý trí tuệ nhân tạo Joule được cập nhật trực tiếp từ hệ thống SAP toàn cầu.
          </p>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tin tức S/4HANA, Joule AI, BTP, Clean Core..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 text-sm rounded-lg border border-white/20 focus:border-[#0070F2] focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={onExploreAdvisor}
              className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0070F2] hover:bg-[#005bbd] rounded-lg transition-colors whitespace-nowrap shadow-sm shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tư vấn theo Ngành</span>
            </button>
          </div>

          {/* Quick source inspector trigger link */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span>Đang theo dõi {newsCount} tin tức & tài liệu công nghệ</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenFeedInspector}
              className="text-sky-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Kiểm tra RSS Feed trực tiếp từ SAP
            </button>
          </div>
        </div>

        {/* Enterprise KPI & Metric Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">2027 / 2030</div>
              <div className="text-xs text-slate-400">Hạn chót bảo trì SAP ECC 6.0 toàn cầu</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">Joule Business AI</div>
              <div className="text-xs text-slate-400">Autonomous Agents nhúng trong ERP</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">GROW / RISE</div>
              <div className="text-xs text-slate-400">Lộ trình triển khai Cloud ERP chuẩn hóa</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tabular-nums">100% Clean Core</div>
              <div className="text-xs text-slate-400">Kiến trúc mở rộng trên SAP BTP</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
