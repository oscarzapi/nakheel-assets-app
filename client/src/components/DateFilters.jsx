import {  ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react'
const { styled } = require("@mui/system");

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      border: 0,
    },
    '& .MuiToggleButton' :{
        color:"#F5F1E8",
        backgroundColor: "#F5F1E8"
    }
  }));

const DateFilters = () => {
    const [active, setActive] = useState('weekly')
    const handleChange = (event, newFilter) => {
        setActive(newFilter);
      };

    return (
    <>
    <StyledToggleButtonGroup
  value={active}
  exclusive
  onChange={handleChange}
>
  <ToggleButton value="daily">daily</ToggleButton>
  <ToggleButton value="weekly">weekly</ToggleButton>
  <ToggleButton value="monthly">monthly</ToggleButton>
  <ToggleButton value="yearly">yearly</ToggleButton>
</StyledToggleButtonGroup>
</>
  )
}

export default DateFilters