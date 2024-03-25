import { AppstoreOutlined } from '@ant-design/icons';
import NavLinks from '@/components/nav-links';
import Link from 'next/link';

import styles from './index.module.css';

export default function SideBar() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.icon}><AppstoreOutlined /></div>
            <Link href='/' className={styles.text}>运营配置后台</Link>
        </div>
        <div className={styles.divider}/>
        <NavLinks />
    </div>
  );
}
