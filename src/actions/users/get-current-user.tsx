// "use server";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@prisma/client";
import { cache } from "react";

const notFoundResponse = {
  success: false,
  message: "User not found",
} as const;

async function getCurrentUser(): Promise<ServiceResponse<User>> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return notFoundResponse;
  }
  try {
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) return notFoundResponse;
    return {
      data: dbUser,
      message: "User found",
      success: true,
    };
  } catch (error) {
    return notFoundResponse;
  }
}

export default cache(getCurrentUser);
