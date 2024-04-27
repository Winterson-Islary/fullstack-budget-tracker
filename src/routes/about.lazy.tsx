import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About, 
})

function About() { 
  return (
    <div className='p-2'>
        <h3>HELLO FROM ABOUT PAGE!</h3>
    </div>
  )
}