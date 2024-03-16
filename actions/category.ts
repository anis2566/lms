"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Category {
  name: string;
  imageUrl: string;
}

export const createCategory = async (values: Category) => {
  const isExists = await db.category.findUnique({
    where: {
      name: values.name,
    },
  });

  if (isExists) {
    return {
      error: "Category already exists",
    };
  }

  await db.category.create({
    data: values,
  });

  revalidatePath("/admin/dashboard/category");

  return {
    success: "Category created",
  };
};

interface UpdateCategory {
  id: string;
  name: string;
  imageUrl: string;
}

export const updateCategory = async ({
  id,
  name,
  imageUrl,
}: UpdateCategory) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    return {
      error: "Category not found",
    };
  }

  await db.category.update({
    where: {
      id,
    },
    data: {
      name,
      imageUrl,
    },
  });

  revalidatePath("/admin/dashboard/category");

  return {
    success: "Category updated",
  };
};

export const deleteCategory = async (id: string) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    return {
      error: "Category not found",
    };
  }

  await db.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/dashboard/category");

  return {
    success: "Category deleted",
  };
};

export const getCategories = async () => {
  const categories = await db.category.findMany();
  return { categories };
};
