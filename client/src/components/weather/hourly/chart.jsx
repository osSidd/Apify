import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export default function Chart({data}){

    const DataArr = data.map(item => [data.indexOf(item), (parseInt(item.temp))])
    
    console.log(data)

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
    const w = 1224
    const h = 300
    
    const xScale = d3.scaleBand()
                    .domain(data.map(item => item[0]))
                    .range([25,w])
                    .padding(1)
            

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

    let line = d3.line()
                .x(d => xScale(d[0]))
                .y(d => yScale(d[1]))
                .curve(d3.curveBasis)

    svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 2)

    // svg.selectAll('text')
    //     .data(data)
    //     .enter()
    //     .append('text')
    //     .attr('x', 25)
    //     .attr('y', d => yScale(d[1]))  
    //     .text(d => d[0])  

}