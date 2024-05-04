import { Component, createRef } from "react";
import './heatmap.css'
import { Box } from "@mui/material";
import tt from '@tomtom-international/web-sdk-maps'
import {services} from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'


class HeatMap extends Component{

    constructor(props){
        super(props)
        this.mapRef = createRef()
        this.apiKey = import.meta.env.VITE_TOMTOM_KEY
        this.state = {
            center: [this.props.lon, this.props.lat]
        }
    }

    componentDidMount(){
        this.map = tt.map({
            key: this.apiKey,
            container: this.mapRef.current,
            center: this.state.center,
            zoom: 6,
        })

        this.map.on('load', () => {
            this.map.addSource('owm_source', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/precipitation_new/6/30/30.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
                ],
                tileSize:256,
                minzoom: 0,
                maxzoom:12,
                // attribution: 'openWeatherMapAttribution'
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
        return {center: [props.lon, props.lat]}
    }

    componentWillUnmount(){
        this.map.remove()
    }

    componentDidUpdate(){
        console.log('heatmap updated', this.state)
        this.map = tt.map({
            key: this.apiKey,
            container: this.mapRef.current,
            center: this.state.center,
            zoom: 6,
        })
        this.map.on('load', () => {
            this.map.addSource('owm_source', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/temp_new/6/30/30.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
                ],
                tileSize:256,
                minzoom: 0,
                maxzoom:12,
                // attribution: 'openWeatherMapAttribution'
            })
    
            this.map.addLayer({
                id:'owm_layer',
                type: 'raster',
                source: 'owm_source',
                layout: {visibility: 'visible'}
            })
        })
    }

    // shouldComponentUpdate(props, nextState){
    //     console.log(props, nextState)
    //     const condition = Math.abs(this.state.center.lon - props.lon) < 0.01 && Math.abs(this.state.center.lat - props.lat) < 0.01
    //     return !condition
    // }

    render(){
       return(
        <div style={{width:'100%', height:'100%'}} ref={this.mapRef} id="heatmap"></div>
       )
    }
}

export default HeatMap