import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import LineChart from "./LineChart";

const StatBox = ({ title, value, increase, icon, description }) => {
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
      backgroundColor='#F5F1E8'
      borderRadius="0.55rem"
      height='500px'
      color="#03293C"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: "#03293C" }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
      <LineChart></LineChart>
      <FlexBetween gap="1rem">
      {icon}
      <Typography variant="h6">Overall: {increase}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;