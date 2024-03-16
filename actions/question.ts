"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateQuestion = {
  chapterId: string;
  userName: string;
  imageUrl?: string;
  text: string;
  courseId: string;
};

export const createQuestion = async (values: CreateQuestion) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: values.chapterId,
    },
  });

  if (!chapter) {
    return {
      error: "Chapter not found",
    };
  }

  await db.question.create({
    data: {
      chapterId: values.chapterId,
      userName: values.userName,
      text: values.text,
      imageUrl: values.imageUrl,
    },
  });

  revalidatePath(
    `/admin/courses/${values.courseId}/chapters/${values.chapterId}`
  );

  return {
    success: "Question added",
  };
};
