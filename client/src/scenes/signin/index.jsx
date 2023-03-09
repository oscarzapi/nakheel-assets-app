import React, { useEffect } from 'react'
import {MicrosoftLoginButton} from 'react-social-login-buttons';
import {  useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Box, List, ListItem } from '@mui/material';
import profileImage from '../../assets/Nakheel.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, getSalesData, setDateMode } from 'state';
import FlexBetween from 'components/FlexBetween';
import { useLazyGetSalesDataQuery } from 'state/api';


const SignIn = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch()
  const userEmail = useSelector((state) => state.global.userEmail)
  const dateMode = useSelector((state) => state.global.dateMode)
  const [trigger, result] = useLazyGetSalesDataQuery()


  useEffect(() => {
    if (userEmail !== null) console.log(userEmail)
      trigger({userEmail, dateMode})
      .then(() => {
      //console.log(result)
      result && result.data && dispatch(getSalesData(result.data.salesData))
      dispatch(setDateMode(dateMode))
      result && result.data && window.localStorage.setItem('USER_SALESDATA', JSON.stringify(result.data.salesData));
      window.localStorage.setItem('USER_DATEMODE', JSON.stringify(dateMode));
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);



    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            }).then(() => {
              const userData = JSON.parse(sessionStorage.getItem(sessionStorage.key(2)))
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