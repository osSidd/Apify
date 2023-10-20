import { Component } from "react"
import {Box, Container, Grid, Typography} from '@mui/material'
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';
import DeviceThermostatSharpIcon from '@mui/icons-material/DeviceThermostatSharp';

class CurrentWeather extends Component{

    getTemp(temp, unit='C'){
        return unit === 'C' ? (temp - 272.15).toFixed(1) : (temp - 457.87).toFixed(1)
    }

    getDirection(deg){
        return {
            rotate: `${deg}deg`
        }
    }

    getDate(date){
        return new Date(date*1000).toLocaleString()
    }
    
    render(){


        const d = this.props.current
        const prop = {fontSize: 14}
       
        return(   
            <Box>
                <Typography
                    fontSize={14}
                    color="error"
                    mb={0.5}
                >
                    {
                       this.getDate(d.dt)
                    }    
                </Typography>                
                
                <Typography
                    variant="h5"
                    fontWeight={600}
                    mb={2}
                >
                    London, GB
                </Typography>

                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Box
                        component="img"
                        alt="icon"
                        src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                        sx={{
                            width: 70,
                            marginRight: 2,
                        }}
                    >
                    </Box>
                    <Typography
                        variant="h4"
                    >
                        {this.getTemp(d.temp, 'C')} &deg;C
                    </Typography>
                </Box>
                
                <Box
                    display="flex"
                    mb={1}
                >
                    <Typography
                        fontWeight={500}
                        sx={{
                            "&::after":{
                                content: '" | "',
                            }
                        }}
                    >
                        Feels like {this.getTemp(d.feels_like, 'C')} &deg;C
                    </Typography>
                    <Typography
                        fontWeight={500}
                    >
                        &nbsp;{d.weather[0].description}
                    </Typography>
                </Box>
                
                <Grid container rowGap={0.25} sx={{borderLeft:'1px solid crimson', pl:2, width:'75%'}}>
                    <Grid md={6} item display="flex" alignItems="center">
                        <NearMeSharpIcon
                            sx={{
                                fontSize:16,
                                mr: 1
                            }}
                        />
                        <Typography sx={prop}>
                            {d.wind_speed} m/s
                        </Typography>
                    </Grid>
                    <Grid item md={6} display="flex" alignItems="center">
                        <DeviceThermostatSharpIcon
                            sx={{
                                fontSize:16,
                                mr:1
                            }}
                        />
                        <Typography sx={prop}>
                            {d.pressure} hPa
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography sx={prop}>
                            Humidity: {d.humidity}%
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography sx={prop}>
                            Dew point: {this.getTemp(d.dew_point)} <span>&deg;</span>C
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography sx={prop}>
                            Visibility: {d.visibility/1000} km
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography sx={prop}>
                            UV: {d.uvi}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default CurrentWeather