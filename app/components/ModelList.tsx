import { useState } from "react";

function ModelIcon({ type }: { type: string }) {
  switch (type) {
    case "ستون فقرات و نخاع":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="13" y="2" width="6" height="28" rx="3" fill="#4f8cff"/><circle cx="16" cy="8" r="3" fill="#fff"/><circle cx="16" cy="16" r="3" fill="#fff"/><circle cx="16" cy="24" r="3" fill="#fff"/></svg>
      );
    case "مفصل زانو":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="8" ry="12" fill="#ffb300"/><rect x="14" y="8" width="4" height="16" rx="2" fill="#fff"/></svg>
      );
    case "دست و انگشتان":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="8" y="14" width="16" height="6" rx="3" fill="#00b894"/><rect x="12" y="8" width="3" height="8" rx="1.5" fill="#fff"/><rect x="17" y="6" width="3" height="10" rx="1.5" fill="#fff"/></svg>
      );
    case "مغز":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="10" ry="8" fill="#6c5ce7"/><ellipse cx="16" cy="16" rx="6" ry="4" fill="#fff"/></svg>
      );
    case "عصب بینایی":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="#00b894"/><circle cx="16" cy="16" r="5" fill="#fff"/></svg>
      );
    case "سیستم گوارش":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="10" y="10" width="12" height="12" rx="6" fill="#e17055"/><rect x="14" y="6" width="4" height="8" rx="2" fill="#fff"/></svg>
      );
    case "معده":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="20" cy="20" rx="7" ry="4" fill="#00b894"/><rect x="10" y="10" width="4" height="10" rx="2" fill="#fff"/></svg>
      );
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="6" fill="#b2bec3"/><circle cx="16" cy="16" r="8" fill="#fff"/></svg>
      );
  }
}

const mockData = [
  {
    category: "اختلالات استخوان، مفصل و عضله",
    models: [
      {
        id: 1,
        name: "ستون فقرات و نخاع",
        desc: "مدل سه‌بعدی ستون فقرات و نخاع برای نمایش ساختار کلی اسکلت بدن.",
        modelUrl: "/cube.glb"
      },
      {
        id: 2,
        name: "مفصل زانو",
        desc: "مدل سه‌بعدی مفصل زانو و اجزای آن."
      },
      {
        id: 3,
        name: "دست و انگشتان",
        desc: "مدل سه‌بعدی دست و انگشتان برای بررسی حرکات."
      },
    ],
  },
  {
    category: "اختلالات مغز و اعصاب",
    models: [
      {
        id: 4,
        name: "مغز",
        desc: "مدل سه‌بعدی مغز انسان با جزئیات لوب‌ها."
      },
      {
        id: 5,
        name: "عصب بینایی",
        desc: "مدل سه‌بعدی عصب بینایی و مسیر آن."
      },
    ],
  },
  {
    category: "اختلالات گوارشی",
    models: [
      {
        id: 6,
        name: "سیستم گوارش",
        desc: "مدل سه‌بعدی سیستم گوارش و اندام‌های مرتبط."
      },
      {
        id: 7,
        name: "معده",
        desc: "مدل سه‌بعدی معده برای نمایش عملکرد هضم."
      },
    ],
  },
];

// اگر تصاویر واقعی موجود نبود، از placeholder استفاده کن
const getImg = (img: string) => img || "https://via.placeholder.com/48x48?text=3D";

export default function ModelList({ onSelect }: { onSelect: (model: any) => void }) {
  const [open, setOpen] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  // فیلتر مدل‌ها بر اساس جستجو
  const filteredData = mockData.map((cat) => ({
    ...cat,
    models: cat.models.filter(
      (model) =>
        model.name.includes(search) ||
        (model.desc && model.desc.includes(search))
    ),
  })).filter((cat) => cat.models.length > 0);

  return (
    <>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="جستجو در مدل‌ها..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="accordion" id="modelAccordion">
        {filteredData.length === 0 && (
          <div className="alert alert-warning text-center">مدلی با این مشخصات پیدا نشد.</div>
        )}
        {filteredData.map((cat, idx) => (
          <div className="accordion-item" key={cat.category}>
            <h2 className="accordion-header" id={`heading${idx}`}>
              <button
                className={`accordion-button${open === idx ? "" : " collapsed"}`}
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                {cat.category}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse${open === idx ? " show" : ""}`}
              aria-labelledby={`heading${idx}`}
              data-bs-parent="#modelAccordion"
            >
              <div className="accordion-body">
                <ul className="list-unstyled mb-0">
                  {cat.models.map((model) => (
                    <li
                      key={model.id}
                      className="mb-3 d-flex align-items-center justify-content-between p-2 rounded shadow-sm bg-light"
                      style={{ gap: 8 }}
                    >
                      <div className="d-flex align-items-center" style={{ gap: 10 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "#f1f2f6", borderRadius: 8 }}>
                          <ModelIcon type={model.name} />
                        </span>
                        <span className="fw-semibold">{model.name}</span>
                      </div>
                      <button className="btn btn-sm btn-outline-primary px-3" onClick={() => onSelect(model)}>
                        مشاهده مدل
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 