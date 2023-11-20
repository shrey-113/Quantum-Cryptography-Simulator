import { useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@mui/material/styles'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
// import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StarIcon from '@mui/icons-material/Star';
// import GroupIcon from '@mui/icons-material/Group';

import Brand from '../utils/Brand'
import { DashboardDrawer, DashboardHeading } from './DashboardFrame'



export default function NavandSidebar() {


  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      text: 'Home',
      icon: HomeRoundedIcon,
      type: 'nav',
      nav: '/home', 
    },
    {
      text: 'Basics',
      icon: ManageAccountsIcon,
      type: 'nav',
      nav: '/quantum-basics',
    },
    {
      text: 'BB84',
      icon: StarIcon,
      type: 'nav',
      nav: '/bb84',
    },
    {
      text: 'E91',
      icon: StarIcon,
      type: 'nav',
      nav: '/e91',
    },
    // {
    //   text: 'Logout',
    //   icon: ExitToAppRoundedIcon,
    //   type: 'action',
    //   // action: logout,
    // },

  ]

  return (
    <>
      <CssBaseline />
      <DashboardHeading
        open={open}
        handleDrawerOpen={() => {
          setOpen(true)
        }}
      >
        <Brand
          imageClassName='h-10'
          textClassName='text-2xl text-gray-800 font-medium'
          className=''
        />
      </DashboardHeading>
      <DashboardDrawer
        theme={theme}
        open={open}
        handleDrawerClose={() => {
          setOpen(false)
        }}
        items={navItems}
      />
    </>
  )
}
