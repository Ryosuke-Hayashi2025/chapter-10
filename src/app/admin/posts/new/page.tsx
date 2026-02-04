// app/admin/posts/new/page.tsx
// 管理者_記事の新規作成ページ
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostForm } from "../_components/PostForm";
import { Category } from '@/app/api/admin/posts/[id]/route'
import { CreatePostRequestBody } from "@/app/api/admin/posts/route";

export default function AdminCreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      setIsSubmitting(true);

      const body: CreatePostRequestBody = {
        title,
        content,
        thumbnailUrl,
        categories,
      };

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    
      const { id } = await res.json();
      router.push(`/admin/posts/${id}`);
      alert("記事を作成しました。");
    } catch (error) {
      console.error("記事の作成に失敗しました:", error);
      alert("記事の作成に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div>
        <h1>記事作成</h1>
      </div>
      <PostForm
        mode="new"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}
