import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import * as d3 from 'd3'
import formatDate from "../../../utils/formatDate";

export default function Legend({minutely}){
    
    const legendRef = useRef()

    useEffect(() => {
        makeChart()
    }, [minutely])

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
            <Typography ml={1} mt={1} fontSize={14} fontWeight={500}>No precipitation within an hour</Typography>
            <svg ref={legendRef}></svg>
        </Box>
    )
}