import './footer.css'
import { Container, Box, Typography, Link, Grid } from '@mui/material'
import LogoText from '../navbar/logotext'
import NavLinks from '../navbar/links'

export default function Footer(){
    return(
        <Container 
            maxWidth="xl"
            sx={{
                bgcolor: '#222',
                py:2,
            }} 
        >
            <Box
                sx={{
                    m: 4
                }}
            >
                <Grid container columnSpacing={8}>
                    <Grid item md={4}> 
                        <LogoText/>
                        <Typography
                            sx={{color: '#eee'}}
                            mt={2}
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit doloremque possimus alias sed repudiandae officia odio atque doloribus.
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography
                            sx={{color: '#eee'}}
                            variant='h6'
                            mb={2}
                        >
                            Links
                        </Typography>
                        <Box>
                            <NavLinks/>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Typography
                            sx={{color: '#eee'}}
                            variant='h6'
                        
                        >
                            Osama Siddiquee
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography
                sx={{
                    color:'#eee',
                    fontSize: '14px',
                    textAlign: 'center'
                }}
            >
                Copyright &copy; <Link sx={{color:'#fff', textDecoration: 'none', fontWeight: 700}} href="https://github.com/osSidd" target="_blank">osSidd</Link> {new Date().getFullYear()}
            </Typography>
            
        </Container>
    )
}