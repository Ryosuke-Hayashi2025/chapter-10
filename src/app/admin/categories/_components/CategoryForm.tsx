// app/admin/categories/_componets/CategoryForm.tsx
// 管理者_カテゴリー一覧の更新・削除・新規作成ページ（共通）

import React from "react";
import styles from "./_styles/CategoryForm.module.css";

interface Props {
  mode: "new" | "edit";
  name: string;
  setName: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  disabled: boolean;
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
  disabled,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div>
        <label htmlFor="title" className={styles.Label}>
          カテゴリー名
        </label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.Input}
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
