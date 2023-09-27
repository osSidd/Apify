import { Component } from "react";
import './homepage.css'

import CurrentWeather from "../../components/current/current";
import HeatMap from '../../components/heatMap/heatmap'

import obj from '../../data'
import Hourly from "../../components/hourly/hourly";
import Daily from '../../components/daily/daily'
import Footer from "../../components/footer/footer";
import Tools from "../../components/tools/tools";

class HomePage extends Component{

    constructor(){
        super()
        // this.state = {
        //     coord: {lat: 0, lon: 0},
        //     forecast:{},
        // }

        this.state = obj
        this.getCoord = this.getCoord.bind(this)
        this.getForecast = this.getForecast.bind(this)
    }

    componentDidMount(){
       // this.getCoord('london')  
        //this.getForecast()     
        console.log(obj) 
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    async getCoord(city){
        
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`,{mode:'cors'})

        let data = await res.json()
        
        this.setState({
            ...this.state, 
            coord:{
                lat: data.coord.lat,
                lon: data.coord.lon,
            }
        })

    }

    async getForecast(){
        let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coord.lat}&lon=${this.state.coord.lon}&exclude=minutely&appid=${import.meta.env.VITE_API_KEY}`,{mode:'cors'})

        let data = await res.json()

        this.setState({
            ...this.state,
            forecast: data
        })
    }

    render(){

        return(
            <div>
                {
                    this.state.forecast.current 
                        ? <div className="data-components">
                            <CurrentWeather current = {this.state.forecast.current} />
                            <HeatMap/>
                            <Hourly data={obj.forecast.hourly}/>
                            <Daily data={obj.forecast.daily}/>
                          </div> 
                        : <div>Fetching data...</div>
                }
                <Tools/>
                <Footer/>
            </div>
        )
    }
}

export default HomePage