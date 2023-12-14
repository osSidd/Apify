import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export default function Chart({timezone, data}){

    console.log(data, timezone)
    console.log(new Date(data[0].dt*1000).toLocaleString('en-IN', {timeZone: timezone}))

    const svgRef = useRef()

   useEffect(() => {

    drawChart(svgRef.current, data, timezone)

   }, [data])

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}

function formatDate(dt, timezone){
    return new Date(dt*1000).toLocaleString('en-IN', {hour:'numeric', timeZone:timezone})
}

function drawChart(svgRef, data, timezone){
    const w = 2500
    const h = 320

    const xScale = d3.scalePoint()
                    .domain(data.map(d => d))
                    .range([75,w-25])

    const yScale = d3.scaleLinear()
                    .domain([d3.min(data, d => d.temp), d3.max(data, d => d.temp)])
                    .range([h-25, 25])

    const svg = d3.select(svgRef)
                    .attr('width', w)
                    .attr('height', h)

    const timeAxis = d3.axisBottom(xScale)
                    .tickFormat(d => formatDate(d.dt, timezone))
                    .tickSize(0)
                    .tickPadding(8)
                    
    const paramAxis = d3.axisBottom(xScale)
                        .tickFormat(d => d.weather[0].main)
                        .tickSize(8)
                        .tickPadding(2)

    const tempAxis = d3.axisLeft(yScale)
                        .ticks(5)
                        .tickPadding(-45)

    const topAxis = svg.append('g')
                        .attr('transform', 'translate(0,'+(-1)+')')
                        .call(timeAxis)

    const bottomAxis = svg.append('g')
                        .attr('transform', 'translate(0,' + (h-30) + ')')
                        .call(paramAxis)

    topAxis.selectAll('text')
            .attr('fill', 'gray')
            .style('font-size', 12)
    
    bottomAxis.selectAll('text').attr('fill', 'gray')
    bottomAxis.selectAll('path').attr('stroke', '#aaa')
    bottomAxis.selectAll('line').attr('stroke', '#aaa')

    const leftAxis = svg.append('g')
                        .attr('transform', 'translate(-1,0)')
                        .call(tempAxis)


    const windContainer = svg.append('g')

    windContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', h)
                .attr('x', d => xScale(d)-20)
                .text(d => d.wind_speed+' m/s')
                .style('font-size', 10)
                .style('fill','steelblue')

    const popContainer = svg.append('g')

    popContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', h-40)
                .attr('x', d => xScale(d)-10)
                .text(d => d.wind_speed+' %')
                .style('font-size', 10)
                .style('fill','teal')

    const line = d3.line()
                    .x(d => {console.log(d); return xScale(d.dt)})
                    .y(d => yScale(d.temp))
                    .curve(d3.curveBasis)

    svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'crimson')
        .attr('stroke-width', 2)
}