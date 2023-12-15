import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import './chart.css'
import formatUnit from '../../../utils/weather/formatTemp';

export default function Chart({timezone, data, unit}){

    const svgRef = useRef()
    const rightSvgRef = useRef()

   useEffect(() => {

    drawChart(rightSvgRef.current, svgRef.current, data, timezone, unit)

   }, [data, unit])

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{width:'5%'}}>
                <svg ref={rightSvgRef}></svg>
            </div>
            <div style={{width:'90%', overflow:'auto'}} className='graph'>
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
                        .attr('width', 100)
                        .attr('height', h)

    svg.selectAll('*').remove()
    rightSvg.selectAll('*').remove()

    const xScale = d3.scaleBand()
                    .domain(data.map((d,i) => i))
                    .range([0,w-25])

    const yScale = d3.scaleLinear()
                    .domain([d3.min(data, d => formatUnit(d.temp, unit, 'TEMP'))-2, d3.max(data, d => formatUnit(d.temp, unit, 'TEMP'))+2])
                    .range([h-60, 45])

    const tempAxis = d3.axisLeft(yScale)
                        .ticks(5)
                        .tickPadding(-45)
                        .tickFormat(d => d)

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
                .attr('y', h-15)
                .attr('x', (d,i) => xScale(i))
                .text(d => d.weather[0].main)
                .style('font-size', 10)
                .style('fill','grey')

    const windContainer = svg.append('g')
    windContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', h)
                .attr('x', (d,i) => xScale(i))
                .text(d => `${formatUnit(d.wind_speed, unit, 'SPEED')} ${unit==='M'?'m/s':'mph'}`)
                .style('font-size', 10)
                .style('fill','steelblue')

    const popContainer = svg.append('g')
    popContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', d => h- 35 - (d.pop*100))
                .attr('x', (d, i) => xScale(i))
                .text(d => parseInt(d.pop*100)+' %')
                .style('font-size', 10)
                .style('fill','teal')

    const popBarContainer = svg.append('g')
    popBarContainer.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('height', d => (d.pop*100))
                    .attr('width', 24)
                    .attr('x', (d,i) => xScale(i))
                    .attr('y', d => h - (d.pop*100) - 30)
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


    // const timeAxis = d3.axisBottom(xScale)
    //                 .tickFormat(d => formatDate(d.dt, timezone))
    //                 .tickSize(0)
    //                 .tickPadding(8)
                    
    // const paramAxis = d3.axisBottom(xScale)
    //                     .tickFormat(d => d.weather[0].main)
    //                     .tickSize(8)
    //                     .tickPadding(2)
    
    // const topAxis = svg.append('g')
    //                     .attr('transform', 'translate(0,'+(-1)+')')
    //                     .call(timeAxis)

    // const bottomAxis = svg.append('g')
    //                     .attr('transform', 'translate(0,' + (h-30) + ')')
    //                     .call(paramAxis)

    // topAxis.selectAll('text')
    //         .attr('fill', 'gray')
    //         .style('font-size', 12)
    
    // bottomAxis.selectAll('text').attr('fill', 'gray')
    // bottomAxis.selectAll('path').attr('stroke', '#aaa')
    // bottomAxis.selectAll('line').attr('stroke', '#aaa')