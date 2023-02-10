import React from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined, Image } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import { Box } from '@mui/system'
import profileImage from 'assets/NakheelDeepNavy.jpg'
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material'

const Navbar = () => {
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
                <IconButton onClick={() => console.log('open sidebar')}>
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
                Nakheel Icon
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