import { Component } from "react"

class CurrentWeather extends Component{
    render(){

        const d = this.props.current
        console.log(d)
        return(
            <div>
                {d.wind_speed}
                Humidity: {d.humidity}%
                UV: {d.uvi}
                Visibility: {d.visibility/1000} km
                Dew point: {d.dew_point}
            </div>
        )
    }
}

export default CurrentWeather