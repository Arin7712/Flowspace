import prisma from "@/lib/prisma"

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

  console.log(workspace)

  return (
    <div>
      <h1>User ID: {userId}</h1>
      Hey {workspace ?.name}
    </div>
  )
}
