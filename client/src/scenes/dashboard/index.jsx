import { DownloadOutlined, AttachMoney } from '@mui/icons-material'
import { Box, Button, useMediaQuery } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import StatBox from 'components/StatBox'
import React from 'react'

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box m='2rem 2rem'>
      <FlexBetween >
        <Header title='Overview' subtitle=''>
        </Header>
        <Box>
          <Button
            sx={{
              //backgroundColor: theme.palette.secondary.light,
              variant:"outlined",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              color: "#03293C"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
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
        <StatBox
          title="Total Sales"
          value={20}
          increase="+14%"
          description="Since last month"
          icon={
            <AttachMoney
            sx={{ fontSize: "36px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={20}
          increase="+14%"
          description="Since last month"
          icon={
            <AttachMoney
              sx={{ fontSize: "36px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={20}
          increase="+14%"
          description="Since last month"
          icon={
            <AttachMoney
            sx={{ fontSize: "36px" }}
            />
          }
        />

      </Box>

    </Box>
  )
}

export default Dashboard