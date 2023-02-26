import { Box } from '@mui/material';
import React from 'react';  
import Tableau from "tableau-react";

const SelfService = () => { 
    const options = {
        hideTabs: true,
        hideToolbar: true
      };
    const vizUrl = "https://mallsdata.nakheel.com/t/SelfService/views/NakheelManagement/AgedDebt/2dfa7c26-d637-4446-a886-bf569fa0a8c5/c05dcf01-3834-490f-97c3-47c1168bcf13?:display_count=n&:showVizHome=n&:origin=viz_share_link";
    
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