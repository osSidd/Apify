import { Component } from "react";
import './homepage.css'

class HomePage extends Component{

    constructor(){
        super()
        this.state = {}
        this.renderItem = this.renderItem.bind(this)
        this.renderDate = this.renderDate.bind(this)
    }

    componentDidMount(){
        let city = 'london'
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`,{mode:'cors'})
            .then(res => res.json())
            .then(data => {this.setState(data)})
    }

    componentDidUpdate(){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.renderItem('coord', 'lat')}&lon=${this.renderItem('coord', 'lon')}&exclude=minutely&appid=${import.meta.env.VITE_API_KEY}`,{mode:'cors'})
        .then(res => res.json())
        .then(data => {})        
    }

    render(){
        return(
            <div>
                <div>
                    {this.renderItem('name')} / {this.renderItem('sys', 'country')} - {this.renderDate()}
                </div>
                <div>
                    <div>
                        Temperature : current - {this.renderItem('main', 'temp')}, feels like - {this.renderItem('main', 'feels_like')}, max - {this.renderItem('main', 'temp_max')}, min - {this.renderItem('main', 'temp_min')}

                    </div>
                </div>
            </div>
        )
    }

    renderItem(property, subproperty=null){

        return subproperty ? (this.state[property] && this.state[property][subproperty]) : this.state[property]
    }

    renderDate(){
        return new Date(this.state.dt*1000).toLocaleString()
    }
}

export default HomePage