// CategoriesIndexResponse.ts

export type CategoriesIndexResponse = {
  categories: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
};