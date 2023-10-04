import { Component } from "react";
import { Link as RouterLink} from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import ApiIcon from '@mui/icons-material/Api';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

class Navbar extends Component{
    render(){

        const pages = ['News', 'Weather', 'Stocks', 'Sports', 'RSS']

        return (
            // Try the elevate on scroll
            <AppBar position="fixed" color="darkCharcoal">
                <Container maxWidth="xl">
                    <Toolbar>
                        <ApiIcon 
                            fontSize="large"
                            sx={{
                                mr:2
                            }} 
                        />
                        <Typography
                            variant="h4"
                            fontWeight={900}
                            noWrap
                            letterSpacing='0.15rem'
                        >
                            APIfy
                        </Typography>
                        <Box sx={{ml:'auto', display:{xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            {/* Implement menu and functionality for the small screen */}
                        </Box>
                        <Box sx={{ml: 'auto', display: {xs: 'none', md: 'flex'}}}>
                            {
                                pages.map(page => (                                    
                                    <Button 
                                        onClick={() => {}}
                                        sx={{color:'#eee', ml: 2, letterSpacing: '0.1rem'}}
                                        component={RouterLink}
                                        to={`/${page}`}
                                        key={page}
                                        
                                    >
                                        {page}
                                    </Button>
                                ))
                            }
                        </Box>      
                    </Toolbar>  
                </Container>
            </AppBar>
            
        )
    }
}

export default Navbar