import { Config } from '@/lib/config'
import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-in/')({
  component: () => { return <SignIn signUpUrl={Config.get('sign_up_url')} signUpForceRedirectUrl={ Config.get('after_sign_up') }/> } 
})