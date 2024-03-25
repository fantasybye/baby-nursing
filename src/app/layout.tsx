import type { Metadata } from "next";
import { AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";

import SideBar from "@/components/side-bar";

import './globals.css';

import styles from "./layout.module.css";



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
          <div className={styles.header}>
              <div className={styles.icon}><AppstoreOutlined /></div>
              <Link href='/' className={styles.text}>运营配置后台</Link>
          </div>
          <div className={styles.divider}/>
          <div  className={styles.content}>
            <SideBar />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
