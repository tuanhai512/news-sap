import React from 'react';
import { Layers, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  activeTab: 'news' | 'functional' | 'solutions' | 'clean-core' | 'advisor';
  setActiveTab: (tab: 'news' | 'functional' | 'solutions' | 'clean-core' | 'advisor') => void;
  onOpenAdvisorModal: () => void;
  isSyncing: boolean;
  onRefreshFeed: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdvisorModal,
  isSyncing,
  onRefreshFeed,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab('news'); }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0070F2] flex items-center justify-center text-white font-extrabold shadow-xs">
              <span className="text-xs tracking-wider">SAP</span>
            </div>
            <span className="hidden sm:inline font-bold">Tech & Enterprise Hub</span>
          </a>

          {/* Zone 2: 5 single-line text navigation links */}
          <nav className="flex items-center gap-1 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'news'
                  ? 'border-[#0070F2] text-[#0070F2] font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Tin tức SAP
            </button>
            <button
              onClick={() => setActiveTab('functional')}
              className={`px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'functional'
                  ? 'border-[#0070F2] text-[#0070F2] font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Nghiệp vụ Chức năng
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'solutions'
                  ? 'border-[#0070F2] text-[#0070F2] font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Giải pháp SAP
            </button>
            <button
              onClick={() => setActiveTab('clean-core')}
              className={`px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'clean-core'
                  ? 'border-[#0070F2] text-[#0070F2] font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Lộ trình Clean Core
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-2.5 py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'advisor'
                  ? 'border-[#0070F2] text-[#0070F2] font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Tư vấn Kiến trúc
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onRefreshFeed}
              disabled={isSyncing}
              title="Đồng bộ nguồn tin chính thức từ SAP"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
              aria-label="Cập nhật dữ liệu từ nguồn SAP"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-[#0070F2]' : ''}`} />
            </button>
            <button
              onClick={onOpenAdvisorModal}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0070F2] hover:bg-[#0057bd] rounded-lg transition-colors whitespace-nowrap shadow-xs shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tư vấn Giải pháp</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
