import SideBar from "@/components/side-bar";
import type { Metadata } from "next";

import './globals.css';

export const metadata: Metadata = {
  title: "阿姨联盟",
  description: "运营配置后台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <main>
          <SideBar />
          <div style={{ flex: 1 }}>{children}</div>
        </main>
      </body>
    </html>
  );
}
