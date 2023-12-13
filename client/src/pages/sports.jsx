import { Component } from "react";
import Header from "../components/header";
import banner from '../assets/sports/banner.jpg'

// import countryLeagues from "../data/sports/leagues";
// import countries from "../data/sports/countries";
import { Box } from "@mui/material";

// import teams from '../data/sports/teamLgSn'

class Sports extends Component{

    constructor(){
        super()
        // this.fetchData()
    }

    componentDidMount(){
        const widgetScript = document.createElement('script')
        widgetScript.src = 'https://widgets.api-sports.io/2.0.3/widgets.js'
        widgetScript.type='module'
        widgetScript.defer=true
        document.head.appendChild(widgetScript)

        console.log('hi from sports')
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

        fetch("https://v3.football.api-sports.io/teams/statistics?season=2023&team=all&league=39", requestOptions)
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
                <div id="wg-api-football-standings"
                    data-host="v3.football.api-sports.io"
                    data-key="91956f7a0ad5df2a663cff035b6e8496"
                    data-league="39"
                    data-team=""
                    data-season="2023"
                    data-theme=""
                    data-show-errors="false"
                    data-show-logos="true"
                    className="wg_loader">
                        Hi there
                </div>
                {/* <Box ml={4}>
                    {
                        countries.map((item, id) => (
                            <Box key={id} my={2}>
                                {
                                    <details>
                                        <summary style={{display:'flex', alignItems:'center'}}>
                                            <Box component='img' width={22} mr={2} src={item.flag}/>
                                            <Typography>{item.name}</Typography>
                                        </summary>
                                        {
                                            countryLeagues[item.name].map((i,index) => (
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
                </Box> */}

            </Box>
        )
    }
}

export default Sports