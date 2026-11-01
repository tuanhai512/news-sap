import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Calendar, 
  Copy, 
  Check, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { SAPNewsItem } from '../types/sap.ts';

interface ArticleDetailModalProps {
  article: SAPNewsItem | null;
  onClose: () => void;
}

interface AIAnalysis {
  executiveSummaryVi: string;
  vietnamMarketImpact: string;
  technicalPrerequisites: string[];
  cleanCoreRecommendation: string;
  recommendedActionPlan: string[];
  estimatedTCOImpact: string;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!article) {
      setAnalysis(null);
      return;
    }

    let isMounted = true;
    setIsAnalyzing(true);
    setError(null);

    fetch('/api/sap/ai-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleTitle: article.titleVi || article.title,
        articleSummary: article.summaryVi || article.summary,
        category: article.category,
        companyContext: 'Doanh nghiệp Việt Nam quan tâm đến tối ưu vận hành, tuân thủ VAS/IFRS và chuẩn bị nâng cấp hệ thống ERP',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.analysis) {
          setAnalysis(data.analysis);
        } else {
          setError(data.message || 'Không thể tải phân tích');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError('Lỗi kết nối máy chủ phân tích');
      })
      .finally(() => {
        if (isMounted) setIsAnalyzing(false);
      });

    return () => {
      isMounted = false;
    };
  }, [article]);

  if (!article) return null;

  const handleCopy = () => {
    if (!analysis) return;
    const textToCopy = `[BÁO CÁO PHÂN TÍCH CHIẾN LƯỢC SAP CHO DOANH NGHIỆP]
Chủ đề: ${article.titleVi || article.title}
Nguồn: ${article.source} (${article.link})
Ngày: ${new Date(article.pubDate).toLocaleDateString('vi-VN')}

1. Tóm lược chiến lược:
${analysis.executiveSummaryVi}

2. Tác động cụ thể đến doanh nghiệp Việt Nam:
${analysis.vietnamMarketImpact}

3. Khuyến nghị Clean Core:
${analysis.cleanCoreRecommendation}

4. Kế hoạch hành động 3 bước:
${analysis.recommendedActionPlan.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

5. Dự phóng TCO:
${analysis.estimatedTCOImpact}
`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-[#0070F2]">{article.source}</span>
              <span aria-hidden="true">·</span>
              <span>{new Date(article.pubDate).toLocaleDateString('vi-VN')}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {article.titleVi || article.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Original English Title & Link */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Tiêu đề gốc tiếng Anh:</div>
            <p className="italic">{article.title}</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-500">Giải pháp liên quan: {article.relevantSolutions.join(', ')}</span>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0070F2] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Xem trên SAP.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Detailed Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Nội dung Thông báo từ SAP
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {article.summaryVi || article.summary}
            </p>
          </div>

          {/* AI Strategic Impact Analysis Section */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-indigo-50/40 rounded-xl p-5 border border-sky-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#0070F2] text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Báo cáo Phân tích Chiến lược cho Doanh nghiệp Việt Nam
                  </h4>
                  <p className="text-xs text-slate-500">Được tổng hợp từ kiến trúc Best Practices và khuyến nghị chính thức của SAP</p>
                </div>
              </div>

              {analysis && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              )}
            </div>

            {isAnalyzing && (
              <div className="py-8 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-[#0070F2] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-medium">Đang khởi tạo phân tích chiến lược cho doanh nghiệp...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-amber-50 text-amber-800 text-xs rounded-lg border border-amber-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {analysis && !isAnalyzing && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                {/* 1. Tóm lược C-Level */}
                <div className="bg-white p-4 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-1">Tóm lược cho Ban Điều hành (CEO / CFO / CIO):</span>
                  <p className="leading-relaxed">{analysis.executiveSummaryVi}</p>
                </div>

                {/* 2. Tác động thị trường Việt Nam */}
                <div className="bg-white p-4 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-1">Tác động cụ thể tới thị trường Việt Nam:</span>
                  <p className="leading-relaxed">{analysis.vietnamMarketImpact}</p>
                </div>

                {/* 3. Khuyến nghị Clean Core */}
                <div className="bg-white p-4 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-1">Khuyến nghị Kiến trúc Clean Core:</span>
                  <p className="leading-relaxed text-indigo-950 font-medium">{analysis.cleanCoreRecommendation}</p>
                </div>

                {/* 4. Điều kiện tiên quyết & Kế hoạch 3 bước */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200/80">
                    <span className="font-bold text-slate-900 block mb-2">Điều kiện kỹ thuật tiên quyết:</span>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                      {analysis.technicalPrerequisites.map((pre, i) => (
                        <li key={i} className="leading-relaxed">{pre}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200/80">
                    <span className="font-bold text-slate-900 block mb-2">Kế hoạch 3 bước hành động:</span>
                    <ol className="space-y-1.5 text-slate-600">
                      {analysis.recommendedActionPlan.map((step, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* 5. Tác động TCO */}
                <div className="text-xs text-slate-500 pt-2 border-t border-sky-100 flex items-center justify-between">
                  <span>Dự phóng hiệu quả: <strong className="text-slate-800">{analysis.estimatedTCOImpact}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Đóng
          </button>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0070F2] hover:bg-[#0057bd] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Mở trang gốc SAP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
