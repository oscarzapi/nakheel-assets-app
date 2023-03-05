import React, { useState, Suspense, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useIsAuthenticated } from "@azure/msal-react";
import SignIn from "scenes/signin";
import CircularProgress from "@mui/material/CircularProgress";

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //const dispatch = useDispatch()
  const userName = useSelector((state) => state.global.userName);
  const [userNameAux, setUserNameAux] = useState("");

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem("USERNAME_STATE");
    if (userFromLocalStorage !== null)
      setUserNameAux(JSON.parse(userFromLocalStorage));
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
              userName={userNameAux}
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
