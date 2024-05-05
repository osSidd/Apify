import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import * as d3 from 'd3'
import formatDate from "../../../utils/formatDate";

export default function Legend({minutely}){
    
    const legendRef = useRef()

    useEffect(() => {
        makeChart()
    }, [minutely])

    function getPopTime(data){
        const now = data[0]
        const pop = data.filter(d => d.precipitation)
        const end = data.find((d,i) => d.precipitation && i)
        const fullHr = data.find((d,i) => !d.precipitation && i)
        
        if(!pop.length) return 'No precipitation within an hour'

        let mins = new Date(end.dt*1000) - new Date(now.dt*1000)
        let int = parseInt(mins/(60*1000))

        if(data[0].precipitation){
            if(!fullHr) return "Precipitation won't end within an hour"

            return `Precipitation will end in ${int > 1 ? int + ' mins' : int + ' min'}`
        }

        else{
            return `Precipitation will start within ${int > 1 ? int + ' mins' : int + ' min'}`
        }
    }

    function getColor(d){
        let prep = d.precipitation

        if(prep >= 140) return 'rgba(20, 20, 255, 0.9)'
        if(prep >= 10) return 'rgba(80,80, 225, 0.7)'
        if(prep >= 1) return '#00d300'
        if(Math.abs(prep - 0.5) < 0.01) return '#00fa64'
        if(Math.abs(prep - 0.2) < 0.01) return '#64fcbf'
        if(Math.abs(prep - 0.1) < 0.01) return '#b5fee1'
        return '#9b9b9b'
    }

    function makeChart(){
        const height = 50
        const width = 425
        const paddingBottom = 10
        const rightPadding = 35
        const leftPadding = 10

        const svg = d3.select(legendRef.current)
                        .attr('height', height)
                        .attr('width', width)
        
        svg.selectAll('*').remove()

        const maxRain = d3.max(minutely, d => d.precipitation)

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
                            return -5
                        return 5
                    })
                    .attr('y1', (d,i) => {
                        if(i%15 === 0)
                            return 5
                        return 0
                    })
                    .style('stroke', d => getColor(d))

       const  timeContainer = svg.append('g')
        timeContainer.selectAll('text')
                    .data(minutely)
                    .enter()
                    .append('text')
                    // .text((d,i) => {if(i%15===0 || i === minutely.length - 1) return formatDate(d.dt, true, false)})
                    .attr('x', (d,i) => xScaleMajor(d) - xScaleMajor.bandwidth())
                    .attr('y', 30)
                    .style('font-size', 10)
                    .append('tspan')
                    .text((d,i) => {if(i%15===0 || i === minutely.length - 1) return formatDate(d.dt, true, false)})
                    .attr('x', (d,i) => xScaleMajor(d) - xScaleMajor.bandwidth())
                    .attr('dy', 0)
                    .style('font-size', 10)
                    .append('tspan')
                    .text((d,i) => {if(i%15===0 || i === minutely.length - 1){if(i === 0) return 'now'; else if(i === minutely.length - 1) return '60 min'; return `${parseInt(i/15)*15} min`}})
                    .attr('x', (d,i) => xScaleMajor(d))
                    .attr('dy', -12)
                    .style('font-size', 10)
    }

    return (
        <Box position='absolute' bottom={10} left={10} bgcolor='white' width='75%' boxShadow={5} borderRadius={1} zIndex={10} sx={{cursor:'pointer'}}>
            <Typography ml={1} mt={1} fontSize={14} fontWeight={500}>{getPopTime(minutely)}</Typography>
            <svg ref={legendRef}></svg>
        </Box>
    )
}