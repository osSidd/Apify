import { Component } from "react";
import {NavLink} from 'react-router-dom'
import ApiIcon from '@mui/icons-material/Api';
import Typography from "@mui/material/Typography";

class Navbar extends Component{
    render(){
        return (
            <div style={{position:'fixed', padding:'0 45px', top:'0', left:'0',right:'0', backgroundColor:'#333', color:"#eee", display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <div style={{marginRight:'25px'}}>
                        <ApiIcon
                            fontSize="large"
                        />
                    </div>
                    <Typography
                        variant="h4"
                        fontWeight={900}
                    >
                        APIfy
                    </Typography>
                </div>
                <div>
                    <NavLink style={{marginLeft: '25px', color:'#eee', textDecoration:'none'}} to="/">News</NavLink>
                    <NavLink style={{marginLeft: '25px', color:'#eee', textDecoration:'none'}} to="/weather">Weather</NavLink>
                    <NavLink style={{marginLeft: '25px', color:'#eee', textDecoration:'none'}} to="/sports">Sports</NavLink>
                    <NavLink style={{marginLeft: '25px', color:'#eee', textDecoration:'none'}} to="/stocks">Stocks</NavLink>
                    <NavLink style={{marginLeft: '25px', color:'#eee', textDecoration:'none'}} to="/stocks">RSS</NavLink>
                </div>        
            </div>
        )
    }
}

export default Navbar