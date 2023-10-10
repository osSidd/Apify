import { Component } from "react";
import './weatherpage.css'

import Header from "../../components/header";
import SearchArea from "../../components/weather/searchArea";
import CurrentWeather from "../../components/weather/current";
import HeatMap from '../../components/weather/heatMap/heatmap'
import obj from '../../data'
import Hourly from "../../components/weather/hourly/hourly";
import Daily from '../../components/weather/daily/daily'

import banner from '../../assets/weather/banner.jpg'
import { Container, Grid, Box } from "@mui/material";

class WeatherPage extends Component{

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
                <Header
                    title="HowzWeather"
                    description="Weather forecast and nowcast powered by OpenweathermapAPI"
                    banner={banner}
                />
                <SearchArea/>
                <div>
                    {
                        this.state.forecast.current 
                            ? 
                            <Container maxWidth="xl" sx={{bgcolor: '#f8f8f8', py:4}}>
                                <Box sx={{mx: 12,}}>
                                    <Grid container>
                                        <Grid item md={4}>
                                            <CurrentWeather current = {this.state.forecast.current} />
                                        </Grid>
                                        <Grid item md={8}>
                                            <HeatMap/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <Hourly data={obj.forecast.hourly}/>
                                        </Grid>
                                        <Grid item md={5}>
                                            <Daily data={obj.forecast.daily}/>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                            : <div>Fetching data...</div>
                    }
                </div>
            </div>
        )
    }
}

export default WeatherPage