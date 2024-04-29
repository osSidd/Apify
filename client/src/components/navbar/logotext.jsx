import { Box, Typography } from "@mui/material";
import logo from '../../assets/siteIcon.svg'

export default function LogoText({logoSize=40, textSize=40}){
    return (
        <Box
            display="flex"
            alignItems="center"
        >
            <Box
                component="img"
                src={logo}
                mr={2}
                width={logoSize}
                height={logoSize}
            />
            {/* <ApiIcon 
                fontSize="large"
                sx={{
                    mr:2,
                    color:'#eee'
                }} 
            /> */}
            <Typography
                fontSize={textSize}
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