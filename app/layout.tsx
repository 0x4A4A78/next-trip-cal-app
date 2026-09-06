import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roamly | แชร์ค่าเดินทาง",
  description: "คำนวณค่าน้ำมันและหารค่าใช้จ่ายทริป",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
