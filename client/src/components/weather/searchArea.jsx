import { Component } from "react"

import NearMeIcon from '@mui/icons-material/NearMeOutlined';

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { IconButton, Button, OutlinedInput, FormGroup, Stack, Chip, ListItem } from "@mui/material";

class SearchArea extends Component{

    constructor(){
        super()
        this.state = {
            city: '',
            cities: [],
            displayCities: false
        }

        this.getGeoLocation = this.getGeoLocation.bind(this)
    }

    async getCities(city){
        try{
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${import.meta.env.VITE_WEATHER_API_KEY}`, {mode:'cors'})

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

    getGeoLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async p => {
                try{
                    let lat = p.coords.latitude
                    let lon = p.coords.longitude
                    
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)

                    const data = await res.json()

                    const city = data.name
                    const country = data.sys.country

                    this.props.searchCity(lat, lon, city, country)
                }catch(err){
                    console.log(err.message)
                }
                
            })
        }
        else{
            console.log('geolocation not supported')
        }
    }

    render(){
        const unit = this.props.unit
        const chipProp = {
            paddingX:1, 
            fontSize: 12,
            borderRadius:2
        }
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
                    flexDirection={{xs:'column', sm:'row'}}
                    mx={{lg:12}}
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
                                    maxHeight:'36px',
                                    width:{
                                        xs: '225px',
                                        md: '475px'
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
                            zIndex={10} 
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
                    <Box mt={{xs:2, md:0}} display="flex" alignItems="center">
                        <IconButton onClick={this.getGeoLocation}>
                            <NearMeIcon
                                sx={{
                                 stroke: 'white'                                
                                }}
                            />
                        </IconButton>
                        <Stack direction="row">
                            <Chip 
                                onClick={() => this.props.changeUnit('M')} 
                                label="Metric &deg;C m/s" 
                                size="small" 
                                sx={{...chipProp, bgcolor: unit==='M'?'white':'transparent', "&:hover":{bgcolor: unit === 'M' ? 'white': 'transparent'}}}
                            />
                            <Chip 
                                onClick={() => this.props.changeUnit('I')} 
                                label="Imperial &deg;F mph" 
                                size="small" 
                                sx={{...chipProp, bgcolor: unit==='I'?'white': 'transparent', "&:hover":{
                                    bgcolor: unit === "I" ? 'white' : 'transparent'
                                }}}
                            />
                        </Stack>
                    </Box>                        
                </Box>
            </Container>
        )
    }
}

export default SearchArea