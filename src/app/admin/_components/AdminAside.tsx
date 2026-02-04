// app/admin/_components/AdminAside.tsx

import Link from "next/link";
import styles from "./_styles/AdminAside.module.css";

export default function AdminAside() {
  return (
    <aside className={styles.aside}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Link href="/admin/posts">記事一覧</Link>
          </li>
          <li>
            <Link href="/admin/categories">カテゴリー一覧</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
