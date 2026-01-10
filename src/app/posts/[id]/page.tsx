// app/posts/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import styles from "./_styles/Detail.module.css";
import { MicroCmsPost } from "../../_types/MicroCmsPost";
import { useState, useEffect } from "react";
import Image from "next/image";

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<MicroCmsPost | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://q84h2qjhgn.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };

    fetcher();
  }, [id]);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (!post) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Image
            height={400}
            width={800}
            src={post.thumbnail.url}
            alt="記事画像"
          />
          <div className={styles.Tag}>
            <div className={styles.Date}>
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <ul className={styles.Categories}>
              {post.categories.map((category) => {
                return (
                  <li className={styles.Category} key={category.id}>
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <p className={styles.Title}>{post.title}</p>
          <div
            className={styles.Body}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
