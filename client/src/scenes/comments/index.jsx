import { Box, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from 'components/Header'
import { DataGrid, useGridApiContext, GridEventListener, GridToolbar  } from '@mui/x-data-grid'
import { useGetSqlRequestsQuery } from 'state/api'
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


const Comments = () => {
    const theme = useTheme()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')

 const handleCellClick = ({params}) => {
  console.log('you clicked on the cell')
  //setTcode(params.row.tcode)
} 

    const {data, isLoading} = useGetSqlRequestsQuery({
      page, pageSize, tcode:search
    })
  return (
    <Box m='1.5rem 1.5rem'>
        <Header title="ADD COMMENTS TO TENANTS" subtitle="See your list of tenants"></Header>
        <Box
        mt='40px'
        height='80vh'
        width='80vh'
        sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[50],
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.secondary[600],
              color: theme.palette.secondary[50],
              border:'none',
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.secondary[600],
              color: theme.palette.secondary[50],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: 'cornsilk !important'
            }
          }}
        >
              { data && !isLoading ? (<DataGrid 
            columns={data.columns}
            rows={data.data}
            getRowId={row => row._id}
            loading={isLoading || !data}
            onCellClick={(params, event) => {handleCellClick({params, event})}}
            rowsPerPageOptions={[20,50,100]}
            rowCount={(data &&data.data.length)||0}
            pagination
            components={{ Toolbar: DataGridCustomToolbar  }}
            page={page}
            pageSize={pageSize}
            //paginationMode='server'
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        componentsProps={{
          toolbar: { searchInput, setSearchInput, setSearch },
        }}
            ></DataGrid>  ) : (<>Loading...</>)}
        </Box>
    </Box>
  )
}

export default Comments