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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSalesData, setUserName } from "state";
import CircularProgress from "@mui/material/CircularProgress";
import profileImage from "assets/Nakheel.png";

const Overall = () => {
  const isMobile = useMediaQuery("(min-width: 1200px)");
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.global.userName);
  const salesData = useSelector((state) => state.global.salesData);
  const dateMode = useSelector((state) => state.global.dateMode);
  const loading = useSelector((state) => state.global.loading);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(
      window.localStorage.getItem("USERNAME_STATE")
    );
    const userSalesDataFromLocalStorage = JSON.parse(
      window.localStorage.getItem("USER_SALESDATA")
    );
    if (userFromLocalStorage !== null)
      dispatch(setUserName(userFromLocalStorage));
    dispatch(getSalesData(userSalesDataFromLocalStorage));
    //console.log(userName,dateMode, salesData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, dateMode]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading)
    return (
      <Box
        m="12rem 2rem"
        sx={{
          flexDirection: "row",
          position: "absolute",
          top: "5%",
          left: "50%"
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          component="img"
          alt="profile"
          src={profileImage}
          width="100px"
          sx={{ objectFit: "cover", marginBottom: "1rem" }}
        ></Box>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Box>
    );

  return (
    <Box m="10rem 2rem">
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
                gridColumn: isMobile ? undefined : "span 12",
              },
            }}
          >
            {/* ROW 1 */}
            <Box gridColumn="span 6" gridRow="span 2" borderRadius="0.55rem">
              <StatBox
                title="Total Sales"
                value={salesData["totalSales"]}
                change={salesData["percentageChange"]}
                chart={
                  salesData["salesData"] && (
                    <LineChart
                      data={salesData["salesData"]}
                      title="Total Sales"
                      width="100%"
                      height="80%"
                    ></LineChart>
                  )
                }
                icon={<AttachMoneyOutlined></AttachMoneyOutlined>}
              ></StatBox>
            </Box>
            <Box gridColumn="span 6" gridRow="span 2" borderRadius="0.55rem">
              <StatBox
                title="Sales Performance"
                value={20}
                change={14}
                chart={<BubbleChart data={salesData}></BubbleChart>}
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
