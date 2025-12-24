import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { ensureUser } from "@/lib/db/user";

export const runtime = "nodejs";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`);
  }

  // Create the user if they don't exist
  const dbUser = await ensureUser({
    clerkId: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    preferredName: user.firstName,
  });

  // Get base URL from .env
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_APP_URL is not defined");

  if (!dbUser.isOnboarded) {
    return NextResponse.redirect(`${baseUrl}/onboarding`);
  }

  // return NextResponse.redirect(`${baseUrl}/dashboard`);
  return NextResponse.redirect(
    new URL(`/${dbUser.id}`, process.env.NEXT_PUBLIC_APP_URL!)
  );
}
