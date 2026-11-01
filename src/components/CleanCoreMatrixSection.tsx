import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  ArrowRight, 
  Clock, 
  Cpu, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SAP_RELEASE_MILESTONES } from '../utils/solutionAdvisor.ts';
import { ASSET_IMAGES } from '../assets/assetPaths.ts';

interface CleanCoreMatrixSectionProps {
  onOpenAdvisorModal: () => void;
}

export const CleanCoreMatrixSection: React.FC<CleanCoreMatrixSectionProps> = ({ onOpenAdvisorModal }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0070F2] mb-1">
          <span>Chiến Lược Kiến Trúc Hiện Đại Hóa SAP</span>
          <span aria-hidden="true">·</span>
          <span>Clean Core & Release Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Lộ Trình Clean Core & Bản Đồ Chuyển Đổi SAP ECC 6.0
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Clean Core là tiêu chuẩn kiến trúc bắt buộc của SAP toàn cầu: giữ nguyên mã nguồn gốc ERP chuẩn mực, chuyển mọi tùy biến sang SAP BTP để hệ thống luôn sẵn sàng nâng cấp và ứng dụng AI.
        </p>
      </div>

      {/* Urgent ECC 6.0 Support Countdown Alert */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Thông Báo Chính Thức Từ SAP
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-xs font-semibold text-amber-900">Mốc 31/12/2027</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-950">
              Chấm Dứt Bảo Trì Tiêu Chuẩn Cho SAP ECC 6.0 Trên Toàn Cầu
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed max-w-2xl">
              Từ sau năm 2027, SAP sẽ ngừng các bản vá bảo mật và tính năng chuẩn cho ECC 6.0. Các doanh nghiệp chưa chuyển đổi sang SAP S/4HANA Cloud sẽ phải chịu phụ phí bảo trì mở rộng (Extended Maintenance) từ 2-4% mỗi năm và đối mặt nguy cơ bảo mật.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAdvisorModal}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-xs shrink-0 self-start md:self-auto"
        >
          Đánh Giá Lộ Trình Di Chuyển
        </button>
      </div>

      {/* Visual Architectural Deep Dive: Image + Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100">
            <img
              src={ASSET_IMAGES.cleanCoreArchitecture}
              alt="Mô hình kiến trúc Clean Core của SAP"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-xs text-slate-500 italic">
            Mô hình phân tầng kiến trúc Clean Core: ERP lõi chuẩn hóa kết hợp nền tảng đám mây mở rộng SAP BTP và dữ liệu thời gian thực.
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            So Sánh Kiến Trúc ERP Truyền Thống vs. SAP Clean Core Hiện Đại
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Traditional Custom ERP */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-800 uppercase">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>ERP Tùy Biến Cổ Điển (Legacy)</span>
              </div>
              <ul className="space-y-2 text-xs text-red-950/80">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-red-600">✕</span>
                  <span>Chỉnh sửa trực tiếp vào mã nguồn và bảng cơ sở dữ liệu gốc (Z-Programs).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-red-600">✕</span>
                  <span>Mỗi lần nâng cấp phiên bản mất 6-12 tháng và chi phí hàng trăm ngàn USD.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-red-600">✕</span>
                  <span>Không thể nhúng trợ lý AI (Joule) hay tự động hóa API đám mây.</span>
                </li>
              </ul>
            </div>

            {/* Clean Core Cloud ERP */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SAP Clean Core Hiện Đại</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950/80">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Lõi ERP giữ nguyên 100% Best Practices chuẩn quốc tế.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Mở rộng tính năng qua SAP BTP (ABAP Cloud / CAP) không sửa mã gốc.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Nâng cấp tự động 2 lần/năm hoàn toàn không gián đoạn hoạt động kinh doanh.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Migration Pathways to S/4HANA */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          3 Phương Án Chuyển Dịch Sang S/4HANA Cho Doanh Nghiệp Đang Dùng ECC 6.0
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">Lựa chọn 01</div>
            <div className="text-base font-bold text-slate-900">Greenfield (Triển khai mới hoàn toàn)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tái thiết kế toàn diện quy trình doanh nghiệp theo chuẩn SAP Best Practices mới nhất, loại bỏ 100% mã tùy biến cũ tồn đọng từ 10-15 năm trước.
            </p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
              Phù hợp nhất: Doanh nghiệp muốn chuẩn hóa lại toàn bộ bộ máy tổ chức.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Lựa chọn 02</div>
            <div className="text-base font-bold text-slate-900">Brownfield (Chuyển đổi hệ thống)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nâng cấp trực tiếp hệ thống ECC hiện tại lên S/4HANA, bảo toàn toàn bộ dữ liệu lịch sử và các quy trình tùy biến đặc thù đã hoạt động ổn định.
            </p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
              Phù hợp nhất: Doanh nghiệp có quy trình tùy biến cao và muốn giữ lại dữ liệu lịch sử liên tục.
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Lựa chọn 03</div>
            <div className="text-base font-bold text-slate-900">Bluefield (Chuyển đổi chọn lọc)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kết hợp ưu điểm của cả hai: làm sạch và chọn lọc các quy trình, dữ liệu quan trọng nhất sang môi trường mới mà không mang theo rác công nghệ cũ.
            </p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
              Phù hợp nhất: Tập đoàn có nhiều công ty con và muốn chuyển đổi theo từng giai đoạn.
            </div>
          </div>
        </div>
      </div>

      {/* Release Milestones Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Bản Đồ Cập Nhật Các Phiên Bản & Cột Mốc Chính Thức Từ SAP
        </h3>
        <div className="space-y-4">
          {SAP_RELEASE_MILESTONES.map((milestone, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{milestone.version}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 tabular-nums">{milestone.releaseDate}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit ${
                  milestone.status === 'Current' ? 'bg-emerald-100 text-emerald-800' :
                  milestone.status === 'Long-Term Support' ? 'bg-sky-100 text-sky-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {milestone.status === 'Current' ? 'Phiên bản Hiện hành' :
                   milestone.status === 'Long-Term Support' ? 'Hỗ trợ Dài hạn (LTS)' :
                   'Cảnh báo Kết thúc Hỗ trợ'}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-800">
                {milestone.headline}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-600">
                {milestone.keyFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0070F2] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-2">
                <span className="font-bold text-slate-700">Tác động Clean Core:</span>
                <span>{milestone.cleanCoreImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
