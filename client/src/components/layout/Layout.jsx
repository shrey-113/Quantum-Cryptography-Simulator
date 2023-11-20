import { Outlet } from 'react-router-dom'

import NavandSidebar from './NavandSidebar'
import { DrawerHeader } from './DashboardFrame'

function Layout() {
  return (
    <div className='flex'>
      <NavandSidebar />

      <div
        className='p-5 pt-0'
        style={{
          height: '100vh',
          flexGrow: 1,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
