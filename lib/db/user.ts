"use server";
import prisma from "../prisma";
import { io } from "../socket";


type EnsureUserProps = {
  clerkId: string;
  preferredName?: string | null;
  email: string;
};

export async function ensureUser({
  clerkId,
  preferredName,
  email,
}: EnsureUserProps) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        preferredName,
        email,
        isOnboarded: false, // 👈 important
      },
    });

    console.log("User successfully created.");
    return user;
  } catch (error) {
    console.error("Error ensuring user:", error);
    throw error;
  }
}

export async function UpdatePreferredName({userId, updatedName} : {userId: string, updatedName: string}){
  try{
    const user = await prisma.user.update({
      where: {id: userId},
      data: {preferredName: updatedName}
    })

await fetch("http://localhost:4000/emit-name-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, preferredName: updatedName }),
    });

    console.log("User successfully updated.");
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
  }
}