import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
        <p className={styles.welcome}>欢迎来到运营配置后台！</p>
    </div>
  );
}
