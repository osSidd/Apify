import {Box, Typography} from '@mui/material'
import { useEffect, useState } from 'react'

export default function Aqi({lat, lon, setAqi}){

    const [endTime, setEndTime] = useState(1606747870)

    async function fetchCurrentData(){
        const start = 1606488670

        const current = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=en`
        
        const forecast = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        
        const historical = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${endTime}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

        try{
            const res = await fetch(current,{mode:'cors'})

            if(res.ok){
                const data = await res.json()
                console.log(data)
                setEndTime(data.list[0].dt)
                setAqi(data.list[0].main.aqi)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCurrentData()
    }, [lat, lon])

    console.log(endTime)

    return (
        <Box>
        </Box>
    )
}