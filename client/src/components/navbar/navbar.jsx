import { Component } from "react";

import NavLinks from "./links";
import MenuIcon from '@mui/icons-material/Menu';
import LogoText from "./logotext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

class Navbar extends Component{
    render(){
        return (
            // Try the elevate on scroll
            <AppBar position="fixed" color="darkCharcoal">
                <Container maxWidth="xl">
                    <Toolbar>
                        <LogoText/>
                        <Box sx={{ml:'auto', display:{xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            {/* Implement menu and functionality for the small screen */}
                        </Box>
                        <Box ml="auto">
                            <NavLinks/>
                        </Box>
                    </Toolbar>  
                </Container>
            </AppBar>
            
        )
    }
}

export default Navbar