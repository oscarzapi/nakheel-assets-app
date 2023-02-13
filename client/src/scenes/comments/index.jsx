import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useGetSqlRequestsQuery } from 'state/api'

const Comments = () => {
    const theme = useTheme()
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState('')

    const [searchInput, setSearchInput] = useState('')

    const [data, isLoading] = useGetSqlRequestsQuery()
    //console.log(data)
  return (
    <Box m='1.5rem 1.5rem'>
        <Header title="ADD COMMENTS TO TENANTS" subtitle="See your list of tenants"></Header>
        <Box
        mt='40px'
        height='75vh'
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
              color: `${theme.palette.secondary[200]} !important`
            }
          }}
        >
             {/* <DataGrid 
            columns={columns}
            
            ></DataGrid>  */}

        </Box>
    </Box>
  )
}

export default Comments