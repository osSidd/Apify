import { Component } from "react";
import './weatherpage.css'

import Header from "../../components/header";
import SearchArea from "../../components/weather/searchArea";
import CurrentWeather from "../../components/weather/current";
import HeatMap from '../../components/weather/heatMap/heatmap'
import Hourly from "../../components/weather/hourly/hourly";
import Daily from '../../components/weather/daily/daily'

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
            unit: 'M'
        }

        this.getCoord = this.getCoord.bind(this)
        this.getForecast = this.getForecast.bind(this)
        this.searchCity = this.searchCity.bind(this)
        this.changeUnit = this.changeUnit.bind(this)
    }
    
    componentDidMount(){
       this.getCoord('london')  
    }

    componentDidUpdate(){
        // console.log(this.state)
        console.log('updated')
    }
    
    async getCoord(city){
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,{mode:'cors'})

            if(!res.ok) return

            let coordData = await res.json()
            
            let lat = coordData.coord.lat
            let lon = coordData.coord.lon
            let cityName = coordData.name
            let country = coordData.sys.country

            const {current, daily, hourly, timezone} = await this.getForecast(lat, lon)
            this.setWeatherData(cityName, country, current, daily, hourly, timezone)

        }catch(err){
            console.log(err.message)
        }
    }

    async setWeatherData(city, country, current, daily, hourly, timezone){
        this.setState({
            city,
            country,
            current,
            daily,
            hourly,
            timezone,
        })
    }

    async searchCity(lat, lon, city, country){
        try{

            const {current, daily, hourly, timezone} = await this.getForecast(lat, lon)
            this.setWeatherData(city, country, current, daily, hourly, timezone)

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

    changeUnit(unit){
        this.setState({unit})
    }

    render(){
        return(
            <div>
                {/* <Header
                    title="HowzWeather"
                    description="Weather forecast and nowcast powered by OpenweathermapAPI"
                    banner={banner}
                /> */}
                <SearchArea searchCity={this.searchCity} changeUnit={this.changeUnit} unit={this.state.unit}/>
                <div>
                    {
                        this.state.daily?.[0] 
                            ? 
                            <Container maxWidth="xl" sx={{bgcolor: '#f8f8f8', py:4}}>
                                <Box sx={{mx: {md:12},}}>
                                    <Grid container rowSpacing={5} columnSpacing={{md:5}}>
                                        <Grid item xs={12} md={5}>
                                            <CurrentWeather 
                                                timezone={this.state.timezone} 
                                                location={{country: this.state.country, city: this.state.city}}
                                                current = {this.state.current}
                                                unit={this.state.unit} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <HeatMap/>
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <Hourly 
                                                timezone={this.state.timezone} 
                                                data={this.state.hourly}
                                                unit={this.state.unit}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Daily 
                                                timezone={this.state.timezone} 
                                                data={this.state.daily}
                                                unit={this.state.unit}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                            : <Box minHeight='50vh' display='flex' justifyContent='center' alignItems='center'>Fetching data...</Box>
                    }
                </div>
            </div>
        )
    }
}

export default WeatherPage