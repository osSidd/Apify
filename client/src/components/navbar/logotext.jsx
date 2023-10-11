import { Box, Typography } from "@mui/material";
import logo from '../../assets/siteIcon.svg'

export default function LogoText(){
    return (
        <Box
            display="flex"
            alignItems="center"
        >
            <Box
                component="img"
                src={logo}
                mr={2}
                width={40}
                height={40}
            />
            {/* <ApiIcon 
                fontSize="large"
                sx={{
                    mr:2,
                    color:'#eee'
                }} 
            /> */}
            <Typography
                variant="h4"
                fontWeight={900}
                noWrap
                sx={{color: '#eee'}}
                letterSpacing='0.15rem'
            >
                APIfy
            </Typography>
        </Box>
    )
}