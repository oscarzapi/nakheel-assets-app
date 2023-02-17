import { Button, Popover, Typography } from '@mui/material';
import React, { useState } from 'react'

const PopOver = ({anchorEl, setAnchorEl}) => {

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    console.log(anchorEl)
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
      </div>
    );
}

export default PopOver