import styles from './index.module.css'

export default function Layout({
    title,
    extra = <></>,
    children,
  }: Readonly<{
    title: string;
    extra?: React.ReactNode;
    children: React.ReactNode;
  }>) {
    return <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.extra}>{extra}</div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </>
  }