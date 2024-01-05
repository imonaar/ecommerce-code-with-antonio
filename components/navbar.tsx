import { redirect } from 'next/navigation'
import { UserButton, auth } from '@clerk/nextjs'

import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from './theme-toggle'

export async function Navbar() {
  const {userId} = auth()

  if (!userId) {
    redirect('/')
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
       <StoreSwitcher items={stores}/>
        <MainNav className='ml-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle/>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}
