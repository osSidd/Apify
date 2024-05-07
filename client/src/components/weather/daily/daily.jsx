import { Component } from "react";
import {Box, Typography} from '@mui/material'
import Table from "./table";
import Details from "./details";

class Daily extends Component{

    constructor(props){
        super(props)
        this.state = {
            dayWeather: {},
            rowToggled: false,
            timezone: 'Europe/London'
        }
        this.showDetails = this.showDetails.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
    }

    static getDerivedStateFromProps(props, state){
        if(state.timezone !== props.timezone) return {...state, timezone: props.timezone}
    }
    
    showDetails(d){
        console.log(d)
        this.setState({
            dayWeather: d,
            rowToggled: true
        })
    }

    hideDetails(){
        this.setState({
            ...this.state, 
            rowToggled: false,
        })
    }
    
    render(){
        const {data, unit} = this.props

        return (
            <Box>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={0.5}
                    color='#232323'
                >
                    8-day forecast
                </Typography>
                { this.state.rowToggled ? 
                    <Details timezone={this.state.timezone} hideDetails={this.hideDetails} showDetails={this.showDetails} unit={unit} daily={data} data={this.state.dayWeather}/> : 
                    <Table timezone={this.state.timezone} showDetails={this.showDetails} data={data} unit={unit}/>
                }        
            </Box>
        )
    }
}

export default Daily