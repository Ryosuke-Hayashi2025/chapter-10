// app/page.tsx
"use client";

import React from "react";
import styles from "./_styles/Home.module.css";
import Link from "next/link";
import { MicroCmsPost } from "./_types/MicroCmsPost";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://q84h2qjhgn.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const { contents } = await res.json();
      setPosts(contents);
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
                  {elem.categories.map((category) => {
                    return (
                      <li className={styles.Category} key={category.id}>
                        {category.name}
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
