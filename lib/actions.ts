"use server";

import prisma from "./prisma";

/* ------------------ helper (separate logic) ------------------ */
async function markUserOnboarded(clerkId: string) {
  await prisma.user.update({
    where: { clerkId },
    data: { isOnboarded: true },
  });
}

export async function createWorkspace({
  name,
  clerkId,
}: {
  name: string;
  clerkId: string;
}) {
  try {
    // Get the user from db for which to create a workspace
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });
    if (!dbUser) throw new Error("User not found in DB");

    // Create a workspace
    const workspace = await prisma.workspace.create({
      data: {
        name,
        ownerId: dbUser.id,
      },
    });

    // 3. Mark user as onboarded (separate logic)
    await markUserOnboarded(clerkId);
    console.log(`Workspace "${name}" created & user onboarded`);
    return workspace;
  } catch (error) {
    console.log("Failed to create workspace", error);
    throw error;
  }
}
