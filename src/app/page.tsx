// app/page.tsx
"use client";

import React from "react";
import styles from "./_styles/Home.module.css";
import Link from "next/link";
import { PublicPost } from "./_types/PublicPost";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
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
    <div className={styles.container}>
      {posts.map((elem) => (
        <div key={elem.id} className={styles.Block}>
          <Link href={`/posts/${elem.id}`} className={styles.Link}>
            <div>
              <div className={styles.Tag}>
                <div className={styles.Date}>
                  {new Date(elem.createdAt).toLocaleDateString("ja-JP")}
                </div>
                <ul className={styles.Categories}>
                  {elem.postCategories.map((postCategory) => {
                    return (
                      <li
                        className={styles.Category}
                        key={postCategory.category.id}
                      >
                        {postCategory.category.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className={styles.Title}>{elem.title}</p>
              <div
                className={styles.Body}
                dangerouslySetInnerHTML={{ __html: elem.content }}
              ></div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
