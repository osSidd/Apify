import { Component } from "react";
import {Box, IconButton, Typography} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import formatDate from "../../utils/formatDate";
import formatUnit from "../../utils/weather/formatTemp";

class Daily extends Component{
    
    render(){
        const {data, unit} = this.props
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
                                mx={{xs:'auto', sm:0}}
                            >
                                <Typography
                                    fontSize={{xs:10, md:14}}
                                    sx={textColor}
                                >
                                    {formatDate(d.dt)}
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
                                    fontSize={{xs:10, md:14}}
                                    sx={textColor}
                                >
                                    {formatUnit(d.temp.max, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'} / {formatUnit(d.temp.min, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}
                                </Typography>
                                <Typography
                                    ml="auto"
                                    fontSize={{xs:10, md:14}}
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