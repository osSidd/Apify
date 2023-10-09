import { Link as RouterLink } from "react-router-dom"
import { Box, Button } from "@mui/material"

export default function NavLinks(){

    const pages = ['News', 'Weather', 'Finance', 'Sports', 'Social', 'Entertainment', 'Health']

    return (
        <>
            {
                pages.map(page => (                                    
                    <Button 
                        onClick={() => {}}
                        sx={{color:'#eee', letterSpacing: '0.1rem', fontWeight:400}}
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