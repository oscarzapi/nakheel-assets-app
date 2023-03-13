import React from "react";
import { Box, Button, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { ArrowRightOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const StatBox = ({ title, value, change, chart, icon }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    const lcText = title.toLowerCase().replace(/ /g, "_").concat("_details");
    navigate(`/${lcText}`);
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
        <Box>
          {" "}
          <Typography
            variant="h5"
            sx={{ color: "#03293C", marginBottom: "0px" }}
          >
            {icon}{title}
            <Typography
              sx={{ color: "#808B90", fontSize: "12px", marginTop: "0px" }}
            >
              <Button onClick={handleClick}>
                {pathname === "/overall" ? (
                  <>
                    See Details <ArrowRightOutlined></ArrowRightOutlined>
                  </>
                ) : (
                  ""
                )}
              </Button>
            </Typography>
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ color: "#03293C" }}>
          {" "}
          {value}
          <Typography
            sx={{
              fontSize: "15px",
              color: change > 0 ? "green" : "red",
              paddingLeft: "2rem",
            }}
          >
            {" "}
            {change} %
          </Typography>
        </Typography>
      </FlexBetween>
      {chart}
    </Box>
  );
};

export default StatBox;
