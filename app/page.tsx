import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
  return (
    <div className='flex justify-center items-center h-screen gap-4'>
      <Link className={buttonVariants()} href='/sign-up'>Sign up</Link>
      <Link className={buttonVariants()} href='/sign-in'>Sign in</Link>
    </div>
  )
}

export default Page
