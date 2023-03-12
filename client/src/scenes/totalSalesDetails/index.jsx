import { useIsAuthenticated } from '@azure/msal-react';
import { Box } from '@mui/material'
import React from 'react'
import SignIn from 'scenes/signin';

const TotalSalesDetails = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Box m="6rem 5rem">
      {isAuthenticated ? (
        <Box>
        <div >TotalSalesDetails</div>
        </Box>
      ) : (
        <SignIn />)
          }
    </Box>
    
  )
}

export default TotalSalesDetails