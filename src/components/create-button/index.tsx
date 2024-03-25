import Link from "next/link";

import styles from './index.module.css';

export default function AddButton({ href, label }: Readonly<{ href: string, label: string}>) {
    return <Link href={href} className={styles.button}>{label}</Link>
}