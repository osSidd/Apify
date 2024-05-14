import { Container, Box, Typography, Link} from '@mui/material'

export default function Footer(){

    const linkProp = {textDecoration:'none', fontWeight:700}
    const copyrightProp = { fontSize: {xs:10, sm:12}, textAlign:'center'}

    return(
        <Container maxWidth='xl'>
            {/* copyright section */}
            <Box display='flex' flexDirection={{xs:'column', md:'row'}} alignItems='center' justifyContent='space-between' py={2} mx={{lg:12}}>
                <Typography
                    sx={copyrightProp}
                >
                    Developed by <Link sx={linkProp} href="https://os-sidd.vercel.app/" target="_blank">Osama Siddiquee</Link> | Design inspired by <Link sx={linkProp} href="https://openweathermap.org">openweathermap.org</Link> 
                </Typography>
                <Typography mt={{xs:1, md:0}} sx={copyrightProp}><Link href="https://unsplash.com/photos/blue-pink-and-yellow-abstract-painting-7kU-BMYARQs" target="_blank" sx={linkProp}>Header image (Unsplash)</Link> by <Link href="https://unsplash.com/@sushioutlaw" target="_blank" sx={linkProp}>Brian McGowan</Link></Typography>
            </Box>            
        </Container>
    )
}