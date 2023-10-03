import { Component } from "react"
import './searchArea.css'
import Button from '@mui/material/button'
import NearMeIcon from '@mui/icons-material/NearMeOutlined';

class SearchArea extends Component{
    render(){
        return(
            <div className="search-area">
                <div>
                    <input type="search" name="search" id="search" placeholder="Search City"/>
                    <Button 
                        disableElevation 
                        color="darkCharcoal" 
                        variant="contained"
                        sx={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            textTransform:'capitalize',
                            fontSize:'14px',
                            fontWeight:400,
                        }}
                    >
                        Search
                    </Button>
                </div>
                <div className="loc-units">
                    <div>
                        <NearMeIcon
                            color="blackCharcoal"
                            sx={{
                                stroke: 'white'                                
                            }}
                        />
                    </div>
                    <Button color="primary" variant="outlined">Metric</Button>
                    <Button color="primary" variant="outlined">Imperial</Button>
                </div>
            </div>
        )
    }
}

export default SearchArea