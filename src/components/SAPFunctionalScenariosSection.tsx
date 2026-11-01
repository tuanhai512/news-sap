import React, { useState } from 'react';
import { 
  Workflow, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileSpreadsheet, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  CreditCard, 
  Factory, 
  Boxes, 
  FileText,
  DollarSign
} from 'lucide-react';
import { SAP_FUNCTIONAL_SCENARIOS } from '../utils/functionalData.ts';
import { FunctionalScenario, SAPFunctionalModule } from '../types/functional.ts';

export const SAPFunctionalScenariosSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<'all' | SAPFunctionalModule>('all');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sd-o2c-bd9');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const filteredScenarios = selectedModule === 'all'
    ? SAP_FUNCTIONAL_SCENARIOS
    : SAP_FUNCTIONAL_SCENARIOS.filter((s) => s.module === selectedModule);

  const currentScenario: FunctionalScenario = 
    SAP_FUNCTIONAL_SCENARIOS.find((s) => s.id === selectedScenarioId) || SAP_FUNCTIONAL_SCENARIOS[0];

  const currentStep = currentScenario.steps[currentStepIndex] || currentScenario.steps[0];

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentScenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0070F2] mb-1">
          <span>Ví Dụ Nghiệp Vụ Chức Năng (SAP Functional Scenarios)</span>
          <span aria-hidden="true">·</span>
          <span>Best Practices & Scope Items</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Mô Phỏng Luồng Quy Trình Nghiệp Vụ Chức Năng SAP
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Khám phá chi tiết các ví dụ nghiệp vụ thực tế (Functional Use Cases) theo phân hệ: SD (Bán hàng O2C), MM (Mua sắm P2P), PP (Sản xuất), FI-CO (Kế toán đa sổ), với mã Fiori App, bút toán tài chính Nợ/Có và vị trí nhúng trợ lý AI Joule.
        </p>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        {[
          { id: 'all', label: 'Tất cả phân hệ' },
          { id: 'SD', label: 'SD · Bán hàng (Order-to-Cash)' },
          { id: 'MM', label: 'MM · Mua sắm (Procure-to-Pay)' },
          { id: 'PP', label: 'PP · Kế hoạch Sản xuất & Giá thành' },
          { id: 'FI-CO', label: 'FI-CO · Kế toán Sổ cái & VAS/IFRS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedModule(tab.id as any);
              const firstMatch = tab.id === 'all' 
                ? SAP_FUNCTIONAL_SCENARIOS[0] 
                : SAP_FUNCTIONAL_SCENARIOS.find((s) => s.module === tab.id);
              if (firstMatch) {
                setSelectedScenarioId(firstMatch.id);
                setCurrentStepIndex(0);
              }
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedModule === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scenario Selector Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredScenarios.map((scen) => {
          const isSelected = scen.id === currentScenario.id;
          return (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(scen.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'border-[#0070F2] bg-sky-50/70 ring-1 ring-[#0070F2] shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#0070F2] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {scen.module} · Scope Item {scen.scopeItemCode}
                  </span>
                  <span className="text-[11px] text-slate-400 tabular-nums">
                    {scen.steps.length} bước
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {scen.titleVi}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {scen.businessBenefitVi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Simulator Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Scenario Header Bar */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <span>Phân Hệ: {currentScenario.module}</span>
              <span aria-hidden="true">·</span>
              <span>Mã Best Practice: {currentScenario.scopeItemCode}</span>
              <span aria-hidden="true">·</span>
              <span>Áp dụng cho: {currentScenario.targetIndustries.join(', ')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {currentScenario.titleVi}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentScenario.businessContextVi}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-xs space-y-1 shrink-0">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Giá Trị Đo Lường:</span>
            </div>
            <div className="text-slate-300 max-w-xs">{currentScenario.businessBenefitVi}</div>
          </div>
        </div>

        {/* Step-by-Step Interactive Stepper Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 min-w-[600px]">
            {currentScenario.steps.map((st, idx) => {
              const isActive = idx === currentStepIndex;
              const isPassed = idx < currentStepIndex;
              return (
                <button
                  key={st.stepNumber}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#0070F2] ring-2 ring-[#0070F2]/20 shadow-xs'
                      : isPassed
                      ? 'bg-white/80 border-slate-200 text-slate-700'
                      : 'bg-slate-100/70 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-[#0070F2] text-white'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPassed ? '✓' : st.stepNumber}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Bước 0{st.stepNumber}
                    </div>
                    <div className={`text-xs font-bold line-clamp-1 ${
                      isActive ? 'text-[#0070F2]' : 'text-slate-800'
                    }`}>
                      {st.stepName.split('(')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Panel */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header of Step */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-bold text-[#0070F2]">Bước {currentStep.stepNumber} / {currentScenario.steps.length}</span>
                <span aria-hidden="true">·</span>
                <span>Vai trò phụ trách: <strong className="text-slate-800">{currentStep.role}</strong></span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                {currentStep.stepName}
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-[#0070F2] font-semibold border border-sky-100">
                App: {currentStep.fioriApp}
              </span>
              <span className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px]">
                T-Code: {currentStep.tCode}
              </span>
            </div>
          </div>

          {/* Description & Output Document */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mô Tả Quy Trình Nghiệp Vụ:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentStep.descriptionVi}
                </p>
              </div>

              {/* Joule AI Assistant Role */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/50 border border-sky-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0070F2]">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Trí Tuệ Nhân Tạo SAP Joule Can Thiệp Tại Bước Này:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentStep.jouleAiAssistantRole}
                </p>
              </div>
            </div>

            {/* Generated Document Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0070F2]" />
                  <span>Chứng Từ Phát Sinh:</span>
                </div>
                <div className="text-xs font-bold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200">
                  {currentStep.documentGenerated}
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                Được lưu trữ bất biến và liên kết chuỗi chứng từ trong luồng Document Flow của SAP.
              </div>
            </div>
          </div>

          {/* Real Sample Business Data */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Dữ Liệu Thực Tế Mẫu Trong Hệ Thống:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentStep.sampleData.map((data, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="text-slate-500 text-[11px]">{data.label}</div>
                  <div className="font-semibold text-slate-900">{data.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Accounting Postings (Debit/Credit) if applicable */}
          {currentStep.accountingPostings && currentStep.accountingPostings.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bút Toán Hạch Toán Kế Toán Tự Động (General Ledger Postings):</span>
                </div>
                <span className="text-[11px] text-slate-500">Đồng bộ tự động vào bảng ACDOCA</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Tài khoản & Tên hạch toán</th>
                      <th className="py-2.5 px-3">Định khoản</th>
                      <th className="py-2.5 px-3 text-right">Số tiền ghi nhận</th>
                      <th className="py-2.5 px-3 text-right">Chuẩn mực</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {currentStep.accountingPostings.map((post, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 font-medium text-slate-900">
                          {post.accountNumber} - <span className="text-slate-500">{post.accountName}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`font-semibold ${
                            post.debitCredit.includes('Debit') ? 'text-blue-700' : 'text-emerald-700'
                          }`}>
                            {post.debitCredit}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                          {post.amount}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500 text-[11px]">
                          {post.ledger}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bước trước</span>
            </button>

            <span className="text-xs text-slate-500">
              Đang xem bước {currentStepIndex + 1} trên {currentScenario.steps.length}
            </span>

            {currentStepIndex < currentScenario.steps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0070F2] hover:bg-[#005bbd] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Chạy bước tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStepIndex(0)}
                className="px-5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hoàn tất quy trình (Chạy lại từ đầu)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
