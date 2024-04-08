"use client"
import LoginForm from "@/components/login-form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
        <LoginForm />
    </div>
  );
}
