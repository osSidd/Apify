import { Component } from "react";
import Header from "../components/header";
import banner from '../assets/sports/banner.jpg'

// import countries from '../data/sports/countries'
import countryLeagues, {countries} from "../data/sports/leagues";
import { Box, Typography } from "@mui/material";

class Sports extends Component{

    constructor(){
        super()
    }

    fetchData(){
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "91956f7a0ad5df2a663cff035b6e8496");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/teams?id=99", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }


    render(){
        console.log('hi')
        return (
            <Box>
                <Header
                    title="Sportify"
                    description="Latest scores and match reviews"
                    banner={banner}
                />

                <Box ml={4}>
                    {
                        countries.map(item => (
                            <Box key={item} my={2}>
                                {
                                    <details>
                                        <summary style={{display:'flex', alignItems:'center'}}>
                                            <Box component='img' width={22} mr={2} src={countryLeagues[item][0].country.flag}/>
                                            <Typography>{item}</Typography>
                                        </summary>
                                        {
                                            countryLeagues[item].map((i,index) => (
                                                <Box key={index} ml={4} display='flex' alignItems='center' my={2}>
                                                    <Box component='img' width={22} src={i.league.logo} mr={2} />
                                                    <Typography>{i.league.name}</Typography>
                                                    
                                                </Box>
                                            ))
                                        }
                                    </details>
                                }
                            </Box>
                        ))
                    }
                </Box>



            </Box>
        )
    }
}

export default Sports