import React from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined, Image, HomeOutlined, ReceiptOutlined, TrendingUpOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import { Box } from '@mui/system'
import profileImage from 'assets/nakheel-removebg.png'
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material'

const Navbar = ({userData, userName, isSidebarOpen, setIsSidebarOpen}) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    



  return (
    <AppBar sx={{
        position: "static",
        background: "none",
        boxShadow: "none"
    }}
    >
        <Toolbar sx={{justifyContent: "space-between"}}>
            {/* LEFT SIDE*/}
            <FlexBetween color='white'>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.alt}
                 borderRadius='9px' gap='3rem' p='0.1rem 1.5rem'>
                    <InputBase placeholder='Search...'></InputBase>
                    <IconButton></IconButton>
                </FlexBetween>
            </FlexBetween>
            {/* RIGHT SIDE*/}
        <FlexBetween gap='1.5rem'>
            <IconButton onClick={() => console.log('take me to Nakheel Website')}>
            <Box 
                    display='flex'
                     alignItems='center'
                      gap="0.5rem"
                       component='img'
                        alt='profile'
                         src={profileImage}
                         height='30px'
                         width='50px'
                         borderRadius='10%'
                         sx={{objectFit: 'cover'}}
                         >
                    </Box>
            </IconButton>
            <IconButton>
                <SettingsOutlined></SettingsOutlined>
            </IconButton>
        </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar