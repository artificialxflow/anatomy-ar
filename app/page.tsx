"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ModelList from "./components/ModelList";
import 'animate.css';

const ThreeDemo = dynamic(() => import("./components/ThreeDemo"), { ssr: false });

function ModelIcon({ type, size = 64 }: { type: string; size?: number }) {
  // همان کد ModelIcon از ModelList با سایز قابل تنظیم
  switch (type) {
    case "ستون فقرات و نخاع":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="13" y="2" width="6" height="28" rx="3" fill="#4f8cff"/><circle cx="16" cy="8" r="3" fill="#fff"/><circle cx="16" cy="16" r="3" fill="#fff"/><circle cx="16" cy="24" r="3" fill="#fff"/></svg>
      );
    case "مفصل زانو":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="8" ry="12" fill="#ffb300"/><rect x="14" y="8" width="4" height="16" rx="2" fill="#fff"/></svg>
      );
    case "دست و انگشتان":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="8" y="14" width="16" height="6" rx="3" fill="#00b894"/><rect x="12" y="8" width="3" height="8" rx="1.5" fill="#fff"/><rect x="17" y="6" width="3" height="10" rx="1.5" fill="#fff"/></svg>
      );
    case "مغز":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="10" ry="8" fill="#6c5ce7"/><ellipse cx="16" cy="16" rx="6" ry="4" fill="#fff"/></svg>
      );
    case "عصب بینایی":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="#00b894"/><circle cx="16" cy="16" r="5" fill="#fff"/></svg>
      );
    case "سیستم گوارش":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="10" y="10" width="12" height="12" rx="6" fill="#e17055"/><rect x="14" y="6" width="4" height="8" rx="2" fill="#fff"/></svg>
      );
    case "معده":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><ellipse cx="20" cy="20" rx="7" ry="4" fill="#00b894"/><rect x="10" y="10" width="4" height="10" rx="2" fill="#fff"/></svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="6" fill="#b2bec3"/><circle cx="16" cy="16" r="8" fill="#fff"/></svg>
      );
  }
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  // داده mock اطلاعات تکمیلی
  function getModelExtraInfo(model: any) {
    // می‌توان این داده‌ها را به مدل‌ها اضافه کرد، فعلاً mock
    return {
      dimensions: model.dimensions || '120×80×60 mm',
      format: model.format || 'glTF',
      size: model.size || '1.2 MB',
    };
  }

  // تابع انتخاب مدل برای نمایش جزئیات
  const handleSelect = (model: any) => {
    setSelectedModel(model);
    setShowDetail(true);
  };

  // تابع بستن modal با انیمیشن
  const handleClose = () => {
    setShowDetail(false);
    setTimeout(() => setSelectedModel(null), 400); // برای انیمیشن خروج
  };

  const extraInfo = selectedModel ? getModelExtraInfo(selectedModel) : null;

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 50%, #f8fafc 100%)",
        minHeight: "100vh",
      }}
    >
      <h1 className="mb-4 text-center fw-bold display-5" style={{ letterSpacing: 1, color: '#2563eb', textShadow: '0 2px 12px #c2e9fb' }}>
        نمونه اولیه سایت سه‌بعدی آناتومی
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-5 mb-4 mb-md-0">
          <div className="card shadow-lg border-0 p-3 bg-white bg-opacity-75">
            <ModelList onSelect={handleSelect} />
          </div>
        </div>
        <div className="col-md-7 d-flex align-items-center justify-content-center">
          {/* Modal جزئیات مدل */}
          {selectedModel && (
            <div
              className={`modal fade show animate__animated ${showDetail ? 'animate__fadeInDown' : 'animate__fadeOutUp'}`}
              tabIndex={-1}
              style={{ display: "block", background: "rgba(30, 41, 59, 0.45)", position: "fixed", inset: 0, zIndex: 1050, animation: "fadeIn .3s" }}
              onClick={handleClose}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: 480 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="modal-content rounded-4 shadow-lg border-0"
                  style={{ background: "#fff", boxShadow: "0 8px 32px 0 rgba(80,80,160,0.18)", border: '2px solid #e0e7ff' }}>
                  <div className="modal-header border-0 pb-0">
                    <button
                      type="button"
                      className="btn-close ms-auto"
                      aria-label="بستن"
                      onClick={handleClose}
                      style={{ filter: 'drop-shadow(0 0 2px #4f8cff)' }}
                    />
                  </div>
                  <div className="modal-body text-center d-flex flex-column align-items-center justify-content-start">
                    <div className="mb-3" style={{ filter: 'drop-shadow(0 0 12px #4f8cff88)' }}>
                      <ModelIcon type={selectedModel.name} size={96} />
                    </div>
                    <h4 className="mb-2 fw-semibold">{selectedModel.name}</h4>
                    <div className="mb-3 text-secondary small" style={{ minHeight: 40 }}>{selectedModel.desc}</div>
                    {/* اطلاعات تکمیلی */}
                    <div className="mb-3 w-100 d-flex justify-content-center gap-3 flex-wrap">
                      <span className="badge bg-primary bg-gradient fs-6">ابعاد: {extraInfo?.dimensions}</span>
                      <span className="badge bg-info bg-gradient text-dark fs-6">فرمت: {extraInfo?.format}</span>
                      <span className="badge bg-success bg-gradient fs-6">حجم: {extraInfo?.size}</span>
                    </div>
                    {/* دکمه دانلود */}
                    {selectedModel.modelUrl && (
                      <a href={selectedModel.modelUrl} download className="btn btn-outline-primary mb-3 px-4 shadow-sm">
                        دانلود مدل سه‌بعدی
                      </a>
                    )}
                    <div style={{ minHeight: 320, width: "100%" }}>
                      <ThreeDemo key={selectedModel.id} modelUrl={selectedModel.modelUrl} />
                    </div>
                    {/* پیام راهنما */}
                    <div className="mt-2 text-muted small">برای چرخش مدل، کلیک و درگ کنید</div>
                  </div>
                </div>
              </div>
              <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .accordion-item, .card {
                  border-radius: 18px !important;
                }
                .accordion-button {
                  border-radius: 14px !important;
                  background: linear-gradient(90deg, #e0e7ff 60%, #fff 100%);
                  font-weight: 600;
                  transition: box-shadow 0.2s;
                }
                .accordion-button:not(.collapsed) {
                  box-shadow: 0 4px 24px #a1c4fd44;
                }
                .accordion-body ul li {
                  transition: box-shadow 0.2s, background 0.2s;
                  border-radius: 12px;
                }
                .accordion-body ul li:hover {
                  background: #e0f2fe;
                  box-shadow: 0 2px 12px #a1c4fd33;
                }
                .btn-outline-primary {
                  border-radius: 8px;
                  font-weight: 500;
                  transition: background 0.2s, color 0.2s;
                }
                .btn-outline-primary:hover {
                  background: #2563eb;
                  color: #fff;
                }
                .modal-content {
                  border-radius: 22px !important;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
