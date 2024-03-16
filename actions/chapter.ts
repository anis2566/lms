"use server";

import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateChapter {
  title: string;
  courseId: string;
}
export const createChapter = async ({ title, courseId }: CreateChapter) => {
  const existsChapter = await db.chapter.findFirst({
    where: {
      title,
    },
  });
  if (existsChapter) {
    return {
      error: "Chapter exists",
    };
  }

  await db.chapter.create({
    data: {
      title,
      courseId,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}`);
  return {
    success: "Chapter created",
  };
};

interface ReorderChapter {
  list: { id: string; position: number }[];
}

export const reorderChapter = async ({ list }: ReorderChapter) => {
  const transaction = list.map((item) => {
    return db.chapter.update({
      where: { id: item.id },
      data: { position: item.position },
    });
  });

  try {
    await db.$transaction(transaction);
    return {
      success: "Chapters reordered",
    };
  } catch (error) {
    return {
      error: "Failed to reorder chapters",
    };
  }
};

interface UpdateChapter {
  chapterId: string;
  chapter: Chapter;
  courseId: string;
}

export const updateChapter = async ({
  chapterId,
  chapter,
  courseId,
}: UpdateChapter) => {
  const existChapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (!existChapter) {
    return {
      error: "Chapter not found",
    };
  }

  await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      ...chapter,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}/chpaters/${chapterId}`);

  return {
    success: "Chapter updated",
  };
};

interface DeletChapter {
  chapterId: string;
  courseId: string;
}

export const deleteChapter = async ({ chapterId, courseId }: DeletChapter) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (!chapter) {
    return {
      error: "Chapter not found",
    };
  }

  await db.chapter.delete({
    where: {
      id: chapterId,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}`);

  return {
    success: "Chapter deleted",
  };
};

interface PublishChapter {
  chapterId: string;
  courseId: string;
}

export const publishChapter = async ({
  chapterId,
  courseId,
}: PublishChapter) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (!chapter) {
    return {
      error: "Chapter not found",
    };
  }

  await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: "Chapter published",
  };
};

export const unpublishChapter = async ({
  chapterId,
  courseId,
}: PublishChapter) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (!chapter) {
    return {
      error: "Chapter not found",
    };
  }

  await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: "Chapter published",
  };
};

interface AddAttachments {
  title: string;
  url: string;
  chapterId: string;
  courseId: string;
}
export const addAttachment = async ({
  title,
  url,
  chapterId,
  courseId,
}: AddAttachments) => {
  await db.attachment.create({
    data: {
      title,
      url,
      chapterId,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: "Attachments added",
  };
};

interface DeleteAttachments {
  id: string;
  chapterId: string;
  courseId: string;
}

export const deleteAttachments = async ({
  id,
  chapterId,
  courseId,
}: DeleteAttachments) => {
  const attachment = await db.attachment.findUnique({
    where: {
      id,
    },
  });

  if (!attachment) {
    return {
      error: "Attachments not found",
    };
  }

  await db.attachment.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}/chapters/${chapterId}`);

  return {
    success: "Attachment deleted",
  };
};
