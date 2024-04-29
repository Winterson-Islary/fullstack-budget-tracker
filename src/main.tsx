import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Config } from './lib/config.ts'
import { ClerkProvider } from '@clerk/clerk-react'
import { App } from './components/App.tsx'



const PUBLISHABLE_KEY = Config.get("publishable_key")


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
