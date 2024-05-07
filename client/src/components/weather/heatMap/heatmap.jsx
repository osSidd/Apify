import { createPortal } from 'react-dom'
import { Component, createRef } from "react";
import './heatmap.css'
import { Box, IconButton, Typography } from "@mui/material";
import tt from '@tomtom-international/web-sdk-maps'
import {services} from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import Legend from "./legend";
import CloseIcon from '@mui/icons-material/Close';

class HeatMap extends Component{

    constructor(props){
        super(props)
        this.mapRef = createRef()
        this.weatherRef = createRef()
        this.apiKey = import.meta.env.VITE_TOMTOM_KEY
        this.state = {
            center: [this.props.lon, this.props.lat],
            layer: 'precipitation_new',
            displayWeatherMap: false,
        }
        this.map = {remove(){}}
        this.setMap = this.setMap.bind(this)
        this.showWeatherMap = this.showWeatherMap.bind(this)
        this.hideWeatherMap = this.hideWeatherMap.bind(this)
        this.selectLayer = this.selectLayer.bind(this)
    }

    componentDidMount(){
        // this.setMap(this.mapRef.current)
        // this.setMap(this.weatherRef.current) 
    }

    setMap(container){
        
        this.map = tt.map({
            key: this.apiKey,
            container,
            center: this.state.center,
            zoom: 6,
        })

        this.map.on('load', () => {
            this.map.addSource('owm_source', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/${this.state.layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
                ],
                tileSize:256,
                minzoom: 0,
                maxzoom:12,
                attribution: 'openweathermap.org'
            })
    
            this.map.addLayer({
                id:'owm_layer',
                type: 'raster',
                source: 'owm_source',
                layout: {visibility: 'visible'}
            })
        })
    }

    static getDerivedStateFromProps(props, state){
        const condition = Math.abs(state.center.lon - props.lon) < 0.01 && Math.abs(state.center.lat - props.lat) < 0.01

        if(condition) return null
        return {...state, center: [props.lon, props.lat]}
    }

    componentWillUnmount(){
        this.map.remove()
    }

    componentDidUpdate(){
        // console.log('heatmap updated', this.state)
        this.setMap(this.mapRef.current)
        this.setMap(this.weatherRef.current) 
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

    // shouldComponentUpdate(props, nextState){
    //     console.log(props, nextState)
    //     const condition = Math.abs(this.state.center.lon - props.lon) < 0.01 && Math.abs(this.state.center.lat - props.lat) < 0.01
    //     return !condition
    // }


    // add minutely call for gettting 1 hr data to be used in heatmap precipitation description box

    render(){
        console.log(this.state)
       return(
        <div style={{width:'100%', height:'100%', zIndex:1, position:'relative'}}>
            {
                createPortal(
                    <div id='weather-map-container' style={{display: this.state.displayWeatherMap ? 'flex' : 'none'}}>
                        <IconButton onClick={this.hideWeatherMap} sx={{position:'fixed', zIndex:50, top:5, right:5, bgcolor:'white', '&:hover':{bgcolor:'white'}}} >
                            <CloseIcon/>
                        </IconButton>
                        <div id='weather-map' ref={this.weatherRef}>
                            <Layers fn={this.selectLayer} layer={this.state.layer}/>
                        </div>
                    </div>
                    , document.getElementById('weather-map')
                )   
            }
            <div onClick={this.showWeatherMap} style={{width:'100%', height:'100%', zIndex:1}} ref={this.mapRef} id="heatmap"></div>
            {/* <Legend minutely={this.props.minutely}/> */}
        </div>
       )
    }
}

export default HeatMap

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
