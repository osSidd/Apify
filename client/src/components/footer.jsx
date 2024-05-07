import { Link as RouterLink } from 'react-router-dom'

import { Container, Box, Typography, Link, Button, IconButton } from '@mui/material'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import portfolio from '../assets/portfolio.svg';
import LogoText from './navbar/logotext'

export default function Footer(){

    const links = ['about','news', 'weather']

    const linkProp = {textDecoration:'none', fontWeight:700}
    const copyrightProp = { fontSize: {xs:10, sm:12}, textAlign:'center'}

    return(
        <Container 
            maxWidth='xl'
            sx={{
                // bgcolor: '#282828',     
            }} 
        >
            {/* <Box
                sx={{
                    py:3,
                    borderBottom:'1px solid #555'
                }}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                flexDirection={{
                    xs:'column',
                    sm:'row'
                }}
            >
                <Box width={{xs:'100%', sm:'45%'}} textAlign={{xs:"center", sm:'left'}}>

                    {/* Logo and text */}

                    {/* <Box mx={{xs:'auto', sm:'0'}} width='fit-content'>
                        <LogoText logoSize={24} textSize={22}/>
                    </Box> */}

                    {/* Description */}

                    {/* <Typography
                        sx={{color: '#eee'}}
                        mt={1}
                        fontSize={12}
                    >
                        An api integration project which demonstrates integration of public apis and brings news feeds, weather updates under a single hood. 
                    </Typography>
                </Box>
                <Box mt={{xs:4, sm:0}}> */}

                    {/* Navigation and page links */}

                    {/* <Box>
                        {
                            links.map(link => (
                                <Button
                                    component={RouterLink}
                                    sx={{color:'#ddd', fontSize:{xs:10, sm:12}}}
                                    key={link}   
                                    to={`/${link}`}                                     
                                >
                                    {link}
                                </Button>
                            ))
                        }
                    </Box> */}

                    {/* Social icons */}

                    {/* <Box textAlign='center'>
                        <IconButton title='Linkedin' sx={{color:'#fff'}} href='https://www.linkedin.com/in/osama-siddiquee-5722a1a1/' target='_blank'>
                            <LinkedInIcon sx={{fontSize: '1.5rem', mr:1}}/>
                        </IconButton>
                        <IconButton title='github' sx={{color:'#fff'}} href="http://github.com/osSidd" target='_blank'>
                            <GitHubIcon sx={{fontSize: '1.5rem', mr:1}}/>
                        </IconButton>
                        <IconButton title='portfolio' sx={{color:'#fff'}} href="http://os-sidd.vercel.app" target='_blank'>
                            <Box
                                component='img'
                                src={portfolio}
                                width={24}
                                height={24}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box> */}

            {/* copyright section */}

            <Box display='flex' flexDirection={{xs:'column', md:'row'}} alignItems='center' justifyContent='space-between' py={2} mx={{lg:12}}>
                <Typography
                    sx={copyrightProp}
                >
                    {/* &copy; Copyright APIfy {new Date().getFullYear()} | Designed & Developed by <Link sx={{color:'#fff', textDecoration: 'none', fontWeight: 700}} href="https://os-sidd.vercel.app/" target="_blank">Osama Siddiquee</Link>  */}
                    {/* &copy; Copyright APIfy {new Date().getFullYear()} | Designed & Developed by <Link sx={{textDecoration: 'none', fontWeight: 700}} href="https://os-sidd.vercel.app/" target="_blank">Osama Siddiquee</Link>  */}
                    Developed by <Link sx={linkProp} href="https://os-sidd.vercel.app/" target="_blank">Osama Siddiquee</Link> | Design inspired by <Link sx={linkProp} href="https://openweathermap.org">openweathermap.org</Link> 
                </Typography>
                <Typography mt={{xs:1, md:0}} sx={copyrightProp}><Link href="https://unsplash.com/photos/blue-pink-and-yellow-abstract-painting-7kU-BMYARQs" target="_blank" sx={linkProp}>Header image (Unsplash)</Link> by <Link href="https://unsplash.com/@sushioutlaw" target="_blank" sx={linkProp}>Brian McGowan</Link></Typography>
            </Box>            
        </Container>
    )
}