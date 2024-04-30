import React from 'react'
import ReactDOM from 'react-dom/client'
import { Config } from '@/lib/config.ts'
import { ClerkProvider } from '@clerk/clerk-react'
import { Router } from '@/components/Router.tsx'
import { ThemeProvider } from 'next-themes'
import '@/styles/index.css'



// CLERK
const PUBLISHABLE_KEY = Config.get("publishable_key")


// RENDERER
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme='dark' enableSystem disableTransitionOnChange>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Router />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
