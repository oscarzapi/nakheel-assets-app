import { useTheme } from '@emotion/react'
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from '../../src/assets/nakheel-removebg.png'
import { AutoFixHigh, AutoFixHighOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ReceiptLongOutlined, ReceiptOutlined, TrendingUpOutlined } from '@mui/icons-material'

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

    const navItems = [
        {
            text: "Dashboard",
            icon: <HomeOutlined></HomeOutlined>
        },
        {
            text: "Comments",
            icon: <ReceiptOutlined></ReceiptOutlined>
        },
        {
            text: "FootfallSales",
            icon: <TrendingUpOutlined></TrendingUpOutlined>
        },
        {
            text: "Predictions",
            icon: <AutoFixHighOutlined></AutoFixHighOutlined>
        },
        {
            text: "Admin",
            icon: <ReceiptLongOutlined></ReceiptLongOutlined>
        }

    ]
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
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <ChevronLeft></ChevronLeft>
                    </IconButton>
                </FlexBetween>
            </Box>
            <List>
                {navItems.map(({text,icon}) => {
                    if(!icon){
                        return (
                            <Typography key={text} sx={{m:'2ream 0 1rem 3rem'}}></Typography>
                        )
                    }
                    const lcText = text.toLowerCase()
                    return (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(`/${lcText}`)
                            }}
                            sx={{
                                backgroundColor: active === lcText 
                                    ? '#F0F0F0'
                            : "transparent",
                            color: active === lcText &&
                            theme.palette.mode === 'dark' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'dark' ? '#F0F0F0' : theme.palette.mode === 'light' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'light' ? '#78A1BB' : '#22223b' 
                            }}>
                                <ListItemIcon
                                    sx={{
                                        ml:'2rem',
                                        color:
                                        active === lcText &&
                            theme.palette.mode === 'dark' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'dark' ? '#F0F0F0' : theme.palette.mode === 'light' ? '#78A1BB': active !== lcText &&
                            theme.palette.mode === 'light' ? '#78A1BB' : '#22223b'
                                    }}>{icon}</ListItemIcon>
                                    <ListItemText primary={text}></ListItemText>
                                    {active === lcText && (
                                        <ChevronRightOutlined sx={{ml:"auto"}}></ChevronRightOutlined>
                                    )}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

        </Box>


        </Drawer>
    )}
    </Box>
  )
}

export default Sidebar