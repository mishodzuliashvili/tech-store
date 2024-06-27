import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong, sorry...");
  }

  let dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        givenName: user.given_name ?? "",
        familyName: user.family_name ?? "",
        // profileImage: user.picture ?? "",
        // AND SO ON...
      },
    });
  }

  return NextResponse.redirect(process.env.PRISMA_USER_CREATION_REDIRECT_URL!);
}
