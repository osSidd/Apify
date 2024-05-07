import { Box, Grid, IconButton, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import formatUnit from "../../../utils/weather/formatTemp";
import formatDate from "../../../utils/formatDate";
import DeviceThermostatSharpIcon from "@mui/icons-material/DeviceThermostatSharp";
import { useEffect, useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import getDirection from '../../../utils/weather/windDirection'

export default function Details({hideDetails, showDetails, unit, data, daily, timezone}){

    const prop = {
        fontSize: {xs:12, lg:14},
        color:'#232323'
    }

    const rainAmt = data?.rain ?? undefined

    const [translateIndex, setTranslateIndex] = useState(0)

    useEffect(() => {
        daily.forEach((d, index) => {
            if(d.dt === data.dt) setTranslateIndex(prev => {

                if(index > 4) return 4

                if(index === 4 && prev >= 4){
                    return 3
                }

                if(index < 4 && prev >= index && index > 0){
                    return index - 1
                }

                else return index
            })
        })
    }, [data, daily])

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' bgcolor='#f2f2f2' borderRadius={2} pl={0.5} overflow='hidden'>
                <Box width='90%'>
                    <Box display='flex' alignItems='center' sx={{transition: 'transform 0.5s ease-in-out', transform: `translateX(${-5.75*translateIndex}rem)`}}>
                        {
                            daily.map(d => (
                                <Box key={d.dt} flexShrink={0} m={1} onClick={() => {showDetails(d)}} sx={{cursor:'pointer',}}>
                                    <Typography fontSize={{xs:12, lg:14}} fontWeight={data.dt === d.dt ? 600 : 400}>{formatDate(d.dt, false, true, timezone)}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Box width='7.5%' onClick={hideDetails} bgcolor='#f2f2f2' display='flex' alignItems='center' justifyContent='center' zIndex={10}>
                    <IconButton>
                        <ArrowDropUpIcon/>
                    </IconButton>
                </Box>
            </Box>
            <Box mt={3}>
                <Box display='flex' alignItems='center'>
                    <Box
                        component='img'
                        width={50}
                        mr={2}
                        alt="icon"
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    />
                    <Box>
                        <Typography fontWeight={500}>{data.weather[0].description}</Typography>
                        <Typography sx={prop}>The high will be {formatUnit(data.temp.max, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}, the low will be {formatUnit(data.temp.min, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}.</Typography>
                    </Box>
                </Box>
                <Box mt={2} pl={2} display='flex' alignItems='center' flexWrap='wrap' rowGap={1} columnGap={2}>
                    <Box display='flex' alignItems='center'>
                        <WaterDropIcon fontSize="12"sx={{color:'#555'}}/>
                        <Typography ml={1} sx={prop}>{rainAmt ? rainAmt + ' mm' : null} ({parseInt(data.pop*100)}%)</Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <NavigationIcon
                            sx={{
                                fontSize:16,
                                color:'#444',
                                mr: 1,
                                transform: `rotate(${180 + data.wind_deg}deg)`
                            }}
                        />
                        <Typography sx={prop}>
                            {formatUnit(data.wind_speed, unit, 'SPEED')} {unit==='M'?'m/s':'mph'} {getDirection(data.wind_deg)}
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems='center'>
                        <DeviceThermostatSharpIcon
                            sx={{
                                fontSize:16,
                                mr:1,
                                color:'#444'
                            }}
                        />
                        <Typography sx={prop}>
                            {formatUnit(data.pressure, unit, 'PRESSURE')} {unit==='M'?'hPa':'psi'}
                        </Typography>
                    </Box>
                    <Typography sx={prop}>
                        Humidity: {data.humidity}%
                    </Typography>
                    <Typography sx={prop}>
                        UV: {data.uvi}
                    </Typography>
                    <Typography sx={prop}>
                        Dew point: {formatUnit(data.dew_point, unit, 'TEMP')} <span>&deg;</span>{unit==='M'?'C':'F'}
                    </Typography>
                </Box>
            </Box>
            <Box mt={2}>
                <Grid rowGap={1} container>
                    <Grid item xs={4}></Grid>
                    <Grid sx={{...prop, fontSize:{xs:12, sm:10, lg:14}}} item xs={2}>Morning</Grid>
                    <Grid sx={{...prop, fontSize:{xs:12, sm:10, lg:14}}} item xs={2}>Afternoon</Grid>
                    <Grid sx={{...prop, fontSize:{xs:12, sm:10, lg:14}}} item xs={2}>Evening</Grid>
                    <Grid sx={{...prop, fontSize:{xs:12, sm:10, lg:14}}} item xs={2}>Night</Grid>
                    <Grid sx={{...prop, textTransform:'uppercase', fontSize:{xs:10, lg:12}, color:'gray'}} item xs={4}>temperature</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.temp.morn, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.temp.day, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.temp.eve, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.temp.night, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={{...prop, textTransform:'uppercase', fontSize:{xs:10, lg:12}, color:'gray'}} item xs={4}>feels like</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.feels_like.morn, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.feels_like.day, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.feels_like.eve, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                    <Grid sx={prop} item xs={2}>{formatUnit(data.feels_like.night, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}</Grid>
                </Grid>
            </Box>
            <Box mt={4} display='flex' alignItems='center'>
                <Box mr={2}>
                    <Typography textAlign='center' textTransform='uppercase' fontSize={10} color='gray'>sunrise</Typography>
                    <Typography fontSize={14}>{formatDate(data.sunrise, true, false, timezone)}</Typography>
                </Box>
                <Box>
                    <Typography textAlign='center' textTransform='uppercase' fontSize={10} color='gray'>sunset</Typography>
                    <Typography fontSize={14}>{formatDate(data.sunset, true, false, timezone)}</Typography>
                </Box>

            </Box>
        </Box>
    )
}