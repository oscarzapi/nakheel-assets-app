import React from "react";
import { Box, Button, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { ArrowRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const StatBox = ({ title, value, change, chart, icon }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`You clicked ${title.toLowerCase()}`);
  };
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
        <Typography variant="h5" sx={{ color: "#03293C", marginBottom: '0px' }}>
          {title}
          <Typography sx={{ color: "#808B90", fontSize: "12px", marginTop: '0px' }}>
            <Button onClick={handleClick}>
              See Details
              <ArrowRightOutlined></ArrowRightOutlined>
            </Button>
          </Typography>
        </Typography>
        <Typography variant="h5" sx={{ color: "#03293C" }}>
          {" "}
          {value}
          <Typography sx={{ fontSize: '15px', color: change > 0 ? "green" : "red", paddingLeft: '2rem' }}>
            {" "}
            {change} %
          </Typography>
        </Typography>
      </FlexBetween>
      {chart}
      <FlexBetween gap="1rem">
        <Typography variant="h4"> {icon} </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
