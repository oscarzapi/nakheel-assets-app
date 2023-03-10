import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesData, setDateMode, setLoading } from "state";
import { useLazyGetSalesDataQuery } from "state/api";
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
  const userEmail = useSelector((state) => state.global.userEmail);
  const filter = useSelector((state) => state.global.filter);
  const [trigger, {data,isFetching }] = useLazyGetSalesDataQuery();
  const [dateFilter, setDateFilter] = useState("day");
  const handleChange = (event, newFilter) => {
    if(!newFilter) alert('Please select a date filter')
    newFilter && setDateFilter(newFilter);
    newFilter && dispatch(setDateMode(newFilter));
    newFilter && trigger({ userEmail, dateMode: newFilter, filter })
  };

  useEffect(() => {
    dispatch(setLoading(isFetching))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching])
  useEffect(() => {
    data && dispatch(getSalesData(data));
      data &&  
        window.localStorage.setItem(
          "USER_SALESDATA",
          JSON.stringify(data)
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <StyledToggleButtonGroup
        value={dateFilter}
        exclusive
        onChange={handleChange}
        
        //onClick={() => dispatch(setDateMode(dateMode))}
      >
        <ToggleButton value="day">daily</ToggleButton>
        <ToggleButton value="week">weekly</ToggleButton>
        <ToggleButton value="month">monthly</ToggleButton>
        <ToggleButton value="year">yearly</ToggleButton>
      </StyledToggleButtonGroup>
    </>
  );
};

export default DateFilters;
