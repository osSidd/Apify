import { Component, createRef, useRef } from "react";

import './map.css'

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import formatUnit from "../../../utils/weather/formatTemp";
import getDirection from "../../../utils/weather/windDirection";

class Map extends Component{

    constructor(props){
        super(props)
        
        this.map = null
        this.marker = null
        this.popup = null
        this.apiKey = import.meta.env.VITE_TOMTOM_KEY

        this.mapRef = createRef()
    
        this.setMap = this.setMap.bind(this)   
        this.handleMapClick = this.handleMapClick.bind(this) 
        this.setPopUp = this.setPopUp.bind(this)
    }

    componentDidMount(){
        this.setMap(this.mapRef.current)
    }

    componentWillUnmount(){
        this.map?.remove()
        this.popup?.remove()
    }

    componentDidUpdate(){
        this.map.flyTo({center: this.props.center})

        if(this.props.id === 'interactive-map'){
            const style = this.map.getStyle()
    
            this.map.setStyle({
                ...style, 
                sources: {
                    ...style.sources, 
                    'owm_source': {
                        ...style.sources['owm_source'], 
                        tiles:[`https://tile.openweathermap.org/map/${this.props.layer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`]
                    }
                }
            })
        }

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
        if(this.props.id === 'interactive-map'){
            this.map.on('click', this.handleMapClick)
            this.setPopUp(this.props.center)
        }
        this.marker = new tt.Marker().setLngLat(this.props.center).addTo(this.map)
        this.map.on('load', () => {
            this.map.addSource('owm_source', {
                type: 'raster',
                tiles: [
                    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
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

    handleMapClick(e){
        const {lat, lng} = e.lngLat
        this.marker.setLngLat([lng, lat])
        this.setPopUp([lng, lat])
    }

    async setPopUp(center){

        let htmlStr = `<div>Openweathermap.org</div>`

        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${center[1]}&lon=${center[0]}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)

            if(!res.ok) htmlStr = 'response error'
            else{
                const data = await res.json()
                htmlStr = this.getHtml(data)

                this.popup = new tt.Popup({maxWidth:'none'})
                        .setLngLat(center)
                        .setHTML(htmlStr)
                        .addTo(this.map)
            }
        }catch(err){
            htmlStr = 'failed to fetch'
        }
        
    }

    getHtml(d){
        return `
            <div class="popup-container">
                <h2>${d.name}, ${d.sys.country}</h2>
                <div class='popup-img-temp'>
                    <img src='https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png' alt='weather-icon'/>
                    <p>${formatUnit(d.main.temp, 'M', 'TEMP')} &deg;C</p>
                </div>
                <div class='other-info'>
                    <p>${d.weather[0].description}</p>
                    <p>Humidity: ${d.main.humidity}%</p>
                    <p>Wind: ${d.wind.speed}m/s ${getDirection(d.wind.deg)}</p>
                </div>
            </div>
        `
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