// app/admin/posts/page.tsx
// 管理者用_記事一覧画面
"use client";

import Link from "next/link";
import styles from "./_styles/AdminHome.module.css";
import { useState, useEffect } from "react";
import { PostsIndexResponse } from "./_types/PostsIndexResponse";

export default function AdminPostsHome() {
  const [posts, setPosts] = useState<PostsIndexResponse["posts"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/posts");
      const { posts } = await res.json();
      setPosts(posts);
      setIsLoading(false);
    };

    fetcher();
  }, []);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="">
      <div className={styles.Wrapper}>
        <p className={styles.Title}>記事一覧</p>
        <Link href="/admin/posts/new" className={styles.NewButton}>
          新規作成
        </Link>
      </div>
      {posts.map((post) => (
        <div key={post.id} className={styles.Block}>
          <Link href={`/admin/posts/${post.id}`} className={styles.Link}>
            <div className="">
              <div className={styles.PostTitle}>{post.title}</div>
              <div className="">
                {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
