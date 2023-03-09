import { useIsAuthenticated } from "@azure/msal-react";
import { Box, useMediaQuery } from "@mui/material";
import BubbleChart from "components/BubbleChart";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import StatBox from "components/StatBox";
import React from "react";
import SignIn from "scenes/signin";
import LineChart from "../../components/LineChart";
import { AttachMoneyOutlined } from "@mui/icons-material";


const Overall = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isAuthenticated = useIsAuthenticated();
  //const userName = useSelector((state) => state.global.userName)

  return (
    <Box m="6rem 2rem">
      {isAuthenticated ? (
        <Box>
          <FlexBetween>
            <Header title="Overview"></Header>
          </FlexBetween>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="250px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            {/* ROW 1 */}
            <Box
          gridColumn="span 6"
          gridRow="span 2"
          borderRadius="0.55rem"
        >
          
          <StatBox
                title="Total Sales"
                value={20}
                change={14}
                chart={<LineChart></LineChart>}
                icon={<AttachMoneyOutlined></AttachMoneyOutlined>}
              ></StatBox>
              </Box>
              <Box
          gridColumn="span 6"
          gridRow="span 2"
          borderRadius="0.55rem"
        >
          
          <StatBox
                title="Sales Performance"
                value={20}
                change={14}
                chart={<BubbleChart></BubbleChart>}
                icon={<AttachMoneyOutlined></AttachMoneyOutlined>}
              ></StatBox>
              </Box>
          </Box>
        </Box>
      ) : (
        <SignIn />
      )}
    </Box>
  );
};

export default Overall;
