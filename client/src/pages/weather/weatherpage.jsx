import { Component } from "react";
import './weatherpage.css'

import Header from "../../components/header";
import SearchArea from "../../components/weather/searchArea";
import CurrentWeather from "../../components/weather/current";
import HeatMap from '../../components/weather/heatMap/heatmap'
import Hourly from "../../components/weather/hourly/hourly";
import Daily from '../../components/weather/daily'

import banner from '../../assets/weather/banner.jpg'
import { Container, Grid, Box } from "@mui/material";

class WeatherPage extends Component{

    constructor(){
        super()
        this.state = {
            country:'',
            city:'',
            timezone:'',
            current: [],
            daily: [],
            hourly: [],
        }

        this.getCoord = this.getCoord.bind(this)
        this.getForecast = this.getForecast.bind(this)
    }
    
    componentDidMount(){
       this.getCoord('ottawa')  
    }

    componentDidUpdate(){
        console.log(this.state)
    }
    
    async getCoord(city){
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,{mode:'cors'})

            if(!res.ok) return

            let coordData = await res.json()
            
            let lat = coordData.coord.lat
            let lon = coordData.coord.lon

            const {current, daily, hourly, timezone} = await this.getForecast(lat, lon)

            this.setState({
                city: coordData.name,
                country: coordData.sys.country,
                current,
                daily,
                hourly,
                timezone,
            })
        }catch(err){
            console.log(err.message)
        }

    }

    async getForecast(lat, lon){
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,{mode:'cors'})
            
            if(!res.ok) return 
        
            let data = await res.json()
            return data
        }catch(err){
            console.log(err.message)
        }
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
                        this.state.daily?.[0] 
                            ? 
                            <Container maxWidth="xl" sx={{bgcolor: '#f8f8f8', py:4}}>
                                <Box sx={{mx: 12,}}>
                                    <Grid container rowSpacing={5} columnSpacing={5}>
                                        <Grid item md={4}>
                                            <CurrentWeather 
                                                timezone={this.state.timezone} 
                                                location={{country: this.state.country, city: this.state.city}}
                                                current = {this.state.current} 
                                            />
                                        </Grid>
                                        <Grid item md={8}>
                                            <HeatMap/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <Hourly timezone={this.state.timezone} data={this.state.hourly}/>
                                        </Grid>
                                        <Grid item md={5}>
                                            <Daily timezone={this.state.timezone} data={this.state.daily}/>
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