import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import * as d3 from 'd3'
import formatDate from "../../../utils/formatDate";
import './legend.css'

export default function Legend({minutely, timezone}){
    
    const legendRef = useRef()

    useEffect(() => {
        makeChart()
    }, [minutely, timezone])

    function getLegend(){
        let legendColors = []
        
        const minRain = d3.min(minutely, d => d.precipitation)
        const maxRain =  d3.max(minutely, d => d.precipitation)
        const div = maxRain/4

        if (!maxRain) return [getColor(maxRain)]

        if(maxRain >= 2){
            for(let i = minRain; i <= maxRain; i+= div){
                const col = getColor(i)

                if(!legendColors.find(d => d.col === col.col)) legendColors.push(getColor(i))
            }
        }
        else{
            for(let i = 0; i <= maxRain; i+= div){
                const col = getColor(i)
                
                if(!legendColors.find(d => d.col === col.col)) legendColors.push(getColor(i))
            }
        }
        return legendColors
    }

    function getPopTime(data){
        const now = data[0] //the first data point in minutely
        const end = data.find((d,i) => !d.precipitation && i) //First data point other than initial where precipitation is zero
        const start = data.find((d,i) => d.precipitation && i) //First data point where precipitation is non zero

        if(!start) return 'No precipitation within an hour'

        if(now.precipitation){
            if(!end) return "Precipitation won't end within an hour"

            const diff = getMinutes(now.dt, end.dt)
            return `Precipitation will end within ${diff > 1 ? diff + ' mins' : diff + ' min'}`
        }
        else{
            const diff = getMinutes(now.dt, start.dt)
            return `Precipitation will start within ${diff > 1 ? diff + ' mins' : diff + ' min'}`
        }
    }

    function getMinutes(dt1, dt2){
        let mins = new Date((dt2)*1000) - new Date((dt1)*1000)
        return Math.floor(mins/(60*1000))
    }

    function getColor(prep){
        if(prep >= 140) return {mm:140, col:'rgba(20, 20, 255, 1)'}
        if(prep >= 10) return {mm:10, col:'rgba(80,80, 225, 0.9)'}
        if(prep >= 1) return {mm:1, col:'rgba(110, 110, 205, 0.8)'}
        if(prep >= 0.5) return {mm:0.5, col:'rgba(120, 120, 190, 0.7)'}
        if(prep >= 0.2) return {mm:0.2, col:'rgba(120, 120, 190, 0.6)'}
        if(prep >= 0.1) return {mm:0.1, col:'rgba(120, 120, 190, 0.5)'}
        return {mm:0, col:'#2e2532'}
    }
    
    function makeChart(){
        const height = 50
        const width = 450
        const paddingBottom = 10
        const rightPadding = 30
        const leftPadding = 25

        const svg = d3.select(legendRef.current)
                        .attr('viewBox', `0 0 ${width} ${height}`)
        
        svg.selectAll('*').remove()

        const xScaleMajor = d3.scaleBand()
                                .domain(minutely.map(d => d))
                                .range([leftPadding, width-rightPadding])

        
        const xAxis = d3.axisTop(xScaleMajor).tickFormat('')

        const bottomAxis = svg.append('g')
            .call(xAxis)
            .attr('transform', 'translate(0,' + (height - paddingBottom) + ')')
        
        bottomAxis.selectAll('path')
                    .style('display', 'none')
        bottomAxis.selectAll('line')
                    .attr('y2', (d,i) => {
                        if(i%15 === 0)
                            return -6
                        return 6
                    })
                    .attr('y1', (d,i) => {
                        if(i%15 === 0)
                            return 6
                        return 0
                    })
                    .style('stroke', d => getColor(d.precipitation)['col'])

       const  timeContainer = svg.append('g')
        timeContainer.selectAll('text')
                    .data(minutely)
                    .enter()
                    .append('text')
                    .attr('x', (d,i) => xScaleMajor(d) - xScaleMajor.bandwidth())
                    .attr('y', 30)
                    .append('tspan')
                    .text((d,i) => {if(i%15===0 || i === minutely.length - 1) return formatDate(d.dt, true, false, timezone)})
                    .attr('x', (d,i) => xScaleMajor(d) - 2*xScaleMajor.bandwidth())
                    .attr('dy', 0)
                    .attr('fill', '#232323')
                    .style('font-size', 12)
                    .append('tspan')
                    .text((d,i) => {if(i%15===0 || i === minutely.length - 1){if(i === 0) return 'now'; else if(i === minutely.length - 1) return '60 min'; return `${parseInt(i/15)*15} min`}})
                    .attr('x', (d,i) => xScaleMajor(d) - xScaleMajor.bandwidth())
                    .attr('dy', -16)
                    .attr('fill', '#555')
                    .style('font-size', 10)
}

    const legendArr = getLegend() 

    return (
        <Box position='absolute' bottom={10} left={10} bgcolor='white' width={{xs:'95%', lg:'75%'}} boxShadow={5} borderRadius={1} zIndex={10} sx={{cursor:'pointer', paddingBottom:'2px'}}>
            <Typography ml={1} mt={1} fontSize={14} fontWeight={500}>{getPopTime(minutely)}</Typography>
            <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
                <Box className="svg-container" width={{xs:'82%', sm:'85%', md:'87%'}}>
                    <svg id="legend-svg" ref={legendRef}></svg>
                </Box>
                <Box pr={1} pb={1}>
                    {
                        legendArr.map(d => (
                            <Box key={d.mm} display='flex' justifyContent='space-between' alignItems='center'>
                                <Box mr={1} width={6} height={6} bgcolor={d.col}></Box>
                                <Typography fontSize={8}>{d.mm} mm/h</Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}