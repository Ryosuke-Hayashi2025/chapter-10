// src/app/api/admin/categories/route.ts
// 管理者_カテゴリー一覧取得API

import { prisma } from "@/app/_libs/prisma";
import { NextResponse } from "next/server";

export type CategoriesIndexResponse = {
  categories: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json<CategoriesIndexResponse>(
      { categories },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

// src/app/api/admin/categories/route.ts
// 管理者_カテゴリー作成API

// カテゴリー作成時に送られてくるリクエストの型
export type CreateCategoryRequestBody = {
  name: string;
};

// カテゴリー作成APIのレスポンス型
export type CreateCategoryResponse = {
  id: number;
};

// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (request: Request) => {
  try {
    // リクエストのbodyを取得
    const body: CreateCategoryRequestBody = await request.json();

    // bodyの中からnameを取り出す
    const { name } = body;

    // カテゴリーをDBに生成
    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    // レスポンスを返す
    return NextResponse.json<CreateCategoryResponse>({
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
};
