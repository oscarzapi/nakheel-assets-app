import React from 'react'
import {MicrosoftLoginButton} from 'react-social-login-buttons';
import {  useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Box, List, ListItem } from '@mui/material';
import profileImage from '../../assets/Nakheel.png'
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'state';
import FlexBetween from 'components/FlexBetween';


const SignIn = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch()
  
    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            }).then(() => {
              const userData = JSON.parse(sessionStorage.getItem(sessionStorage.key(2)))
              const userName = userData['name'].split(" ").slice(0,2).join(' ')
              window.localStorage.setItem('USERNAME_STATE', JSON.stringify(userName));
              dispatch(loginSuccess(userName))
            });
        }
        
        //setUserName(userData['name'])
        //navigate('/dashboard')
    }
  return (
    <Box>
    <FlexBetween>
    <List >
      <ListItem>
      <Box   
                component="img"
                alt="profile"
                src={profileImage}
                height="120px"
                width="250px"
                borderRadius="7%"
                sx={{ objectFit: "cover" }}>
                </Box>
                </ListItem>
                <ListItem>
                <Box>
                <MicrosoftLoginButton onClick={() => handleLogin("popup")}>
      Sign in with Microsoft
    </MicrosoftLoginButton>
                </Box>
                </ListItem>
                
    </List>
    </FlexBetween>
    </Box>
    
  )
}

export default SignIn