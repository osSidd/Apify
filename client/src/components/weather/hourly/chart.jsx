import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import './chart.css'
import formatUnit from '../../../utils/weather/formatTemp';

export default function Chart({timezone, data, unit}){

    const svgRef = useRef()
    const rightSvgRef = useRef()

   useEffect(() => {

    drawChart(rightSvgRef.current, svgRef.current, data, timezone, unit)

   }, [data, unit, timezone])

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{width:'5%'}}>
                <svg ref={rightSvgRef}></svg>
            </div>
            <div style={{width:'92%', overflow:'auto'}} className='graph'>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    )
}

function formatDate(dt, timezone){
    return new Date(dt*1000).toLocaleString('en-IN', {hour:'numeric', timeZone:timezone})
}

function drawChart(rightSvgRef, svgRef, data, timezone, unit){
    const w = 2500
    const h = 300
    
    const svg = d3.select(svgRef)
                    .attr('width', w)
                    .attr('height', h)

    const rightSvg = d3.select(rightSvgRef)
                        .attr('width', 25)
                        .attr('height', h)

    svg.selectAll('*').remove()
    rightSvg.selectAll('*').remove()

    const xScale = d3.scaleBand()
                    .domain(data.map((d,i) => i))
                    .range([0,w-25])

    const yScale = d3.scaleLinear()
                    .domain([d3.min(data, d => formatUnit(d.temp, unit, 'TEMP'))-2, d3.max(data, d => formatUnit(d.temp, unit, 'TEMP'))+2])
                    .range([h-60, 25])

    const popScale = d3.scaleLinear()
                        .domain([0, 1])
                        .range([h-60, 40])

    
    const tempAxis = d3.axisLeft(yScale)
                        .ticks(5)
                        .tickPadding(-40)
                        .tickFormat(d => `${d}°`)

    const leftAxis = rightSvg.append('g')
                        .attr('transform', 'translate(-15,0)')
                        .call(tempAxis)

    leftAxis.selectAll('text')
            .attr('fill', '#eb6e4b')

    const timeContainer = svg.append('g')
    timeContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', 15)
                .attr('x', (d,i) => xScale(i))
                .text(d => formatDate(d.dt, timezone))
                .style('font-size', 10)
                .style('fill','gray')

    const descriptionContainer = svg.append('g')
    descriptionContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', h-20)
                .attr('x', (d,i) => xScale(i))
                .append('tspan')
                .attr('x', (d, i) => xScale(i))
                .attr('dy', -12)
                .text(d => d.weather[0].description.split(' ')[0])
                .style('font-size', 10)
                .style('fill','grey')
                .append('tspan')
                .attr('x', (d, i) => xScale(i))
                .attr('dy', 12)
                .text(d => d.weather[0].description.split(' ')[1])
                .style('font-size', 10)
                .style('fill','grey')
    
    const windContainer = svg.append('g')
    windContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', h - 5)
                .attr('x', (d,i) => xScale(i))
                .text(d => `${formatUnit(d.wind_speed, unit, 'SPEED')} ${unit==='M'?'m/s':'mph'}`)
                .style('font-size', 10)
                .style('fill','steelblue')

    const popContainer = svg.append('g')
    popContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', d => popScale(d.pop))
                .attr('x', (d, i) => xScale(i))
                .text(d => parseInt(d.pop*100)+' %')
                .style('font-size', 10)
                .style('fill','teal')

    const popBarContainer = svg.append('g')
    popBarContainer.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('height', d => h - 60 - popScale(d.pop))
                    .attr('width', 24)
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => popScale(d.pop) + 10)
                    .attr('rx', 5)
                    .attr('fill', 'teal')
                    .style('opacity', '0.25')

    const line = d3.line()
                    .x((d, i) => xScale(i))
                    .y(d => yScale(formatUnit(d.temp, unit, 'TEMP')))
                    .curve(d3.curveBasis)
    
    const tempCurve = svg.append('path')
                            .datum(data)
                            .attr('d', line)
                            .attr('fill', 'none')
                            .attr('stroke', '#eb6e4b')
                            .attr('stroke-width', 2)
}
