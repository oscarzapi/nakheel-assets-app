import React, { useState, Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
//import Sidebar from "../../components/Sidebar";
import { useIsAuthenticated } from "@azure/msal-react";
import SignIn from "scenes/signin";
import CircularProgress from "@mui/material/CircularProgress";
import { setUserName, getSalesData } from "state";

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  //const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.global.userName);
  const salesData = useSelector((state) => state.global.salesData)
  const dateMode = useSelector((state) => state.global.dateMode)

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(window.localStorage.getItem("USERNAME_STATE"));
    const userSalesDataFromLocalStorage = JSON.parse(window.localStorage.getItem("USER_SALESDATA"));
    if (userFromLocalStorage !== null)
      dispatch(setUserName(userFromLocalStorage))
      dispatch(getSalesData(userSalesDataFromLocalStorage))
      console.log({'salesData':salesData})
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <Box width="100%" height="100%" justifyContent="center">
      {isAuthenticated ? (
        <Box>
          {/* <Sidebar
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          ></Sidebar> */}
          <Box flexGrow={1}>
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              userName={userName}
            ></Navbar>
            <Suspense
              fallback={
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              }
            >
              <Outlet></Outlet>
            </Suspense>
          </Box>
        </Box>
      ) : (
        <SignIn></SignIn>
      )}
    </Box>
  );
};

export default Layout;
