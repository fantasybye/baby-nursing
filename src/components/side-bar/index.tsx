import { AppstoreOutlined } from '@ant-design/icons';
import NavLinks from '@/components/nav-links';
import Link from 'next/link';

import styles from './index.module.css';

export default function SideBar() {
  return (
    <div className={styles.container}> 
        <NavLinks />
    </div>
  );
}
