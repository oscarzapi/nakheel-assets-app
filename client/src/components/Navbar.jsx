import React from "react";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined
} from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import FlexBetween from "./FlexBetween";
import { Box } from "@mui/system";
import profileImage from "assets/Nakheel.png";
import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
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
import SearchIcon from "@mui/icons-material/Search";

const todaysDate = new Date().toISOString().split("T")[0];

const Navbar = ({ userData, userName, isSidebarOpen, setIsSidebarOpen }) => {
  //const dispatch = useDispatch()
  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  //const data = [{exampleData:1}]

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
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        color: "#03293C",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", margin: "1.2rem" }}>
        {/* LEFT SIDE*/}
        <FlexBetween>
          <IconButton
            sx={{ color: "#03293C" }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <TextField
          sx={{marginLeft:'1rem'}}
            label="Filter..."
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FlexBetween>
        {/* RIGHT SIDE*/}
        <FlexBetween sx={{marginLeft: 'inherit'}}>
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
          <Box>
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
        </Box>
        </FlexBetween>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
