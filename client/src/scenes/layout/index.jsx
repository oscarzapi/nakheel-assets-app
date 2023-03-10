import React, { useState, Suspense } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
//import Sidebar from "../../components/Sidebar";
import { useIsAuthenticated } from "@azure/msal-react";
import SignIn from "scenes/signin";
import CircularProgress from "@mui/material/CircularProgress";

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  //const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = useSelector((state) => state.global.userName);

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
