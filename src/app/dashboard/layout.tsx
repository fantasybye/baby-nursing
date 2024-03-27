import { AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";

import SideBar from "@/components/side-bar";

import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className={styles.header}>
        <div className={styles.icon}><AppstoreOutlined /></div>
        <Link href='/' className={styles.text}>运营配置后台</Link>
    </div>
    <div className={styles.divider}/>
    <div  className={styles.content}>
      <SideBar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  </>;
}
