// app/admin/categories/page.tsx
// 管理者用_カテゴリー一覧画面
"use client";

import Link from "next/link";
import styles from "../posts/_styles/AdminHome.module.css";
import { useState, useEffect } from "react";
import { CategoriesIndexResponse } from "@/app/api/admin/categories/route";

export default function AdminCategoriesHome() {
  const [categories, setCategories] = useState<
    CategoriesIndexResponse["categories"]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fethcer = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
      setIsLoading(false);
    };

    fethcer();
  }, []);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="">
      <div className={styles.Wrapper}>
        <p className={styles.Title}>カテゴリー一覧</p>
        <Link href="/admin/categories/new" className={styles.NewButton}>
          新規作成
        </Link>
      </div>
      {categories.map((category) => (
        <div key={category.id} className={styles.Block}>
          <Link
            href={`/admin/categories/${category.id}`}
            className={styles.Link}
          >
            <div className="">{category.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
