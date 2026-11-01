import React from 'react';
import { ExternalLink, Sparkles, Clock, Globe, ArrowUpRight, Filter } from 'lucide-react';
import { SAPNewsItem, SAPCategory } from '../types/sap.ts';

interface NewsFeedSectionProps {
  items: SAPNewsItem[];
  selectedCategory: SAPCategory;
  onSelectCategory: (cat: SAPCategory) => void;
  onOpenArticle: (item: SAPNewsItem) => void;
  isLoading: boolean;
  searchQuery: string;
}

export const CATEGORIES: { id: SAPCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả tin tức' },
  { id: 'joule-ai', label: 'Joule & Business AI' },
  { id: 's4hana-erp', label: 'SAP S/4HANA ERP' },
  { id: 'clean-core', label: 'Clean Core & Kiến trúc' },
  { id: 'btp-cloud', label: 'SAP BTP Cloud' },
  { id: 'supply-chain', label: 'Chuỗi cung ứng (IBP/Ariba)' },
  { id: 'sustainability', label: 'ESG & Green Ledger' },
];

export const NewsFeedSection: React.FC<NewsFeedSectionProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  onOpenArticle,
  isLoading,
  searchQuery,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Luồng Thông Tin Chính Thức Từ SAP
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng hợp tin tức công nghệ, tài liệu giải pháp và thông cáo báo chí từ SAP News Center và SAP Community.
          </p>
        </div>

        {/* Filter buttons - segmented control */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-6 bg-slate-200 rounded w-5/6" />
              <div className="h-16 bg-slate-100 rounded" />
              <div className="h-8 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 mt-8 p-8">
          <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">Không tìm thấy thông tin phù hợp</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Không có kết quả nào khớp với từ khóa "{searchQuery}" trong danh mục được chọn. Vui lòng thử từ khóa khác hoặc chọn tất cả danh mục.
          </p>
          <button
            onClick={() => { onSelectCategory('all'); }}
            className="px-4 py-2 text-xs font-semibold text-[#0070F2] bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
          >
            Xem tất cả danh mục
          </button>
        </div>
      )}

      {/* Article Grid */}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col p-5"
            >
              {/* Unboxed metadata line with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                <span className="font-semibold text-[#0070F2]">{item.source}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {new Date(item.pubDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTime}
                </span>
              </div>

              {/* Title leading directly */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0070F2] transition-colors leading-snug mb-2">
                {item.titleVi || item.title}
              </h3>

              {/* English original title subtitle if translated */}
              {item.titleVi !== item.title && (
                <p className="text-xs text-slate-400 line-clamp-1 italic mb-3">
                  {item.title}
                </p>
              )}

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {item.summaryVi || item.summary}
              </p>

              {/* Strategic Takeaway for Vietnamese Business */}
              <div className="mt-auto pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-xl">
                <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Ý nghĩa cho Doanh nghiệp:
                  </span>
                  <span className={`text-[11px] font-semibold ${
                    item.impactLevel === 'Strategic' ? 'text-amber-700' : 'text-blue-700'
                  }`}>
                    {item.impactLevel === 'Strategic' ? 'Chiến lược' : 'Trọng yếu'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.executiveTakeawayVi}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => onOpenArticle(item)}
                    className="text-xs font-semibold text-[#0070F2] hover:text-[#0057bd] flex items-center gap-1 transition-colors"
                  >
                    <span>Xem phân tích AI</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    title="Mở bài viết gốc trên trang chính thức của SAP"
                  >
                    <span>Nguồn SAP gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
