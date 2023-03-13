import { useIsAuthenticated } from "@azure/msal-react";
import { AttachMoneyOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import BubbleChart from "components/BubbleChart";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import StatBox from "components/StatBox";
import React from "react";
import { useSelector } from "react-redux";
import SignIn from "scenes/signin";

const TotalSalesDetails = () => {
  const isAuthenticated = useIsAuthenticated();
  const userName = useSelector((state) => state.global.userName);
  const salesData = useSelector((state) => state.global.salesData)
  const dateMode = useSelector((state) => state.global.dateMode)
  const filter = useSelector((state) => state.global.filter)
  console.log(userName, salesData, dateMode, filter)

  return (
    <Box m="10rem 2rem">
      {isAuthenticated ? (
        <Box>
          <FlexBetween>
            <Header title="Details"></Header>
          </FlexBetween>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="250px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: "span 12",
              },
            }}
          >
            {/* ROW 1 */}
            <Box gridColumn="span 6" gridRow="span 2" borderRadius="0.55rem">
              <StatBox
                title="Total Sales"
                value={10}
                change={10}
                chart={
                  <BubbleChart></BubbleChart>
                }
                icon={<AttachMoneyOutlined></AttachMoneyOutlined>}
              ></StatBox>
            </Box>
          </Box>
        </Box>
      ) : (
        <SignIn></SignIn>
      )}
    </Box>
  );
};

export default TotalSalesDetails;
