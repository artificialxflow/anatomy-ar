import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
          <div className="container">
            <a className="navbar-brand fw-bold" href="/">آناتومی سه‌بعدی</a>
            <div className="d-flex align-items-center gap-3">
              <a className="nav-link" href="/admin">پنل ادمین</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
