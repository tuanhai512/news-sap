import React from 'react';
import { ExternalLink, ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <div className="w-5 h-5 rounded bg-[#0070F2] flex items-center justify-center text-white text-[10px] font-extrabold">
                SAP
              </div>
              <span>Tech & Enterprise Solutions Hub</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Cổng thông tin độc lập cập nhật và phân tích các thông cáo công nghệ, giải pháp điện toán đám mây và kiến trúc Clean Core từ các kênh truyền thông chính thức của SAP.
            </p>
          </div>

          {/* Official SAP links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
            <a
              href="https://news.sap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0070F2] flex items-center gap-1 transition-colors"
            >
              <span>SAP News Center</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://community.sap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0070F2] flex items-center gap-1 transition-colors"
            >
              <span>SAP Community</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://roadmaps.sap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0070F2] flex items-center gap-1 transition-colors"
            >
              <span>SAP Road Map Explorer</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://www.sap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0070F2] flex items-center gap-1 transition-colors"
            >
              <span>SAP Official Portal</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} SAP Tech & Enterprise Solutions Hub. Trích xuất từ nguồn truyền thông chính thống SAP.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Xác thực bởi SAP Best Practices & Clean Core Strategy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
