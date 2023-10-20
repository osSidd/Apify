import './hourly.css'
import Chart from './chart'
import { Box, Typography } from '@mui/material'

function Hourly({data}){
    return (
        <Box sx={{overflow:'auto', mr: 2}}>
            <Typography
                variant='h6'
                fontWeight={600}
                mb={2}
            >
                Hourly forecast
            </Typography>
            <Chart data={data}/>
        </Box>
    )
}
export default Hourly