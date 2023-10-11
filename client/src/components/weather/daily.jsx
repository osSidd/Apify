import { Component } from "react";
import {Box, IconButton, Typography} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

class Daily extends Component{

    render(){

        const data = this.props.data
        const textColor = {
            color: '#444'
        }

        return (
            <Box>
                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    8-day forecast
                </Typography>
                {
                    data.map(d => {
                        return(
                            <Box
                                key = {data.indexOf(d)}
                                display="flex"
                                alignItems="center"
                                mt={0}
                                mb={-1.25}
                                pl={3}
                            >
                                <Typography
                                    fontSize={14}
                                    sx={textColor}
                                >
                                    {new Date(d.dt*1000).toLocaleDateString()}
                                </Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        width:50
                                    }}
                                    ml={5}
                                    mr={2}
                                    src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} 
                                    alt="icon" 
                                />
                                <Typography
                                    fontSize={14}
                                    sx={textColor}
                                >
                                    {parseInt(d.temp.max - 272.15)}&deg;C / {parseInt(d.temp.min - 272.15)}&deg;C
                                </Typography>
                                <Typography
                                    ml="auto"
                                    fontSize={12}
                                    sx={{
                                        color: '#777'
                                    }}
                                >
                                    {d.weather[0].description}
                                </Typography>
                                <IconButton>
                                    <ArrowDropDownIcon/>
                                </IconButton>
                            </Box>
                        )
                    })
                } 
            </Box>
        )
    }
}

export default Daily