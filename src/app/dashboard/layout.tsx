import Link from "next/link";
import { AppstoreOutlined } from "@ant-design/icons";

import SideBar from "@/components/side-bar";

import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>
    <div className={styles.header}>
        <div className={styles.icon}><AppstoreOutlined /></div>
        <Link href='/dashboard' className={styles.text}>运营配置后台</Link>
    </div>
    <div className={styles.divider}/>
    <div  className={styles.content}>
      <SideBar />
      <div className={styles.content}>{children}</div>
    </div>
  </main>;
}
