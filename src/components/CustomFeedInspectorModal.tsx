import React, { useState } from 'react';
import { X, Globe, CheckCircle2, AlertCircle, RefreshCw, Plus, ExternalLink } from 'lucide-react';
import { SAPNewsItem } from '../types/sap.ts';

interface CustomFeedInspectorModalProps {
  onClose: () => void;
  onImportItems: (items: SAPNewsItem[]) => void;
}

const PRESET_SAP_FEEDS = [
  {
    name: 'SAP News Center (Toàn cầu)',
    url: 'https://news.sap.com/feed/',
    desc: 'Thông cáo báo chí, tin tức sản phẩm và chiến lược điều hành chính thức từ SAP.'
  },
  {
    name: 'SAP Business AI & Joule Copilot',
    url: 'https://news.sap.com/topics/artificial-intelligence/feed/',
    desc: 'Cập nhật chuyên sâu về các mô hình AI và tính năng Joule Copilot cho ERP.'
  },
  {
    name: 'SAP S/4HANA Cloud & Financials',
    url: 'https://news.sap.com/topics/s-4hana/feed/',
    desc: 'Bản phát hành điện toán đám mây, tính năng kế toán VAS/IFRS và chuỗi cung ứng.'
  },
  {
    name: 'SAP Business Technology Platform (BTP)',
    url: 'https://news.sap.com/topics/business-technology-platform/feed/',
    desc: 'Kiến trúc tích hợp, API, Clean Core và phát triển ứng dụng đám mây.'
  },
];

export const CustomFeedInspectorModal: React.FC<CustomFeedInspectorModalProps> = ({
  onClose,
  onImportItems,
}) => {
  const [feedUrl, setFeedUrl] = useState<string>('https://news.sap.com/feed/');
  const [sourceName, setSourceName] = useState<string>('SAP News Center');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parsedItems, setParsedItems] = useState<SAPNewsItem[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleTestFeed = (targetUrl?: string, targetName?: string) => {
    const url = targetUrl || feedUrl;
    const name = targetName || sourceName;
    setIsLoading(true);
    setMessage(null);

    fetch('/api/sap/custom-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedUrl: url, sourceName: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setParsedItems(data.items);
          setMessage({
            type: 'success',
            text: `Đã kết nối thành công và tải về ${data.items.length} bài viết chính thức từ nguồn SAP!`
          });
        } else {
          setMessage({
            type: 'error',
            text: data.message || 'Không thể lấy dữ liệu từ nguồn RSS này. Vui lòng kiểm tra lại URL.'
          });
        }
      })
      .catch((err) => {
        setMessage({
          type: 'error',
          text: 'Lỗi mạng khi gọi máy chủ thu thập RSS của SAP.'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleImportToFeed = () => {
    if (parsedItems.length === 0) return;
    onImportItems(parsedItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-50 text-[#0070F2] rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 id="inspector-title" className="text-lg font-bold text-slate-900">
                Kiểm Tra & Thu Thập RSS Feed Trực Tiếp Từ SAP
              </h2>
              <p className="text-xs text-slate-500">
                Kết nối thời gian thực với các cổng thông tin chính thức của SAP toàn cầu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Preset Feed Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Các Kênh RSS Chính Thức Đã Được Xác Thực:
            </label>
            <div className="space-y-2">
              {PRESET_SAP_FEEDS.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#0070F2] bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{preset.name}</div>
                    <div className="text-slate-500 line-clamp-1">{preset.desc}</div>
                    <code className="text-[10px] text-slate-400 font-mono">{preset.url}</code>
                  </div>
                  <button
                    onClick={() => {
                      setFeedUrl(preset.url);
                      setSourceName(preset.name);
                      handleTestFeed(preset.url, preset.name);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#0070F2] bg-white border border-sky-200 hover:bg-sky-50 rounded-lg shrink-0 transition-colors"
                  >
                    Kiểm tra ngay
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom URL Input */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Hoặc nhập URL RSS Feed từ trang chính thức SAP:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                placeholder="https://news.sap.com/topics/.../feed/"
                className="flex-1 text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0070F2]"
              />
              <button
                onClick={() => handleTestFeed()}
                disabled={isLoading}
                className="px-4 py-2 bg-[#0070F2] hover:bg-[#005bbd] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Đang đọc...' : 'Tải Feed'}</span>
              </button>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-red-50 text-red-900 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Parsed items preview */}
          {parsedItems.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Kết quả phân tích ({parsedItems.length} mục tin tức):
                </span>
                <button
                  onClick={handleImportToFeed}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đưa vào danh sách ứng dụng</span>
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {parsedItems.slice(0, 5).map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900 line-clamp-1">{item.title}</div>
                    <p className="text-slate-500 line-clamp-2">{item.summary}</p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Phân loại: {item.category}</span>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#0070F2] flex items-center gap-0.5 hover:underline">
                        <span>Liên kết gốc</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
