"use server";

import {OnboardingForm} from '@/components/forms/OnboardingForm'
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

const Onboarding = async() => {

  const user = await currentUser();
  const dbUser = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
    },
  });

  if(!dbUser) throw new Error("User not found");
  
  return (
    <main className='flex justify-center items-center h-screen'>
      <OnboardingForm clerkId={user?.id || ''} userId={dbUser.id}/>
    </main>
  )
}

export default Onboarding
