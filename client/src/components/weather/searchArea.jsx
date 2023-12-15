import { Component } from "react"

import NearMeIcon from '@mui/icons-material/NearMeOutlined';

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { Grid, IconButton, Button, OutlinedInput, FormGroup, TextField, Stack, Chip, ListItem } from "@mui/material";

class SearchArea extends Component{

    constructor(){
        super()
        this.state = {
            city: '',
            cities: [],
            displayCities: false
        }
    }

    async getCities(city){
        try{
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`, {mode:'cors'})

            if(!res.ok) return 

            const data  = await res.json()
            this.setState({cities:data, displayCities: true, city: ''})
        }catch(err){
            console.log(err.message)
        }
    }

    selectCity(lat, lon, name, country){
        this.props.searchCity(lat, lon, name, country)
        this.setState({displayCities: false})
    }

    handleChange(e){
        console.log(e.target.value)
        this.setState({city: e.target.value})
    }

    render(){
        const unit = this.props.unit
        return(
            <Container 
                maxWidth="xl"
                sx={{
                    bgcolor: '#dedede',
                    paddingY: '20px'
                }}
            >
                <Box 
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"  
                    mx={12}
                >
                    <Box position='relative'>
                        <FormGroup row>
                            <OutlinedInput 
                                sx={{
                                    borderRadius: '5px 0 0 5px',
                                    border:'none',
                                    outline: 'none',
                                    bgcolor: '#fff',
                                    height: '36px',
                                    width:{
                                        sm: '200px',
                                        md: '325px'
                                    },
                                    "& fieldset":{border: 'none'}
                                }}
                                name="city"
                                value={this.state.city}
                                onChange={e => this.handleChange(e)} 
                                placeholder="Search City"
                            />
                            <Button 
                                disableElevation 
                                sx={{
                                    borderRadius: '0 5px 5px 0', 
                                    bgcolor: '#444',
                                    height: '36px',
                                    textTransform: 'capitalize',
                                    "&:hover": {
                                        bgcolor: '#333'
                                    }
                                }} 
                                variant="contained"
                                onClick={this.state.city ? () => this.getCities(this.state.city) : undefined}
                            >
                                Search
                            </Button>
                        </FormGroup>
                        {
                            this.state.displayCities &&
                        <Box 
                            position='absolute' 
                            bgcolor='white' 
                            sx={{ 
                                width:{sm: '200px', md: '325px'},
                            }}
                            boxShadow={2}
                            borderRadius={2}    
                        >
                            {
                                this.state.cities.map(city => (
                                    <ListItem 
                                        key={city.lat} 
                                        sx={{"&>*":{fontSize:12}, "&:hover":{bgcolor:'#efefef'}, cursor:'pointer'}}
                                        onClick={() => this.selectCity(city.lat, city.lon, city.name, city.country)}
                                    >
                                        <span >{city.name}, {city.state} - {city.country}</span>
                                        <span style={{marginLeft:'auto'}}>{city.lat.toFixed(3)}, {city.lon.toFixed(3)}</span>
                                    </ListItem>
                                ))
                            }
                        </Box>}
                    </Box>
                    <Box display="flex" alignItems="center">
                        <IconButton>
                            <NearMeIcon
                                sx={{
                                 stroke: 'white'                                
                                }}
                            />
                        </IconButton>
                        <Stack direction="row" gap={1}>
                            <Chip 
                                onClick={() => this.props.changeUnit('M')} 
                                label="Metric &deg;C m/s" 
                                size="small" 
                                sx={{paddingX:2, bgcolor: unit==='M'?'white':'#dedede'}}
                            />
                            <Chip 
                                onClick={() => this.props.changeUnit('I')} 
                                label="Imperial &deg;F mph" 
                                size="small" 
                                sx={{paddingX:2, bgcolor: unit==='I'?'white': '#dedede'}}
                            />
                        </Stack>
                        {/* <Box>
                            <Button color="primary" sx={props} size="small">Metric &deg;C m/s</Button>
                            <Button color="primary" sx={props} size="small">Imperial &deg;F mph</Button>
                        </Box> */}
                    </Box>                        
                </Box>
            </Container>
        )
    }
}

export default SearchArea