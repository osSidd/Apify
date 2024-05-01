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
                mr={{xs:1, md:2}}
                width={{xs:24, md:40}}
                height={{xs:24, md: 40}}
            />
            {/* <ApiIcon 
                fontSize="large"
                sx={{
                    mr:2,
                    color:'#eee'
                }} 
            /> */}
            <Typography
                fontSize={{xs:24, md: 40}}
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