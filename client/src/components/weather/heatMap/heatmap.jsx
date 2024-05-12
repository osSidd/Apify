import { createPortal } from 'react-dom'
import { Component, createRef } from "react";
import './heatmap.css'
import { Box, Button, IconButton, Typography } from "@mui/material";

// import {services} from '@tomtom-international/web-sdk-services'
import Legend from "./legend";
import legendColors from '../../../data/weather/mapLegend'

import CloseIcon from '@mui/icons-material/Close';
import Map from './map';

class HeatMap extends Component{

    constructor(props){
        super(props)

        this.state = {
            layer: 'precipitation_new',
            displayWeatherMap: false,
            city: this.props.city,
            center: [this.props.lon, this.props.lat],
            zoom: 6
        }
        
        this.showWeatherMap = this.showWeatherMap.bind(this)
        this.hideWeatherMap = this.hideWeatherMap.bind(this)
        this.selectLayer = this.selectLayer.bind(this)
        this.toggleZoom = this.toggleZoom.bind(this)
    }  
    
    static getDerivedStateFromProps(props, state){
        const condition = props.city === state.city

        if(condition) return null
        return {...state, center: [props.lon, props.lat], city: props.city}
    }

    showWeatherMap(){
        this.setState({
            ...this.state,
            displayWeatherMap: true
        })
        document.body.style.overflow = 'hidden'
    }

    hideWeatherMap(){
        this.setState({
            ...this.state,
            layer: 'precipitation_new',
            displayWeatherMap: false
        })
        document.body.style.overflow = 'auto'
    }

    selectLayer(layer){
        this.setState({
            ...this.state,
            layer,
        })
    }

    toggleZoom(id){
        switch(id){
            case 'inc':
                this.setState(prev => ({...prev, zoom: prev.zoom < 12 ? prev.zoom + 1 : 12}))
                return
            case 'dec':
                this.setState(prev => ({...prev, zoom: prev.zoom > 0 ? prev.zoom - 1 : 0}))
                return
        }
    }

    render(){
       return(
        <div style={{width:'100%', height:'100%', zIndex:1, position:'relative'}}>
            <Map 
                handleClick={this.showWeatherMap}
                id='heatmap'
                center={this.state.center}
                city={this.state.city}
                layer='precipitation_new'
                zoom={6}
            />
            {this.props.minutely ? <Legend minutely={this.props.minutely} timezone={this.props.timezone}/> : null}
            {
                createPortal(
                    <div id='weather-map-container' style={{visibility: this.state.displayWeatherMap ? 'visible': 'hidden'}}>
                        <IconButton onClick={this.hideWeatherMap} sx={{position:'fixed', zIndex:50, top:5, right:5, bgcolor:'white', '&:hover':{bgcolor:'white'}}} >
                            <CloseIcon/>
                        </IconButton>
                        <Box width='90%' height='90%'>
                            <Map 
                                id='interactive-map' 
                                handleClick={undefined}
                                center={this.state.center}
                                city={this.state.city}
                                layer={this.state.layer}
                                zoom={this.state.zoom}
                            >
                                <Layers fn={this.selectLayer} layer={this.state.layer}/>
                                <InteractiveMapLegend layer={this.state.layer}/>
                                <ZoomBtn handleClick={this.toggleZoom} zoom={this.state.zoom}/>
                            </Map>
                        </Box>
                    </div>
                    , document.getElementById('weather-map')
                )   
             }
        </div>
       )
    }
}

export default HeatMap

function InteractiveMapLegend({layer}){
    let gradientStr = ''

    const legendColor = legendColors[layer] 

    legendColor.values.forEach((v,i,arr) => {
        gradientStr += `${v.col} ${i !== arr.length -1 ? ',' : ''}`
    })

    return (
        <Box display='flex' alignItems='center' justifyContent='space-between' bottom={10} right={{xs:0, md:10}} zIndex={50} py={0.5} px={1} boxShadow={5} borderRadius={1} bgcolor='white' width={325} position='absolute'>
            <Typography fontSize={10}>{legendColor.layer}</Typography>
            <Box width='75%'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    {
                        legendColor.values.map(v => (
                            <Typography fontSize={10} key={v.val}>{v.val}</Typography>
                        ))
                    }
                </Box>
                <Box sx={{backgroundImage:`linear-gradient(90deg, ${gradientStr})`}} width='100%' height={5}></Box>
            </Box>
        </Box>
    )
}

function Layers({fn, layer}){
    const style = {fontSize: 14, px:2, py:1, cursor:'pointer', '&:hover':{bgcolor:'#f2f2f2'}}
    return (
        <Box position='fixed' bgcolor='white' pt={2} pb={2} boxShadow={5} borderRadius={2} zIndex={30} top={75} right={10}>
            <Typography sx={{...style, bgcolor: layer === 'precipitation_new' ? '#f2f2f2' : 'white'}} onClick={() => {fn('precipitation_new')}}>Global Precipitation</Typography>
            <Typography sx={{...style, bgcolor: layer === 'pressure_new' ? '#f2f2f2' : 'white'}} onClick={() => {fn('pressure_new')}}>Pressure</Typography>
            <Typography sx={{...style, bgcolor: layer === 'temp_new' ? '#f2f2f2' : 'white'}} onClick={() => {fn('temp_new')}}>Temperature</Typography>
            <Typography sx={{...style, bgcolor: layer === 'wind_new' ? '#f2f2f2' : 'white'}} onClick={() => {fn('wind_new')}}>Wind speed</Typography>
            <Typography sx={{...style, bgcolor: layer === 'clouds_new' ? '#f2f2f2' : 'white'}} onClick={() => {fn('clouds_new')}}>Clouds</Typography>
        </Box>
    )
}

function ZoomBtn({handleClick, zoom}){

    const style = {fontSize: 32, display:'block', p:1.5, textAlign: 'center', verticalAlign:'middle', bgcolor:'white', '&:hover':{bgcolor:'white'}, width:15, cursor:'pointer', my:0.25, boxShadow:3}

    return (
        <Box position='fixed' top='5%' left='5%' zIndex={30}>
            <Box sx={{...style, color: zoom === 12 ? '#999' : '#232323'}} onClick={() => {handleClick('inc')}}>&#43;</Box>
            <Box sx={{...style, color: zoom === 0 ? '#999': '#232323'}} onClick={() => {handleClick('dec')}}>&#8722;</Box>
        </Box>
    )
}