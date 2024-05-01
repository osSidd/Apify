import { Component } from "react";
import {Box, Typography} from '@mui/material'
import Table from "./table";
import Details from "./details";

class Daily extends Component{

    constructor(){
        super()
        this.state = {
            dayWeather: {},
            rowToggled: false,
        }
        this.showDetails = this.showDetails.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
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
                >
                    8-day forecast
                </Typography>
                { this.state.rowToggled ? 
                    <Details hideDetails={this.hideDetails} showDetails={this.showDetails} unit={unit} daily={data} data={this.state.dayWeather}/> : 
                    <Table showDetails={this.showDetails} data={data} unit={unit}/>
                }        
            </Box>
        )
    }
}

export default Daily