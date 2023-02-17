import React, { useState } from 'react'
import {Box, useMediaQuery} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "../../components/Navbar"
import Sidebar from '../../components/Sidebar'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
<Box display={isNonMobile ? 'flex': 'block'} width='100%' height='100%' justifyContent='center' m='1.5rem' >      <Sidebar
      isNonMobile={isNonMobile}
      drawerWidth='250px'
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>
      <Box flexGrow={1}>
        <Navbar isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}></Navbar>
        <Outlet></Outlet>
      </Box>
    </Box>
  )
}

export default Layout