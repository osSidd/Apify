import { Box, Typography } from "@mui/material";
import logo from '../../assets/siteIcon.svg'
import {Link} from 'react-router-dom'

export default function LogoText({logoSize=40, textSize=40}){
    return (
        <Link style={{textDecoration:'none'}} to='/'>
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
        </Link>
    )
}