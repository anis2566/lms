"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

type CreateUser = {
  name: string;
  email: string;
  externalId: string;
  imageUrl?: string;
};

export const createUser = async (values: CreateUser) => {
  const isExists = await db.user.findFirst({
    where: {
      email: values.email,
    },
  });

  if (isExists) return;

  await db.user.create({
    data: {
      name: values.name,
      email: values.email,
      externalId: values.externalId,
      imageUrl: values.imageUrl,
    },
  });

  return {
    sucess: "user created",
  };
};

export const deleteUser = async (externalId: string) => {
  const user = await db.user.findFirst({
    where: {
      externalId: externalId,
    },
    select: {
      id: true, // Select only the id
    },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  await db.user.delete({
    where: {
      id: user.id, // Use the id here
    },
  });

  return {
    message: "User deleted",
  };
};

type UpdateUser = {
  name: string;
  email: string;
  externalId: string;
  imageUrl: string;
};

export const updateUser = async (user: UpdateUser) => {
  const existUser = await db.user.findFirst({
    where: {
      externalId: user.externalId,
    },
  });

  if (!existUser) {
    // Check if existUser is null
    return {
      error: "User not found",
    };
  }

  await db.user.update({
    where: {
      id: existUser.id,
    },
    data: {
      ...user,
    },
  });

  return {
    success: "User updated",
  };
};

export const getUserById = async (externalId: string) => {
  const user = await db.user.findFirst({
    where: {
      externalId,
    },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  return user;
};
