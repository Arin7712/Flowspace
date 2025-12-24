import prisma from "@/lib/prisma"
import { SignOutButton } from "@clerk/nextjs"

type PageProps = {
  params: {
    userId: string
  }
}
export default async function UserPage({params} : PageProps) {

  const { userId } = await params


  const workspace = await prisma.workspace.findFirst({
    where: {
      ownerId: userId
    }
  })


  return (
    <main className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1>User ID: {userId}</h1>
      <h1>Welcome to {workspace?.name}</h1>
      <SignOutButton/>
    </main>
  )
}
