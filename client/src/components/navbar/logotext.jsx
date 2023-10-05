import { Box, Typography } from "@mui/material";
import ApiIcon from '@mui/icons-material/Api'

export default function LogoText(){
    return (
        <Box
            display="flex"
            alignItems="center"
        >
            <ApiIcon 
                fontSize="large"
                sx={{
                    mr:2,
                    color:'#eee'
                }} 
            />
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