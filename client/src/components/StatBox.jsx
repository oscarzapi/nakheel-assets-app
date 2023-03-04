import React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import {
  Top10Performers,
  Bottom10Performers,
  FactsToCheck,
  Predictions,
} from "./Details";
import { useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";

const StatBox = ({ title, value, change, chart}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  return (
    <Box
      gridColumn="span 12"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      boxShadow="1px 3px 5px 1px #9E9E9E"
      backgroundColor="#F5F1E8"
      borderRadius="0.55rem"
      height="500px"
      color="#03293C"
    >
      <FlexBetween>
        <Typography variant="h4" sx={{ color: "#03293C" }}>
          {title}
        </Typography>
        <IconButton onClick={handleClick}>
          <ArrowDropDownOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <Menu
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
        >
          <MenuItem>
            <Top10Performers></Top10Performers>
          </MenuItem>
          <MenuItem>
            <Bottom10Performers></Bottom10Performers>
          </MenuItem>
          <MenuItem>
            <FactsToCheck></FactsToCheck>
          </MenuItem>
          <MenuItem>
            <Predictions></Predictions>
          </MenuItem>
        </Menu>
      </FlexBetween>
      {chart}
      <FlexBetween gap="1rem">
      <Typography variant="h4" sx={{color: change > 0 ? 'green':'red'}}> {value}</Typography>
        <Typography variant="h4" sx={{color: change > 0 ? 'green':'red'}}> {change}%</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
