// app/admin/posts/_componets/PostForm.tsx
// 管理者_記事の更新・削除・新規作成ページ（共通）

import React from "react";
import { CategoriesSelect } from "./CategoriesSelect";
import { Category } from "@/app/api/admin/posts/[id]/route";
import styles from "./_styles/PostForm.module.css";

interface Props {
  mode: "new" | "edit";
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  disabled: boolean;
}

export const PostForm: React.FC<Props> = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
  disabled,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div>
        <label htmlFor="title" className={styles.Label}>
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.Input}
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="content" className={styles.Label}>
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.Input}
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="thumbnailUrl" className={styles.Label}>
          サムネイルURL
        </label>
        <input
          type="text"
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className={styles.Input}
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="categories" className={styles.Label}>
          カテゴリー
        </label>
        <CategoriesSelect
          selectedCategories={categories}
          setSelectedCategories={setCategories}
          disabled={disabled}
        />
      </div>
      <div className={styles.ButtonRow}>
        <button
          type="submit"
          className={styles.ButtonUpdate}
          disabled={disabled}
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            className={styles.ButtonDelete}
            disabled={disabled}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
