// app/admin/_component/AdminHeader.tsx

import styles from "./_styles/AdminHeader.module.css";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.Link}>
        Blog
      </Link>
      <Link href="/admin/posts" className={styles.Link}>
        管理画面
      </Link>
    </div>
  );
}
