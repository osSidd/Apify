import { Container, Box, Typography, Link, Grid, Button, IconButton, TextField, TextareaAutosize } from '@mui/material'
import { Form, Link as RouterLink } from 'react-router-dom'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LogoText from './navbar/logotext'
import NavLinks from './navbar/links'

export default function Footer(){

    const links = ['about','credits','tools', 'download','blog']

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
                    my: 8,
                }}
            >
                <Grid container alignItems="start" px={5} columnGap={15}>
                    <Grid item xs={12} md={3} display="flex" flexDirection="column" alignItems="start"> 
                        <LogoText/>
                        <Typography
                            sx={{color: '#eee'}}
                            mt={2}
                        >
                            A PWA which brings feeds of news, weather, sports, finance, social and enterntainment under a single hood and thus eliminates the need to have multiple apps.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={1} display="flex" flexDirection="column">
                        <Typography
                            sx={{color: '#eee'}}
                            variant='h6'
                            mb={2}
                            alignSelf="start"
                        >
                            Pages
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="start">
                            <NavLinks/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={1} display="flex" flexDirection="column">
                        <Typography
                            sx={{color: '#eee'}}
                            variant='h6'
                            mb={2}
                        >
                            Links
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="start">
                            {
                                links.map(link => (
                                    <Button
                                        component={RouterLink}
                                        sx={{color:'white', marginRight:'auto'}}
                                        
                                    >
                                        {link}
                                    </Button>
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} display="flex" flexDirection="column">
                        <Typography
                            sx={{color: '#eee'}}
                            variant='h6'
                            mb={2}
                        >
                            Get in Touch
                        </Typography>
                        <TextField size='small' sx={{color: '#eee', bgcolor: '#cdcdcd', borderRadius: '5px', marginBottom: '12px'}} placeholder='Name'/>
                        <TextField size='small' sx={{color: '#eee', bgcolor: '#cdcdcd', borderRadius: '5px', marginBottom: '12px'}} placeholder='Email'/>
                        <TextField size='small' multiline rows={4} sx={{color: '#eee', bgcolor: '#cdcdcd', borderRadius: '5px', marginBottom: '12px'}} placeholder='Message'/>
                        <Button variant='contained' color='primary'>Send Message</Button>
                        <Box m="24px auto 0">
                            <IconButton sx={{color:'#fff'}} href='https://www.linkedin.com/in/osama-siddiquee-5722a1a1/' target='_blank'>
                                <LinkedInIcon sx={{fontSize: '2.5rem', mr:1}}/>
                            </IconButton>
                            <IconButton sx={{color:'#fff'}} href="http://github.com/osSidd" target='_blank'>
                                <GitHubIcon sx={{fontSize: '2.5rem'}}/>
                            </IconButton>
                            <IconButton sx={{color:'#fff'}} href="http://twitter.com" target='_blank'>
                                <TwitterIcon sx={{fontSize: '2.5rem'}}/>
                            </IconButton>
                            <IconButton sx={{color:'#fff'}} href="https://www.instagram.com/" target='_blank'>
                                <InstagramIcon sx={{fontSize: '2.5rem'}}/>
                            </IconButton>
                        </Box>
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
                &copy; Copyright APIfy {new Date().getFullYear()} | Designed & Developed by <Link sx={{color:'#fff', textDecoration: 'none', fontWeight: 700}} href="https://github.com/osSidd" target="_blank">Osama Siddiquee</Link> 
            </Typography>
            
        </Container>
    )
}