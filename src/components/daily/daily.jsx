import { Component } from "react";
import './daily.css'

class Daily extends Component{

    render(){

        const data = this.props.data

        return (
            <div className="daily">
                <h2>8-day forecast</h2>
                {
                    data.map(d => {
                        return(
                            <div className="daily-row" key = {data.indexOf(d)}>
                                <div>{new Date(d.dt*1000).toLocaleDateString()}</div>
                                <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt="icon" />
                                <div>{parseInt(d.temp.max - 272.15)}&deg;C / {parseInt(d.temp.min - 272.15)}&deg;C</div>
                                <div className="description">{d.weather[0].description}</div>
                                <div className="dropdown">&#9662;</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Daily