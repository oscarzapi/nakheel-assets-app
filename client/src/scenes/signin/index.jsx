import React, { useEffect } from 'react'
import {MicrosoftLoginButton} from 'react-social-login-buttons';
import {  useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Box, List, ListItem } from '@mui/material';
import profileImage from '../../assets/Nakheel.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, getData } from 'state';
import FlexBetween from 'components/FlexBetween';
import { useLazyGetDataQuery } from 'state/api';


const SignIn = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch()
  const userEmail = useSelector((state) => state.global.userEmail)
  const [trigger, result] = useLazyGetDataQuery()


  useEffect(() => {
    if (userEmail !== null)
      trigger({userEmail})
      dispatch(getData(result))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);



    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            }).then(() => {
              const userData = JSON.parse(sessionStorage.getItem(sessionStorage.key(1)))
              const userName = userData['name'].split(" ").slice(0,2).join(' ')
              const userEmail = userData['username']
              window.localStorage.setItem('USERNAME_STATE', JSON.stringify(userName));
              window.localStorage.setItem('USEREMAIL_STATE', JSON.stringify(userEmail));
              dispatch(loginSuccess(userEmail))
            })
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