import { Box, Typography } from "@mui/material";
import { Component } from "react";

class ErrorPage extends Component{
    render(){
        return (
            <Box minHeight='75vh' display='flex' alignItems='center' justifyContent='center'>
                <Typography fontSize={24}>404 | not found</Typography>
            </Box>
        )
    }
}

export default ErrorPage