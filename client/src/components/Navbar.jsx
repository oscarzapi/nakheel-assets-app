import React from "react";
import {
  ArrowDropDownOutlined,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import FlexBetween from "./FlexBetween";
import { Box } from "@mui/system";
import profileImage from "assets/Nakheel.png";
import {
  AppBar,
  Autocomplete,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignOutButton } from "./SignOutButton";
import { SignInButton } from "./SignInButton";
import { useState } from "react";
//import domtoimage from 'dom-to-image';
import * as htmlToImage from "html-to-image";
import DateFilters from "./DateFilters";
import { useLazyGetSalesDataQuery } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSalesData, setFilter, setLoading } from "state";
import { useLocation, useNavigate } from "react-router-dom";

const todaysDate = new Date().toISOString().split("T")[0];

const Navbar = ({ userName, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const salesData = useSelector((state) => state.global.salesData);
  const dateMode = useSelector((state) => state.global.dateMode);
  const userEmail = useSelector((state) => state.global.userEmail);

  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [filterData, setFilterData] = useState("");
  //const data = [{exampleData:1}]
  const [trigger, { data, loading }] = useLazyGetSalesDataQuery();
  const handleChange = (event, newFilter) => {
    console.log(data)
    setFilterData(newFilter);
    dispatch(setFilter(newFilter));
    dispatch(setLoading(loading))
    trigger({ userEmail, dateMode, filter: newFilter });
  };
  const handleClickBack = () => {
    navigate('overall')
  }
  useEffect(() => {
    data && dispatch(getSalesData(data));
    data && window.localStorage.setItem("USER_SALESDATA", JSON.stringify(data));
    window.localStorage.setItem("USER_FILTERDATA", JSON.stringify(filterData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSendEmail = async () => {
    var node = document.getElementById("root");
    //let node2 = useRef(null)
    await htmlToImage
      .toPng(node)
      //domtoimage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        //document.body.appendChild(img);
        const exportFileDefaultName = `sales_${todaysDate}.png`;
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUrl);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
        window.open(
          `mailto:?subject=sales_${todaysDate}&body=${(
            <img alt="report" src={dataUrl} height="100px" width="200px" />
          )}`
        );
      })
      .catch(function (error) {
        console.error("oops, something wents wrong!", error);
      });
    /*
      const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
      const exportFileDefaultName = "download.csv"
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click(); */
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#fcfcfc",
        boxShadow: "none",
        color: "#03293C",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", margin: "0.5rem" }}>
        <Box flexGrow={1}>
          {/* LEFT SIDE*/}

          <FlexBetween>
            <FlexBetween>
              {salesData && salesData["AssetsAndTenantNames"] && (
                <Autocomplete
                  id="combo-box-demo"
                  options={salesData["AssetsAndTenantNames"]}
                  sx={{ width: 160 }}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter..."
                      variant="standard"
                    />
                  )}
                />
              )}
            </FlexBetween>
            {/* RIGHT SIDE*/}
            <FlexBetween sx={{ marginLeft: "inherit" }}>
              <Button
                onClick={handleSendEmail}
                sx={{
                  //backgroundColor: theme.palette.secondary.light,
                  variant: "outlined",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#03293C",
                }}
              >
                <EmailIcon />
              </Button>
              <IconButton onClick={handleClick}>
                <Box sx={{ flexDirection: "row" }}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    component="img"
                    alt="profile"
                    src={profileImage}
                    //height='35px'
                    width="80px"
                    sx={{ objectFit: "cover" }}
                  ></Box>
                  <Typography fontSize="0.75rem" mt="5px">
                    {userName}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined sx={{ fontSize: "25px" }} />
              </IconButton>

              <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
              >
                <MenuItem>
                  {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
          <FlexBetween>
            <DateFilters></DateFilters>
            {pathname !== "/overall" ? (
              <Button onClick={handleClickBack}>
                <KeyboardBackspaceOutlined></KeyboardBackspaceOutlined>
              </Button>
            ) : (
              <></>
            )}
          </FlexBetween>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
