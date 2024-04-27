import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Config } from './lib/config.ts'
import { ClerkProvider } from '@clerk/clerk-react'

const router = createRouter({ routeTree })

const PUBLISHABLE_KEY = Config.get("publishable_key")

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
