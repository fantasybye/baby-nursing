'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import styles from './index.module.css';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: '简历管理', href: '/resume' },
  { name: '认证管理', href: '/auth' },
  { name: '分享管理', href: '/share' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn([styles.link, {[styles.active]: link.href === pathname }])}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
