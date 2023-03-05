import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateMode } from "state";
const { styled } = require("@mui/system");

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
  },
  "& .MuiToggleButton": {
    color: "#F5F1E8",
    backgroundColor: "#F5F1E8",
  },
}));

const DateFilters = () => {
  const dispatch = useDispatch();
   const dateModeGlobal = useSelector((state) => state.global.dateMode);
   const userEmail = useSelector((state) => state.global.userEmail)


  const [dateFilter, setDateFilter] = useState("daily");
  const handleChange = (event, newFilter) => {
    setDateFilter(newFilter);
    dispatch(setDateMode(newFilter))
    console.log(dateModeGlobal, userEmail)
  };

  /* useEffect(() => {
    console.log('dateModeGlobal', dateModeGlobal)
  }, [dateModeGlobal]) */

  return (
    <>
      <StyledToggleButtonGroup
        value={dateFilter}
        exclusive
        onChange={handleChange}
        //onClick={() => dispatch(setDateMode(dateMode))}
      >
        <ToggleButton value="daily">daily</ToggleButton>
        <ToggleButton value="weekly">weekly</ToggleButton>
        <ToggleButton value="monthly">monthly</ToggleButton>
        <ToggleButton value="yearly">yearly</ToggleButton>
      </StyledToggleButtonGroup>
    </>
  );
};

export default DateFilters;
