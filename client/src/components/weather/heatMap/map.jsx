import { Component, createRef } from "react";

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'

class Map extends Component{

    constructor(props){
        super(props)
        
        this.map = null
        this.marker = null
        this.apiKey = import.meta.env.VITE_TOMTOM_KEY

        this.mapRef = createRef()
    
        this.setMap = this.setMap.bind(this)    
    }

    componentDidMount(){
        this.setMap(this.mapRef.current)
    }

    componentWillUnmount(){
        this.map?.remove()
    }

    componentDidUpdate(){
        this.map.setCenter(this.props.center)

        if(!this.marker) 
            this.marker = new tt.Marker().setLngLat(this.props.center).addTo(this.map)
        else 
            this.marker.setLngLat(this.props.center)
        
        console.log('heatmap component updated')
    }

    setMap(container){
        this.map = tt.map({
            key: this.apiKey,
            container,
            center: this.props.center,
            language:'en-US',
            zoom: 6,
        })
        this.marker = new tt.Marker().setLngLat(this.props.center).addTo(this.map)
        this.map.on('load', () => {
            this.map.addSource('owm_source', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/${this.props.layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
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

    render(){
        return (
            <div 
                onClick={this.props.handleClick} 
                style={{width:'100%', height:'100%', zIndex:1}} 
                ref={this.mapRef} 
                id={this.props.id}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Map