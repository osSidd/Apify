import { Link as RouterLink } from "react-router-dom"
import { Box, Button } from "@mui/material"

export default function NavLinks(){

    const pages = ['News', 'Weather', 'Stocks', 'Sports', 'RSS']

    return (
        <>
            {
                pages.map(page => (                                    
                    <Button 
                        onClick={() => {}}
                        sx={{color:'#eee', letterSpacing: '0.1rem'}}
                        component={RouterLink}
                        to={`/${page}`}
                        key={page}
                        
                    >
                        {page}
                    </Button>
                ))
            }
        </>
    )
}