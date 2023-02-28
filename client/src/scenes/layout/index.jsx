import React, { useState, Suspense } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useIsAuthenticated } from "@azure/msal-react";
import SignIn from "scenes/signin";

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //const dispatch = useDispatch()
  const userName = useSelector((state) => state.global.userName.split(" ")[0]);

  /* useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem(sessionStorage.key(1)))
    dispatch(loginSuccess(userData['name']))
  },[]) */

  return (
    <Box width="100%" height="100%" justifyContent="center">
      {isAuthenticated ? (
        <Box>
          <Sidebar
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          ></Sidebar>
          <Box flexGrow={1}>
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              userName={userName}
            ></Navbar>
            <Suspense fallback={<h1>Loading...</h1>}>
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
