const { useTheme, Typography , Box} = require("@mui/material")


const Header = ({title, subtitle}) => {
    const theme = useTheme()
    return (
        <Box>
            <Typography
            variant="h5"
            color={theme.palette.primary[50]}
            fontWeight="bold"
            sx={{ mb: "5px" }}>
{title}
            </Typography>
            <Typography variant="h7" color={theme.palette.primary[50]}>
        {subtitle}
      </Typography>
        </Box>
    )
}

export default Header