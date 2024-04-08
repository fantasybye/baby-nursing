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
    <html lang="zh-CN">
      <body>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
