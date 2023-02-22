import { Box } from '@mui/material';
import React, { Component } from 'react';  
import Tableau from "tableau-react";

const SelfService = () => { 
    const options = {
        hideTabs: true,
        hideToolbar: true
      };
    const vizUrl = "https://mallsdata.nakheel.com/t/SelfService/views/TheViewSalesReport/Overview?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
    
    return (  
        <Box>
            <Tableau
        url={vizUrl}
        options={options}
      />
            
        </Box>
        )  
  
}  


export default SelfService;