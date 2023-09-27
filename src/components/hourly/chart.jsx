import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export default function Chart({data}){

    const DataArr = data.map(item => [new Date(item.dt*1000).getHours(), (parseInt(item.humidity))])

    const svgRef = useRef()

   useEffect(() => {

    drawChart(svgRef.current, DataArr)

   }, [svgRef])

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}

function drawChart(svgRef, data){
    const w = 475
    const h = 300
    console.log(data)
    const xScale = d3.scaleBand()
                    .domain(data.map(d => d[0]))
                    .range([25, 550])

    const yScale = d3.scaleLinear()
                        .domain([d3.min(data, d => parseInt(d[1])) - 5, d3.max(data, d => parseInt(d[1])) + 5])
                        .range([h-20, 5])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const svg = d3.select(svgRef)
                    .attr('width', w)
                    .attr('height', h)

    svg.append('g')
        .attr('transform', 'translate(0,'+(h-20)+')')
        .call(xAxis)

    svg.append('g')
        .attr('transform', 'translate(25,0)')
        .call(yAxis)

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 2)
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(parseInt(d[1])))
        .attr('fill', 'black')

}