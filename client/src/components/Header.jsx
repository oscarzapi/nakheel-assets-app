const { Typography , Box} = require("@mui/material")


const Header = ({title}) => {
    return (
        <Box>
            <Typography
            variant="h5"
            color="#03293C"
            fontWeight="bold"
            sx={{ mb: "5px" }}>
{title}
            </Typography>
        </Box>
    )
}

export default Header