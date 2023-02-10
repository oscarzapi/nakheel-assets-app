import { useTheme } from '@emotion/react'
import { Drawer } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from '../../src/assets/NakheelDeepNavy.jpg'

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const {pathname} = useLocation()
    const [active, setActive] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])
  return (
    <Box component='nav'>
        {isSidebarOpen && (
        <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant='persistent'
        anchor='left'
        sx={{
            width:drawerWidth,
            "& .MuiDrawer-paper": {
                color: theme.palette.primary[100],
                backgroundColor: theme.palette.background.alt,
                boxSizing: 'border-box',
                borderWidth: isNonMobile ? 0 : '2px',
                width: drawerWidth
            }
        }}
        >
        <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
                <FlexBetween >
                    <Box 
                    display='flex'
                     alignItems='center'
                      gap="0.5rem"
                       component='img'
                        alt='profile'
                         src={profileImage}
                         height='100%'
                         width='100%'
                         borderRadius='10%'
                         sx={{objectFit: 'cover'}}
                         >
                    </Box>
                </FlexBetween>
            </Box>

        </Box>


        </Drawer>
    )}
    </Box>
  )
}

export default Sidebar