import { Component } from "react";
import './heatmap.css'
import { Box } from "@mui/material";

class HeatMap extends Component{

    componentDidMount(){
        // fetch(`https://tile.openweathermap.org/map/temp_new/${16}/${2}/${2}.png?appid=${import.meta.env.VITE_API_KEY}`, {mode: "cors"})
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        let tomTomMap;
        tomTomMap = tt.map({key:import.meta.env.VITE_TOMTOM_KEY, container:'heatmap'})

        let queryText = 'london'

        tt.services.fuzzySearch({ key: import.meta.env.VITE_TOMTOM_KEY, query: queryText })
        .go()
        .then(centerAndZoom)
        .catch(function(error) {
        alert('Could not find location (' + queryText + '). ' + error.message);
});
    }

    render(){
       return(
            <Box>
                <div id="heatmap"></div>
            </Box>
       )
    }
}

export default HeatMap