import { Typography, Box, } from "@mui/material"

export default function Sources({sources}){
    return(
        <>
            <Typography component='h2' fontSize={24}>Sources</Typography>
            <Box display='flex' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            {
                sources.map(source => (
                    <Box key={source.id}>
                        <Box 
                            component='img' 
                            src={source.img} 
                            alt={source.title}
                            maxWidth={150}
                        />
                    </Box>
                ))
            }
            </Box>
        </>
    )
}