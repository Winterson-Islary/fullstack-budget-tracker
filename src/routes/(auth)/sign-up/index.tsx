import { Config } from '@/lib/config'
import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up/')({
  component: () => { return <SignUp signInUrl={ Config.get('sign_in_url') } signInForceRedirectUrl={ Config.get('after_sign_in') }/> } 
})