"use server";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getCurrentUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user === null || !user.id) {
    return null;
  }
  try {
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    return dbUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
