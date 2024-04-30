import {Box, Grid, IconButton, Typography} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import formatDate from "../../../utils/formatDate";
import formatUnit from "../../../utils/weather/formatTemp";

export default function Table({data, unit, showDetails}){

    const textColor = {
        color: '#444'
    }

    return (
        <Box pl={0.5}>
                    {
                        data.map(d => {
                            return(
                                <Grid 
                                    container 
                                    alignItems='center' 
                                    key = {d.dt}
                                    px={0.5}
                                    sx={{cursor:'pointer', '&:hover':{bgcolor:'#f2f2f2'}, borderRadius:2}}
                                    onClick={() => {showDetails(d)}}
                                >
                                    <Grid item xs={3} sx={{my:'-5px'}}>
                                        <Typography
                                            fontSize={{xs:10, md:14}}
                                            sx={textColor}
                                        >
                                            {formatDate(d.dt)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{my:'-5px'}}>
                                        <Box
                                            component="img"
                                            sx={{width:50}}
                                            src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} 
                                            alt="icon" 
                                        />
                                    </Grid>
                                    <Grid sx={{my:'-5px'}} item xs={3}>
                                        <Typography
                                            fontSize={{xs:10, md:14}}
                                            sx={textColor}
                                        >
                                            {formatUnit(d.temp.max, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'} / {formatUnit(d.temp.min, unit, 'TEMP')}&deg;{unit==='M'?'C':'F'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{my:'-5px'}} display='flex' alignItems='center'>
                                        <Typography
                                            fontSize={{xs:10, md:12}}
                                            ml='auto'
                                            sx={{
                                                color: '#777'
                                            }}
                                        >
                                            {d.weather[0].description}
                                        </Typography>
                                        <IconButton>
                                            <ArrowDropDownIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })
                    } 
                </Box>
    )
}