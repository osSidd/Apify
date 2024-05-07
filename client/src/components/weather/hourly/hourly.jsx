import './hourly.css'
import Chart from './chart'
import { Box, Typography } from '@mui/material'

function Hourly({timezone, data, unit}){
    console.log('hourly component updated')
    return (
        <Box>
            <Typography
                variant='h6'
                fontWeight={600}
                mb={2}
                color='#232323'
            >
                Hourly forecast
            </Typography>
            <Box>
                <Chart timezone={timezone} unit={unit} data={data}/>
            </Box>
        </Box>
    )
}
export default Hourly