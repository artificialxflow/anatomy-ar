'use client';
import React, { useState } from "react";

// داده mock به صورت flat برای جدول
const mockData = [
  {
    id: 1,
    name: "ستون فقرات و نخاع",
    category: "اختلالات استخوان، مفصل و عضله",
    desc: "مدل سه‌بعدی ستون فقرات و نخاع برای نمایش ساختار کلی اسکلت بدن.",
    modelUrl: "/cube.glb",
    dimensions: "120×80×60 mm",
    format: "glTF",
    size: "1.2 MB",
  },
  {
    id: 2,
    name: "مفصل زانو",
    category: "اختلالات استخوان، مفصل و عضله",
    desc: "مدل سه‌بعدی مفصل زانو و اجزای آن.",
    modelUrl: "",
    dimensions: "90×60×60 mm",
    format: "glTF",
    size: "0.9 MB",
  },
  {
    id: 3,
    name: "دست و انگشتان",
    category: "اختلالات استخوان، مفصل و عضله",
    desc: "مدل سه‌بعدی دست و انگشتان برای بررسی حرکات.",
    modelUrl: "",
    dimensions: "100×40×30 mm",
    format: "glTF",
    size: "1.1 MB",
  },
  {
    id: 4,
    name: "مغز",
    category: "اختلالات مغز و اعصاب",
    desc: "مدل سه‌بعدی مغز انسان با جزئیات لوب‌ها.",
    modelUrl: "",
    dimensions: "110×90×80 mm",
    format: "glTF",
    size: "1.5 MB",
  },
  {
    id: 5,
    name: "عصب بینایی",
    category: "اختلالات مغز و اعصاب",
    desc: "مدل سه‌بعدی عصب بینایی و مسیر آن.",
    modelUrl: "",
    dimensions: "60×20×20 mm",
    format: "glTF",
    size: "0.7 MB",
  },
  {
    id: 6,
    name: "سیستم گوارش",
    category: "اختلالات گوارشی",
    desc: "مدل سه‌بعدی سیستم گوارش و اندام‌های مرتبط.",
    modelUrl: "",
    dimensions: "150×80×60 mm",
    format: "glTF",
    size: "1.8 MB",
  },
  {
    id: 7,
    name: "معده",
    category: "اختلالات گوارشی",
    desc: "مدل سه‌بعدی معده برای نمایش عملکرد هضم.",
    modelUrl: "",
    dimensions: "70×40×30 mm",
    format: "glTF",
    size: "0.8 MB",
  },
];

const emptyModel = {
  name: "",
  category: "",
  desc: "",
  modelUrl: "",
  dimensions: "",
  format: "glTF",
  size: "",
};

export default function AdminPage() {
  const [models, setModels] = useState(mockData);
  const [form, setForm] = useState(emptyModel);
  const [msg, setMsg] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // اعتبارسنجی ساده
    if (!form.name || !form.category || !form.desc) {
      setMsg({ type: "danger", text: "لطفاً همه فیلدهای ضروری را پر کنید." });
      return;
    }
    const newModel = {
      ...form,
      id: Date.now(),
    };
    setModels([newModel, ...models]);
    setForm(emptyModel);
    setMsg({ type: "success", text: "مدل جدید با موفقیت اضافه شد!" });
    setTimeout(() => setMsg(null), 2500);
    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">پنل ادمین (مدیریت مدل‌ها)</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 p-4">
            <h5 className="mb-3 fw-semibold">افزودن مدل جدید</h5>
            {msg && (
              <div className={`alert alert-${msg.type} mb-3`}>{msg.text}</div>
            )}
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="نام مدل *" />
              </div>
              <div className="col-md-6">
                <input name="category" value={form.category} onChange={handleChange} className="form-control" placeholder="دسته‌بندی *" />
              </div>
              <div className="col-12">
                <textarea name="desc" value={form.desc} onChange={handleChange} className="form-control" placeholder="توضیح *" rows={2} />
              </div>
              <div className="col-md-6">
                <input name="modelUrl" value={form.modelUrl} onChange={handleChange} className="form-control" placeholder="آدرس فایل glb (اختیاری)" />
              </div>
              <div className="col-md-3">
                <input name="dimensions" value={form.dimensions} onChange={handleChange} className="form-control" placeholder="ابعاد (مثلاً mm 60×80×120)" />
              </div>
              <div className="col-md-2">
                <input name="size" value={form.size} onChange={handleChange} className="form-control" placeholder="حجم (مثلاً MB 1.2)" />
              </div>
              <div className="col-md-1">
                <input name="format" value={form.format} onChange={handleChange} className="form-control" placeholder="فرمت" />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary px-4 shadow-sm" type="submit">افزودن مدل</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 p-3">
        <h5 className="mb-3 fw-semibold">لیست مدل‌ها</h5>
        <div className="table-responsive" style={{ maxHeight: 420 }}>
          <table className="table table-bordered table-hover align-middle text-center bg-white">
            <thead className="table-light sticky-top">
              <tr>
                <th>نام مدل</th>
                <th>دسته‌بندی</th>
                <th>توضیح</th>
                <th>ابعاد</th>
                <th>فرمت</th>
                <th>حجم</th>
                <th>لینک مدل</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.desc}</td>
                  <td>{m.dimensions || "-"}</td>
                  <td>{m.format || "-"}</td>
                  <td>{m.size || "-"}</td>
                  <td>
                    {m.modelUrl ? (
                      <a href={m.modelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">دانلود</a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 