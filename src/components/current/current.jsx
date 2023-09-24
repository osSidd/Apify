import { Component } from "react"
import './current.css'

class CurrentWeather extends Component{

    
    getDate(date){
        return new Date(date*1000).toLocaleString()
    }

    getTemp(temp, unit='C'){
        return unit === 'C' ? (temp - 272.15).toFixed(1) : (temp - 457.87).toFixed(1)
    }

    getDirection(deg){
        console.log(deg)
        return {
            rotate: `${deg}deg`
        }
    }
    
    render(){

        const d = this.props.current
        console.log(d)
        return(
            <div className="current">
               
                <div className="date">{this.getDate(d.dt)}</div>
               
                <div className="name">London, GB</div>
               
                <div className="icon-temp">
                    <img className="icon" src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}/>
                    <div className="temp">{this.getTemp(d.temp, 'C')} &deg;C</div>
                </div>
               
                <div className="desc">Feels like {this.getTemp(d.feels_like, 'C')} &deg;C. {d.weather[0].description}</div>
               
                <div className="grid">
                    <div>
                        <span style={this.getDirection(d.wind_deg)}>&#10148;</span>
                        <span>{d.wind_speed} m/s</span>
                    </div>
                    <div>
                        <span>&#127777;</span>
                        <span>{d.pressure} hPa</span>
                    </div>
                    <div>Humidity: {d.humidity}%</div>
                    <div>Dew point: {this.getTemp(d.dew_point)} <span>&deg;</span>C</div>
                    <div>Visibility: {d.visibility/1000} km</div>
                    <div>UV: {d.uvi}</div>
                    {/* <div>
                        <span>&#127783;</span>
                    </div> */}
                </div>
                
               
               
               
            </div>
        )
    }
}

export default CurrentWeather