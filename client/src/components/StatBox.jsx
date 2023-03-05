import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, change, chart, icon}) => {
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
        <Typography variant="h5" sx={{ color: "#03293C" }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{color: change > 0 ? 'green':'red'}}> {value}</Typography>
      </FlexBetween>
      {chart}
      <FlexBetween gap="1rem">
      <Typography variant="h4"> {icon} </Typography>
        <Typography variant="h4" sx={{color: change > 0 ? 'green':'red'}}> {change}%</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
