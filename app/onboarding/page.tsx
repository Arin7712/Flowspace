"use server";

import {OnboardingForm} from '@/components/ui/forms/OnboardingForm'
import { currentUser } from '@clerk/nextjs/server';

const Onboarding = async() => {

  const user = await currentUser();
  
  return (
    <main className='flex justify-center items-center h-screen'>
      <OnboardingForm clerkId={user?.id || ''}/>
    </main>
  )
}

export default Onboarding
