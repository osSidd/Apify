import './hourly.css'
import Chart from './chart'
import { Box, Typography } from '@mui/material'

function Hourly({data}){
    return (
        <Box mt={4} sx={{overflow:'hidden'}}>
            <Typography
                variant='h6'
                fontWeight={600}
            >
                Hourly forecast
            </Typography>
            <Chart data={data}/>
        </Box>
    )
}
export default Hourly