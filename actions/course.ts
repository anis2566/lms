"use server";

import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getProgress } from "./progress";

interface CreateCourse {
  title: string;
}
export const createCourse = async ({ title }: CreateCourse) => {
  const isExists = await db.course.findFirst({
    where: {
      title: title,
    },
  });

  if (isExists) {
    return {
      error: "Course already exists",
    };
  }

  const course = await db.course.create({
    data: {
      title: title,
    },
  });
  return {
    success: "Course created",
    course,
  };
};

interface UpdateCourse {
  id: string;
  course: Course;
}

export const updateCourse = async ({ id, course }: UpdateCourse) => {
  const existCourse = await db.course.findUnique({
    where: {
      id,
    },
  });
  if (!existCourse) {
    return {
      error: "Course not found",
    };
  }

  await db.course.update({
    where: {
      id,
    },
    data: {
      ...course,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${id}`);
  return {
    success: "Course updated",
  };
};

interface PublishCourse {
  courseId: string;
}

export const publishCourse = async ({ courseId }: PublishCourse) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return {
      error: "Course not found",
    };
  }

  await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}`);

  return {
    success: "Course published",
  };
};

export const unpublishCourse = async ({ courseId }: PublishCourse) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return {
      error: "Course not found",
    };
  }

  await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: false,
    },
  });

  revalidatePath(`/admin/dashboard/courses/${courseId}`);

  return {
    success: "Course published",
  };
};

export const deleteCourse = async ({ courseId }: PublishCourse) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return {
      error: "Course not found",
    };
  }

  await db.course.delete({
    where: {
      id: courseId,
    },
  });

  revalidatePath(`/admin/dashboard/courses`);

  return {
    success: "Course deleted",
  };
};

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive",
          },
        }),
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
