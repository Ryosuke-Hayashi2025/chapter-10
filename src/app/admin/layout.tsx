// app/admin/layout.tsx

import AdminHeader from "./_components/AdminHeader";
import AdminAside from "./_components/AdminAside";
import styles from "./_components/_styles/AdminLayout.module.css";

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <AdminHeader />
      <div className={styles.main}>
        <AdminAside />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
