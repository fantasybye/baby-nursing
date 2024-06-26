"use client"
import Link from "next/link";
import { AppstoreOutlined } from "@ant-design/icons";

import SideBar from "@/components/side-bar";
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';

import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className={styles.header}>
        <div className={styles.icon}><AppstoreOutlined /></div>
        <Link href='/dashboard' className={styles.text}>运营配置后台</Link>
    </div>
    <div className={styles.divider}/>
    <ConfigProvider locale={zhCN}>
      <div  className={styles.content}>
        <SideBar />
        <div className={styles.content}>{children}</div>
      </div>
    </ConfigProvider>
  </>;
}
