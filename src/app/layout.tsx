import type { Metadata } from "next";

import './globals.css';
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';

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
      <ConfigProvider locale={zhCN}>
        <main>
            {children}
        </main>
        </ConfigProvider>
      </body>
    </html>
  );
}
