import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function Header({title, description, banner}){
    return (
        <Container 
            sx={{
                mt: 8, 
                py:{xs: 8, md:12}, 
                bgcolor: '#333', 
                backgroundImage:`linear-gradient(90deg, rgba(23,34, 21, 0.5), rgba(121,231, 122,0.5)), url(${banner})`,
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                backgroundSize:'cover'
            }} 
            maxWidth="xl"
        >
            <Box mx={{lg:12}}>
                <Typography
                    component="h1"
                    fontSize={{xs:40, md:48}}
                    fontWeight={700}
                    sx={{color: '#eee'}}
                >
                    {title}
                </Typography>
                <Typography 
                    fontSize={{xs:16, md:20}}
                    fontWeight={500}
                    sx={{color:'#eee'}}
                >
                    {description}
                </Typography>
            </Box>
        </Container>
       
    )
}