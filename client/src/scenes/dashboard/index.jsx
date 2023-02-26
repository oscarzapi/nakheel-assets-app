import { useIsAuthenticated } from '@azure/msal-react'
import { AttachMoney } from '@mui/icons-material'
import { Box, useMediaQuery } from '@mui/material'
import DateFilters from 'components/DateFilters'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import StatBox from 'components/StatBox'
import React from 'react'
import SignIn from 'scenes/signin'

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isAuthenticated = useIsAuthenticated();
  //const userName = useSelector((state) => state.global.userName)



  return (
    <Box m='2rem 2rem' id='Report'>
      {isAuthenticated ? (
        <Box>
      <FlexBetween >
        
        <Header title='Overview' subtitle=''>
        </Header>
        
      </FlexBetween>
      <DateFilters></DateFilters>
      <Box mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}>

          {/* ROW 1 */}
        <StatBox
          title="Total Sales"
          value={20}
          increase="+14%"
          description="Since last month"
          icon={
            <AttachMoney
              sx={{fontSize: "36px" }}
            />
          }
        />
        
      </Box>
      </Box>
      ) : (<SignIn /> )}
    </Box>
  )
}

export default Dashboard